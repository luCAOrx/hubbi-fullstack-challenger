/*
  Warnings:

  - You are about to drop the column `totalPurchases` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the column `totalSales` on the `sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "purchase" DROP COLUMN "totalPurchases";

-- AlterTable
ALTER TABLE "sale" DROP COLUMN "totalSales";
