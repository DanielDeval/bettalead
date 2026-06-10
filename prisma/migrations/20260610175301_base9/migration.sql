/*
  Warnings:

  - Added the required column `location` to the `Contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contacts" ADD COLUMN     "location" TEXT NOT NULL;
