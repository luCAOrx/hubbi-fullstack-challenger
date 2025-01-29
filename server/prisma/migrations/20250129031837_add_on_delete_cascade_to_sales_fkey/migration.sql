-- DropForeignKey
ALTER TABLE "saleProduct" DROP CONSTRAINT "saleProduct_saleId_fkey";

-- AddForeignKey
ALTER TABLE "saleProduct" ADD CONSTRAINT "saleProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
