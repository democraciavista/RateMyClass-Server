/*
  Warnings:

  - Changed the type of `period_paid` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "period_paid",
ADD COLUMN     "period_paid" DOUBLE PRECISION NOT NULL;
