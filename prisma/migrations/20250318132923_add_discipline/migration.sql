/*
  Warnings:

  - You are about to drop the column `subject_id` on the `materials` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `reactions` table. All the data in the column will be lost.
  - You are about to drop the `subjects` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,discipline_id,type]` on the table `reactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discipline_id` to the `materials` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('MANDATORY', 'ELECTIVE_FREE', 'ELECTIVE_PROFILE');

-- DropForeignKey
ALTER TABLE "materials" DROP CONSTRAINT "materials_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_subject_id_fkey";

-- DropIndex
DROP INDEX "reactions_user_id_subject_id_type_key";

-- AlterTable
ALTER TABLE "materials" DROP COLUMN "subject_id",
ADD COLUMN     "discipline_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reactions" DROP COLUMN "subject_id",
ADD COLUMN     "discipline_id" TEXT;

-- DropTable
DROP TABLE "subjects";

-- CreateTable
CREATE TABLE "disciplines" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "professor" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "center" TEXT NOT NULL,
    "period" INTEGER,
    "type" "CourseType" NOT NULL,
    "hours" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "discipline_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "passed_first_try" BOOLEAN NOT NULL,
    "final_grade" DOUBLE PRECISION NOT NULL,
    "professor_teaching_score" DOUBLE PRECISION NOT NULL,
    "period_paid" TEXT NOT NULL,
    "dropped_out" BOOLEAN NOT NULL,
    "difficulty_level" DOUBLE PRECISION NOT NULL,
    "discipline_score" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statistics" (
    "id" TEXT NOT NULL,
    "discipline_id" TEXT NOT NULL,
    "total_reviews" INTEGER NOT NULL,
    "average_grades" DOUBLE PRECISION NOT NULL,
    "average_teaching_score" DOUBLE PRECISION NOT NULL,
    "average_difficulty" DOUBLE PRECISION NOT NULL,
    "dropout_rate" DOUBLE PRECISION NOT NULL,
    "discipline_score" DOUBLE PRECISION NOT NULL,
    "approval_rate" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "statistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_code_key" ON "disciplines"("code");

-- CreateIndex
CREATE UNIQUE INDEX "reactions_user_id_discipline_id_type_key" ON "reactions"("user_id", "discipline_id", "type");

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
