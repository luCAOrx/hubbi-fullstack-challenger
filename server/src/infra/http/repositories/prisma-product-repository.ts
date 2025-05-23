import { Product } from "@domain/entities/product/product";
import { ProductRepository } from "@domain/repositories/product-repository";

import { prisma } from "../libs/prisma-client";
import { ProductMapper } from "../mappers/product-mapper";

export class PrismaProductRepository implements ProductRepository {
  async transactionCreateProductWithProductProductAndProductCounter(
    product: Product,
  ): Promise<Product> {
    const { id, name, created_at } = ProductMapper.toPersistence(product);

    const { createdProduct } = await prisma.$transaction(async (trx) => {
      const counter = await trx.productCounter.findUnique({
        where: { id: 1 },
      });

      if (!counter) {
        await trx.productCounter.create({
          data: {
            id: 1,
            totalProduct: 0,
          },
        });
      }

      const createdProduct = await trx.product.create({
        data: {
          id,
          name,
          created_at,
        },
      });

      await trx.productCounter.update({
        where: {
          id: 1,
        },
        data: {
          totalProduct: {
            increment: 1,
          },
        },
      });

      return { createdProduct };
    });

    return ProductMapper.toDomain({
      rawPrismaProduct: createdProduct,
    });
  }

  async findMany(page: number, perPage: number): Promise<Product[]> {
    const productOrProducts = await prisma.product.findMany({
      orderBy: { created_at: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return productOrProducts.map((product) =>
      ProductMapper.toDomain({
        rawPrismaProduct: product,
      }),
    );
  }

  async getTotalProductsCount(): Promise<number> {
    const productsCounter = await prisma.productCounter.findUnique({
      where: {
        id: 1,
      },
    });

    return productsCounter?.totalProduct ?? 0;
  }
}
