/*
  Warnings:

  - You are about to drop the column `place` on the `Templates` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Templates` table. All the data in the column will be lost.
  - You are about to drop the column `Introduction` on the `Templatesparts` table. All the data in the column will be lost.
  - You are about to drop the column `Links` on the `Templatesparts` table. All the data in the column will be lost.
  - You are about to drop the column `Offer` on the `Templatesparts` table. All the data in the column will be lost.
  - You are about to drop the column `Outro` on the `Templatesparts` table. All the data in the column will be lost.
  - You are about to drop the column `Porfolio` on the `Templatesparts` table. All the data in the column will be lost.
  - You are about to drop the column `intro` on the `Templatesparts` table. All the data in the column will be lost.
  - Added the required column `Introduction` to the `Templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Links` to the `Templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Offer` to the `Templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Outro` to the `Templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Porfolio` to the `Templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intro` to the `Templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place` to the `Templatesparts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Templates" DROP COLUMN "place",
DROP COLUMN "text",
ADD COLUMN     "Introduction" TEXT NOT NULL,
ADD COLUMN     "Links" TEXT NOT NULL,
ADD COLUMN     "Offer" TEXT NOT NULL,
ADD COLUMN     "Outro" TEXT NOT NULL,
ADD COLUMN     "Porfolio" TEXT NOT NULL,
ADD COLUMN     "intro" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Templatesparts" DROP COLUMN "Introduction",
DROP COLUMN "Links",
DROP COLUMN "Offer",
DROP COLUMN "Outro",
DROP COLUMN "Porfolio",
DROP COLUMN "intro",
ADD COLUMN     "place" TEXT NOT NULL;
