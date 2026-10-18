import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { isAdminAuthenticated } from "../admin/auth";



const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});


export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    const { name, phone, email, interestedIn } = body;

    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.trim().length > 100 ||
      typeof phone !== "string" ||
      typeof interestedIn !== "string" ||
      !["2 BHK", "3 BHK"].includes(interestedIn)
    ) {
      return Response.json(
        { error: "Please provide a valid name, phone number, and apartment configuration." },
        { status: 400 }
      );
    }

    let normalizedPhone = phone.trim().replace(/\D/g, "");

    if (normalizedPhone.length === 12 && normalizedPhone.startsWith("91")) {
      normalizedPhone = normalizedPhone.slice(2);
    } else if (
      normalizedPhone.length === 11 &&
      normalizedPhone.startsWith("0")
    ) {
      normalizedPhone = normalizedPhone.slice(1);
    }

    if (!/^\d{10}$/.test(normalizedPhone)) {
      return Response.json(
        { error: "Please provide a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    let normalizedEmail: string | null = null;

    if (email !== undefined && email !== null && email !== "") {
      if (
        typeof email !== "string" ||
        email.trim().length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ) {
        return Response.json(
          { error: "Please provide a valid email address." },
          { status: 400 }
        );
      }

      normalizedEmail = email.trim().toLowerCase();
    }

    const cutoffDate = new Date(
      Date.now() - 15 * 24 * 60 * 60 * 1000
    );
    const result = await prisma.$transaction(async (tx) => {
  const lockKey = `${normalizedPhone}:${interestedIn}`;

  await tx.$queryRaw`
    SELECT pg_advisory_xact_lock(
      hashtextextended(${lockKey}, 0)
    )
  `;

  const existingEnquiry = await tx.enquiry.findFirst({
    where: {
      normalizedPhone,
      interestedIn,
      createdAt: {
        gte: cutoffDate,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (existingEnquiry) {
    return { duplicate: true as const };
  }

  const enquiry = await tx.enquiry.create({
    data: {
      name: name.trim(),
      phone: phone.trim(),
      normalizedPhone,
      email: normalizedEmail,
      interestedIn,
    },
  });

  return {
    duplicate: false as const,
    enquiryId: enquiry.id,
  };
});

if (result.duplicate) {
  return Response.json(
    {
      error: `An enquiry for ${interestedIn} using this phone number already exists within the last 15 days. Please try again after 15 days.`,
      duplicate: true,
    },
    { status: 409 }
  );
}

return Response.json(
  {
    message: "Enquiry submitted successfully.",
    enquiryId: result.enquiryId,
  },
  { status: 201 }
);
  } catch (error) {
    console.error("Enquiry API error:", error);

    return Response.json(
      { error: "Unable to submit enquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Step 1: Check admin login
    if (!(await isAdminAuthenticated())) {
      return Response.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    // Step 2: Fetch enquiries only if admin is authenticated
    const enquiries = await prisma.enquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(enquiries);
  } catch (error) {
    console.error("Enquiry GET error:", error);

    return Response.json(
      { error: "Unable to fetch enquiries." },
      { status: 500 }
    );
  }
}


export async function PATCH(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    const { id, status, notes, followUpDate } = body;

    if (
      typeof id !== "number" ||
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return Response.json(
        { error: "A valid enquiry ID is required." },
        { status: 400 }
      );
    }

    const allowedStatuses = [
      "NEW",
      "CONTACTED",
      "INTERESTED",
      "SITE VISIT",
      "CLOSED",
      "NOT INTERESTED",
    ];

    if (
      status !== undefined &&
      (typeof status !== "string" ||
        !allowedStatuses.includes(status))
    ) {
      return Response.json(
        { error: "Invalid enquiry status." },
        { status: 400 }
      );
    }

    if (
      notes !== undefined &&
      (typeof notes !== "string" || notes.length > 5000)
    ) {
      return Response.json(
        { error: "Notes must be text and no longer than 5000 characters." },
        { status: 400 }
      );
    }

    let parsedFollowUpDate: Date | null | undefined;

    if (followUpDate !== undefined) {
      if (followUpDate === "") {
        parsedFollowUpDate = null;
      } else if (
        typeof followUpDate === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(followUpDate)
      ) {
        const parsedDate = new Date(
          `${followUpDate}T00:00:00.000Z`
        );

        if (
          Number.isNaN(parsedDate.getTime()) ||
          parsedDate.toISOString().slice(0, 10) !== followUpDate
        ) {
          return Response.json(
            { error: "Invalid follow-up date." },
            { status: 400 }
          );
        }

        parsedFollowUpDate = parsedDate;
      } else {
        return Response.json(
          { error: "Follow-up date must use YYYY-MM-DD format." },
          { status: 400 }
        );
      }
    }

    if (
      status === undefined &&
      notes === undefined &&
      followUpDate === undefined
    ) {
      return Response.json(
        { error: "No valid fields provided to update." },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(notes !== undefined && {
          notes: notes.trim() || null,
        }),
        ...(parsedFollowUpDate !== undefined && {
          followUpDate: parsedFollowUpDate,
        }),
      },
    });

    return Response.json(enquiry);
  } catch (error) {
    console.error("Enquiry PATCH error:", error);

    return Response.json(
      { error: "Unable to update enquiry." },
      { status: 500 }
    );
  }
}
