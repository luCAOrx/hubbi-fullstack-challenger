/*
  Warnings:

  - You are about to drop the column `totalPurchase` on the `productCounter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "productCounter" DROP COLUMN "totalPurchase",
ADD COLUMN     "totalProduct" INTEGER NOT NULL DEFAULT 0;
