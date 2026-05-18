/*
  Warnings:

  - Added the required column `jobdecriction` to the `Contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services` to the `Contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contacts" ADD COLUMN     "jobdecriction" TEXT NOT NULL,
ADD COLUMN     "services" TEXT NOT NULL;
