import { SaleProduct } from "@domain/entities/sale-product/sale-product";
import { Sale } from "@domain/entities/sale/sale";
import { SaleRepository } from "@domain/repositories/sale-repository";

import { prisma } from "../libs/prisma-client";
import { SaleMapper } from "../mappers/sale-mapper";
import { SaleProductMapper } from "../mappers/sale-product-mapper";

export class PrismaSaleRepository implements SaleRepository {
  async transactionCreateSaleWithSaleProductAndSaleCounter(
    sale: Sale,
    saleProducts: SaleProduct[],
  ): Promise<Sale> {
    const { id, name, status, created_at } = SaleMapper.toPersistence(sale);

    const saleProductIds = saleProducts.map((saleProduct) => {
      const { productId, id } = SaleProductMapper.toPersistence(saleProduct);
      return { productId, id };
    });

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
          include: {
            products: {
              select: {
                product: true,
              },
            },
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

        const createdSaleProducts = await Promise.all(
          saleProductIds.map(
            async ({ id, productId }) =>
              await trx.saleProduct.create({
                data: {
                  saleId: createdSale.id,
                  productId,
                  id,
                },
              }),
          ),
        );

        return { createdSale, createdSaleProducts };
      },
    );

    return SaleMapper.toDomain({
      rawPrismaSale: createdSale,
      rawPrismaSaleProducts: createdSaleProducts,
      rawPrismaProduct: createdSale.products.map(({ product }) => product),
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
      include: {
        products: {
          select: {
            product: true,
          },
        },
      },
    });

    if (saleOrNull === null) return null;

    const products = saleOrNull.products.map(
      (saleProduct) => saleProduct.product,
    );

    return SaleMapper.toDomain({
      rawPrismaSale: saleOrNull,
      rawPrismaProduct: products,
    });
  }

  async findSaleProductById(saleId: string): Promise<SaleProduct[]> {
    const saleProductOrSaleProducts = await prisma.saleProduct.findMany({
      where: { saleId },
      include: {
        sale: true,
        product: true,
      },
    });

    return saleProductOrSaleProducts.map((saleProduct) => {
      const product = SaleProductMapper.toDomain({
        rawPrismaSale: saleProduct.sale,
        rawPrismaProduct: saleProduct.product,
        rawPrismaSaleProduct: saleProduct,
      });

      return product;
    });
  }

  async findMany(page: number, perPage: number): Promise<Sale[]> {
    const saleOrSales = await prisma.sale.findMany({
      include: {
        products: true,
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return saleOrSales.map((sale) =>
      SaleMapper.toDomain({
        rawPrismaSale: sale,
        rawPrismaSaleProducts: sale.products,
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
