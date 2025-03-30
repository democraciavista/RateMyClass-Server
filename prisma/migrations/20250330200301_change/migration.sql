/*
  Warnings:

  - A unique constraint covering the columns `[discipline_id]` on the table `statistics` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_discipline_id_fkey";

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "comment" DROP NOT NULL,
ALTER COLUMN "recommendation" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "statistics_discipline_id_key" ON "statistics"("discipline_id");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
