import { randomUUID } from "node:crypto";

import { Purchase } from "@domain/entities/purchase/purchase";
import { PurchaseRepository } from "@domain/repositories/purchase-repository";

import { prisma } from "../libs/prisma-client";
import { PurchaseMapper } from "../mappers/purchase-mapper";

export class PrismaPurchaseRepository implements PurchaseRepository {
  async create(purchase: Purchase): Promise<Purchase> {
    const { id, saleId, created_at, products } =
      PurchaseMapper.toPersistence(purchase);

    const { createdPurchase, createdPurchaseProducts } =
      await prisma.$transaction(async (trx) => {
        const createdPurchase = await trx.purchase.create({
          data: {
            id,
            saleId,
            created_at,
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
                productId: productId,
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

    return PurchaseMapper.toDomain(createdPurchase, createdPurchaseProducts);
  }

  async findMany(page: number): Promise<Purchase[]> {
    const purchaseOrPurchases = await prisma.purchase.findMany({
      include: {
        sales: true,
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * 10,
      take: 10,
    });

    return purchaseOrPurchases.map((purchase) =>
      PurchaseMapper.toDomain(purchase),
    );
  }
}
