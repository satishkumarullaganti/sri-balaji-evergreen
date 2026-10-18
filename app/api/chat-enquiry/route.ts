
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    const { name, phone, email, interestedIn, consent } = body;

    if (consent !== true) {
      return NextResponse.json(
        { error: "Customer consent is required." },
        { status: 400 }
      );
    }

    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.trim().length > 100
    ) {
      return NextResponse.json(
        { error: "Please provide a valid customer name." },
        { status: 400 }
      );
    }

    if (
      typeof phone !== "string" ||
      !/^[+]?[\d\s()-]{8,20}$/.test(phone.trim()) ||
      phone.replace(/\D/g, "").length < 8 ||
      phone.replace(/\D/g, "").length > 15
    ) {
      return NextResponse.json(
        { error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    if (
      typeof interestedIn !== "string" ||
      !["2 BHK", "3 BHK"].includes(interestedIn)
    ) {
      return NextResponse.json(
        { error: "Choose either 2 BHK or 3 BHK." },
        { status: 400 }
      );
    }

    let normalizedEmail: string | null = null;

    if (email !== undefined && email !== null && email !== "") {
      if (
        typeof email !== "string" ||
        email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ) {
        return NextResponse.json(
          { error: "Please provide a valid email address." },
          { status: 400 }
        );
      }

      normalizedEmail = email.trim().toLowerCase();
    }

    // Normalize the phone number for duplicate checking.
    let normalizedPhone = phone.trim().replace(/\D/g, "");

// Normalize Indian mobile numbers to the same 10-digit format.
if (normalizedPhone.length === 12 && normalizedPhone.startsWith("91")) {
  normalizedPhone = normalizedPhone.slice(2);
} else if (
  normalizedPhone.length === 11 &&
  normalizedPhone.startsWith("0")
) {
  normalizedPhone = normalizedPhone.slice(1);
}

if (!/^\d{10}$/.test(normalizedPhone)) {
  return NextResponse.json(
    { error: "Please provide a valid 10-digit mobile number." },
    { status: 400 }
  );
}

    // Check the previous 15 days using the normalized phone number.
const cutoffDate = new Date(
  Date.now() - 15 * 24 * 60 * 60 * 1000
);

const existingEnquiry = await prisma.enquiry.findFirst({
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
  return NextResponse.json(
    {
      error: `An enquiry for ${interestedIn} using this phone number already exists within the last 15 days. Please try again after 15 days.`,
      duplicate: true,
    },
    { status: 409 }
  );
}

const enquiry = await prisma.enquiry.create({
  data: {
    name: name.trim(),
    phone: phone.trim(),
    normalizedPhone,
    email: normalizedEmail,
    interestedIn,
  },
});
    return NextResponse.json(
      {
        message: "Enquiry submitted successfully.",
        enquiryId: enquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Chat enquiry API error:", error);

    return NextResponse.json(
      {
        error: "Unable to submit the enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}
