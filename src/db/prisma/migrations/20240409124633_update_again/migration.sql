/*
  Warnings:

  - You are about to drop the column `authorId` on the `Deal` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Interest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dealId,userEmail]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorEmail` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Interest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deal" DROP CONSTRAINT "Deal_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_userId_fkey";

-- DropIndex
DROP INDEX "Interest_dealId_userId_key";

-- AlterTable
ALTER TABLE "Deal" DROP COLUMN "authorId",
ADD COLUMN     "authorEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Interest_dealId_userEmail_key" ON "Interest"("dealId", "userEmail");

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
