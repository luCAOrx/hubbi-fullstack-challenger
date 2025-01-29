import { randomUUID } from "node:crypto";

import { Sale } from "@domain/entities/sale/sale";
import { SaleRepository } from "@domain/repositories/sale-repository";

import { prisma } from "../libs/prisma-client";
import { SaleMapper } from "../mappers/sale-mapper";
export class PrismaSaleRepository implements SaleRepository {
  async create(sale: Sale): Promise<Sale> {
    const { id, name, status, created_at, products } =
      SaleMapper.toPersistence(sale);

    const { createdSale, createdSaleProducts } = await prisma.$transaction(
      async (trx) => {
        const createdSale = await trx.sale.create({
          data: {
            id,
            name,
            status,
            created_at,
          },
        });

        const productIds = products
          .split(",")
          .map((product: string) => product.trim());

        const createdSaleProducts = await Promise.all(
          productIds.map((productId) =>
            trx.saleProduct.create({
              data: {
                saleId: createdSale.id,
                productId: productId,
                id: randomUUID(),
              },
            }),
          ),
        );

        return { createdSale, createdSaleProducts };
      },
    );

    return SaleMapper.toDomain(createdSale, createdSaleProducts);
  }

  async exists(name: string): Promise<boolean> {
    const saleAlreadyExists = await prisma.sale.findUnique({
      where: { name },
    });

    return saleAlreadyExists !== null;
  }

  async findMany(page: number): Promise<Sale[]> {
    const saleOrSales = await prisma.sale.findMany({
      include: {
        saleProduct: true,
        _count: true,
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * 10,
      take: 10,
    });

    return saleOrSales.map((sale) =>
      SaleMapper.toDomain(sale, sale.saleProduct),
    );
  }
}
