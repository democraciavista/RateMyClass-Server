/*
  Warnings:

  - Added the required column `course` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "course" TEXT NOT NULL,
ADD COLUMN     "reset_password_token" TEXT,
ADD COLUMN     "reset_password_token_expiry" TIMESTAMP(3);
