import { randomUUID } from "node:crypto";

import { Purchase } from "@domain/entities/purchase/purchase";
import { PurchaseRepository } from "@domain/repositories/purchase-repository";

import { prisma } from "../libs/prisma-client";
import { PurchaseMapper } from "../mappers/purchase-mapper";

export class PrismaPurchaseRepository implements PurchaseRepository {
  async createPurchaseWithTotalPurchases(
    purchase: Purchase,
  ): Promise<Purchase> {
    const { id, saleId, created_at, products } =
      PurchaseMapper.toPersistence(purchase);

    const { createdPurchase, createdPurchaseProducts } =
      await prisma.$transaction(async (trx) => {
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
            sales: true,
          },
        });

        await trx.purchaseCounter.update({
          where: {
            id: 1,
          },
          data: {
            totalPurchase: {
              increment: 1,
            },
          },
        });

        const productIds = products
          .split(",")
          .map((product: string) => product.trim());

        const createdPurchaseProducts = await Promise.all(
          productIds.map((productId) =>
            trx.productPurchase.create({
              data: {
                id: randomUUID(),
                productId,
              },
            }),
          ),
        );

        await trx.sale.update({
          where: { id: createdPurchase.saleId },
          data: {
            status: "Finalizada",
          },
        });

        return { createdPurchase, createdPurchaseProducts };
      });

    return PurchaseMapper.toDomain({
      rawPrismaPurchase: createdPurchase,
      rawPurchaseProducts: createdPurchaseProducts,
      rawSales: createdPurchase.sales,
    });
  }

  async findMany(page: number, perPage: number): Promise<Purchase[]> {
    const purchaseOrPurchases = await prisma.purchase.findMany({
      include: {
        sales: true,
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return purchaseOrPurchases.map((purchase) =>
      PurchaseMapper.toDomain({
        rawPrismaPurchase: purchase,
        rawSales: purchase.sales,
      }),
    );
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
