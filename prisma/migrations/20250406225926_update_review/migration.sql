-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "failed_before" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "went_to_recovery" BOOLEAN NOT NULL DEFAULT false;
