/*
  Warnings:

  - You are about to drop the column `productId` on the `Interest` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[dealId,userEmail]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dealId` to the `Interest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_authorEmail_fkey";

-- DropIndex
DROP INDEX "Interest_productId_userEmail_key";

-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "productId",
ADD COLUMN     "dealId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "Deal" (
    "id" SERIAL NOT NULL,
    "authorEmail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "imgSrc" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "interest" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interest_dealId_userEmail_key" ON "Interest"("dealId", "userEmail");

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
