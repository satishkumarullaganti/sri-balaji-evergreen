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

    const { name, phone, email, interestedIn } = body;

    if (!name || !phone || !interestedIn) {
      return Response.json(
        { error: "Name, phone and interest are required." },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        phone,
        email: email || null,
        interestedIn,
      },
    });

    return Response.json(
      {
        message: "Enquiry submitted successfully.",
        enquiry,
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

    const {
      id,
      status,
      notes,
      followUpDate,
    } = body;

    if (!id) {
      return Response.json(
        { error: "Enquiry ID is required." },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.update({
      where: {
        id: Number(id),
      },
      data: {
        ...(status !== undefined && {
          status,
        }),
        ...(notes !== undefined && {
          notes: notes || null,
        }),
        ...(followUpDate !== undefined && {
          followUpDate: followUpDate
            ? new Date(followUpDate)
            : null,
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

