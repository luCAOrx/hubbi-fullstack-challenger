/*
  Warnings:

  - You are about to drop the `ProductPurchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductPurchase" DROP CONSTRAINT "ProductPurchase_productId_fkey";

-- DropTable
DROP TABLE "ProductPurchase";

-- CreateTable
CREATE TABLE "productPurchase" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,

    CONSTRAINT "productPurchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productPurchase" ADD CONSTRAINT "productPurchase_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
