-- CreateTable
CREATE TABLE "productCounter" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "totalPurchase" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "productCounter_pkey" PRIMARY KEY ("id")
);
