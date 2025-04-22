/*
  Warnings:

  - You are about to drop the `PurchaseCounter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SaleCounter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productPurchase` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `purchaseSaleProductId` to the `saleProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "productPurchase" DROP CONSTRAINT "productPurchase_productId_fkey";

-- AlterTable
ALTER TABLE "saleProduct" ADD COLUMN     "purchaseSaleProductId" TEXT NOT NULL;

-- DropTable
DROP TABLE "PurchaseCounter";

-- DropTable
DROP TABLE "SaleCounter";

-- DropTable
DROP TABLE "productPurchase";

-- CreateTable
CREATE TABLE "purchaseSaleProduct" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "saleProductId" TEXT NOT NULL,

    CONSTRAINT "purchaseSaleProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saleCounter" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "totalSale" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "saleCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchaseCounter" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "totalPurchase" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "purchaseCounter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchaseSaleProduct" ADD CONSTRAINT "purchaseSaleProduct_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchaseSaleProduct" ADD CONSTRAINT "purchaseSaleProduct_saleProductId_fkey" FOREIGN KEY ("saleProductId") REFERENCES "saleProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
