import { randomUUID } from "node:crypto";

import { Sale } from "@domain/entities/sale/sale";
import { SaleRepository } from "@domain/repositories/sale-repository";

import { prisma } from "../libs/prisma-client";
import { SaleMapper } from "../mappers/sale-mapper";
export class PrismaSaleRepository implements SaleRepository {
  async createSaleWithTotalSales(sale: Sale): Promise<Sale> {
    const { id, name, status, created_at, products } =
      SaleMapper.toPersistence(sale);

    const { createdSale, createdSaleProducts } = await prisma.$transaction(
      async (trx) => {
        const counter = await trx.saleCounter.findUnique({
          where: { id: 1 },
        });

        if (!counter) {
          await trx.saleCounter.create({
            data: {
              id: 1,
              totalSale: 0,
            },
          });
        }

        const createdSale = await trx.sale.create({
          data: {
            id,
            name,
            status,
            created_at,
          },
        });

        await trx.saleCounter.update({
          where: {
            id: 1,
          },
          data: {
            totalSale: {
              increment: 1,
            },
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

    return SaleMapper.toDomain({
      rawPrismaSale: createdSale,
      rawSaleProducts: createdSaleProducts,
    });
  }

  async exists(name: string): Promise<boolean> {
    const saleAlreadyExists = await prisma.sale.findUnique({
      where: { name },
    });

    return saleAlreadyExists !== null;
  }

  async findById(id: string): Promise<Sale | null> {
    const saleOrNull = await prisma.sale.findUnique({
      where: { id },
    });

    if (saleOrNull === null) return null;

    return SaleMapper.toDomain({ rawPrismaSale: saleOrNull });
  }

  async findSaleProductById(saleId: string): Promise<Sale | null> {
    const saleOrNull = await prisma.sale.findUnique({
      where: { id: saleId },
      include: {
        products: {
          select: {
            products: true,
          },
        },
      },
    });

    if (saleOrNull === null) return null;

    const products = saleOrNull.products.map(
      (saleProduct) => saleProduct.products,
    );

    return SaleMapper.toDomain({
      rawPrismaSale: saleOrNull,
      rawPrismaProduct: products,
    });
  }

  async findMany(page: number, perPage: number): Promise<Sale[]> {
    const saleOrSales = await prisma.sale.findMany({
      include: {
        products: true,
        _count: true,
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return saleOrSales.map((sale) =>
      SaleMapper.toDomain({
        rawPrismaSale: sale,
        rawSaleProducts: sale.products,
      }),
    );
  }

  async getTotalSalesCount(): Promise<number> {
    const salesCounter = await prisma.saleCounter.findUnique({
      where: {
        id: 1,
      },
    });
    return salesCounter?.totalSale ?? 0;
  }
}
