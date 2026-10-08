import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


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
