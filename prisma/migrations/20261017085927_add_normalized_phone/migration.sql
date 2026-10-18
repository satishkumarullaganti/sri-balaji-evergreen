-- AlterTable
ALTER TABLE "Enquiry" ADD COLUMN     "normalizedPhone" TEXT;

-- CreateIndex
CREATE INDEX "Enquiry_normalizedPhone_interestedIn_createdAt_idx" ON "Enquiry"("normalizedPhone", "interestedIn", "createdAt");
