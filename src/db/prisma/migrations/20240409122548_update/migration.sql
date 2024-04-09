/*
  Warnings:

  - You are about to drop the column `authorEmail` on the `Deal` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Interest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dealId,userId]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Interest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deal" DROP CONSTRAINT "Deal_authorEmail_fkey";

-- DropForeignKey
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_userEmail_fkey";

-- DropIndex
DROP INDEX "Interest_dealId_userEmail_key";

-- AlterTable
ALTER TABLE "Deal" DROP COLUMN "authorEmail",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Interest_dealId_userId_key" ON "Interest"("dealId", "userId");

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
