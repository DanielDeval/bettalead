/*
  Warnings:

  - Added the required column `OrgID` to the `Organisationlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organisationlist" ADD COLUMN     "OrgID" TEXT NOT NULL;
