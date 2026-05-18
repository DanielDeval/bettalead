/*
  Warnings:

  - Added the required column `owner` to the `Organisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "owner" TEXT NOT NULL;
