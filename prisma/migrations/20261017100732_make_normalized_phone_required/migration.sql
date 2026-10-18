/*
  Warnings:

  - Made the column `normalizedPhone` on table `Enquiry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Enquiry" ALTER COLUMN "normalizedPhone" SET NOT NULL;
