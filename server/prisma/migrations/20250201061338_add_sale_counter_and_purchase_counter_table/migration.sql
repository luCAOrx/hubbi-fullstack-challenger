-- CreateTable
CREATE TABLE "SaleCounter" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "totalSale" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SaleCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseCounter" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "totalPurchase" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PurchaseCounter_pkey" PRIMARY KEY ("id")
);
