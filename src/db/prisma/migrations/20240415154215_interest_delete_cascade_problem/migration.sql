-- DropForeignKey
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_dealId_fkey";

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
