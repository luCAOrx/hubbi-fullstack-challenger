import { PurchaseSaleProduct } from "@domain/entities/purchase-sale-product/purchase-sale-product";
import { Purchase } from "@domain/entities/purchase/purchase";
import { PurchaseRepository } from "@domain/repositories/purchase-repository";

import { prisma } from "../libs/prisma-client";
import { PurchaseMapper } from "../mappers/purchase-mapper";
import { PurchaseSaleProductMapper } from "../mappers/purchase-sale-product-mapper";

export class PrismaPurchaseRepository implements PurchaseRepository {
  async transactionCreatePurchaseWithPurchaseSaleProductAndPurchaseCounter(
    purchase: Purchase,
    purchasSaleProducts: PurchaseSaleProduct[],
  ): Promise<Purchase> {
    const { id, saleId, created_at } = PurchaseMapper.toPersistence(purchase);

    const purchaseSaleProductInputs = purchasSaleProducts.map(
      (purchaseSaleProduct) =>
        PurchaseSaleProductMapper.toPersistence(purchaseSaleProduct),
    );

    const { createdPurchase } = await prisma.$transaction(async (trx) => {
      const counter = await trx.purchaseCounter.findUnique({
        where: { id: 1 },
      });

      if (!counter) {
        await trx.purchaseCounter.create({
          data: {
            id: 1,
            totalPurchase: 0,
          },
        });
      }

      const createdPurchase = await trx.purchase.create({
        data: {
          id,
          saleId,
          created_at,
        },
        include: {
          sale: true,
        },
      });

      await trx.purchaseCounter.update({
        where: { id: 1 },
        data: {
          totalPurchase: {
            increment: 1,
          },
        },
      });

      await Promise.all(
        purchaseSaleProductInputs.map(
          async ({ id, purchaseId, saleProductId, created_at }) => {
            return await trx.purchaseSaleProduct.create({
              data: {
                id,
                purchaseId,
                saleProductId,
                created_at,
              },
            });
          },
        ),
      );

      await trx.sale.update({
        where: { id: createdPurchase.saleId },
        data: {
          status: "Finalizada",
        },
      });

      return { createdPurchase };
    });

    return PurchaseMapper.toDomain({
      rawPrismaPurchase: createdPurchase,
      rawPrismaSale: createdPurchase.sale,
    });
  }

  async findMany(page: number, perPage: number): Promise<Purchase[]> {
    const purchaseOrPurchases = await prisma.purchase.findMany({
      include: {
        sale: true,
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return purchaseOrPurchases.map((purchase) =>
      PurchaseMapper.toDomain({
        rawPrismaPurchase: purchase,
        rawPrismaSale: purchase.sale,
      }),
    );
  }

  // Create purchaseSaleProduct method to get products from purchase sale

  async findPurchaseSaleProductByPurchaseId(
    purchaseId: string,
  ): Promise<Purchase | null> {
    const purchaseOrNull = await prisma.purchase.findUnique({
      where: { id: purchaseId },
      include: {
        purchaseSaleProducts: true,
        sale: true,
      },
    });

    if (purchaseOrNull === null) return null;

    const purchaseSaleProducts = await Promise.all(
      purchaseOrNull.purchaseSaleProducts.map(async (purchaseSaleProduct) => {
        const saleProduct = await prisma.saleProduct.findUnique({
          where: { id: purchaseSaleProduct.saleProductId },
          include: {
            product: true,
            sale: true,
          },
        });

        return {
          purchaseSaleProduct,
          saleProduct: saleProduct!,
          product: saleProduct!.product,
        };
      }),
    );

    const purchaseMapper = PurchaseMapper.toDomain({
      rawPrismaPurchase: purchaseOrNull,
      rawPrismaSale: purchaseOrNull.sale,
      rawPurchaseSaleProducts: purchaseSaleProducts,
    });

    return purchaseMapper;
  }

  async getTotalPurchasesCount(): Promise<number> {
    const purchasesCounter = await prisma.purchaseCounter.findUnique({
      where: {
        id: 1,
      },
    });
    return purchasesCounter?.totalPurchase ?? 0;
  }
}
