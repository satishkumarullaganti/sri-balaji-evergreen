
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const enquiries = await prisma.enquiry.findMany({
    select: {
      id: true,
      phone: true,
      normalizedPhone: true,
    },
  });

  let updated = 0;
  let skipped = 0;

  for (const enquiry of enquiries) {
    const normalizedPhone = enquiry.phone.replace(/\D/g, "");

    if (normalizedPhone.length < 8 || normalizedPhone.length > 15) {
      console.warn(
        `Skipping enquiry ${enquiry.id}: phone number needs manual review.`
      );
      skipped++;
      continue;
    }

    if (enquiry.normalizedPhone !== normalizedPhone) {
      await prisma.enquiry.update({
        where: { id: enquiry.id },
        data: { normalizedPhone },
      });
      updated++;
    }
  }

  console.log(`Backfill completed. Updated: ${updated}`);
  console.log(`Skipped for review: ${skipped}`);
}

main()
  .catch((error) => {
    console.error("Backfill failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  