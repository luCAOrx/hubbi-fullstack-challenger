import { Product } from "@domain/entities/product/product";
import { SaleProduct as DomainSaleProduct } from "@domain/entities/sale-product/sale-product";
import { Sale } from "@domain/entities/sale/sale";
import {
  SaleProduct as PrismaSaleProduct,
  Product as PrismaProduct,
  Sale as PrismaSale,
} from "@prisma/client";

import { ProductMapper } from "./product-mapper";
import { SaleMapper } from "./sale-mapper";

interface ToPersistenceResponse {
  id: string;
  saleId: string;
  productId: string;
  products: Product;
  sales?: Sale;
}

export class SaleProductMapper {
  static toDomain(
    rawPrismaSaleProduct: PrismaSaleProduct,
    rawPrismaProduct: PrismaProduct,
    rawPrismaSale: PrismaSale,
  ): DomainSaleProduct {
    const productMapper: Product = ProductMapper.toDomain({
      rawPrismaProduct: rawPrismaProduct!,
    });
    const saleMapper: Sale = SaleMapper.toDomain({ rawPrismaSale });

    return DomainSaleProduct.create(
      {
        productId: rawPrismaSaleProduct.productId,
        saleId: rawPrismaSaleProduct.saleId,
        products: productMapper,
        sales: saleMapper,
      },
      { _id: rawPrismaSaleProduct.id },
    );
  }

  static toPersistence({
    id,
    props: { productId, saleId, products },
  }: DomainSaleProduct): ToPersistenceResponse {
    return {
      id,
      productId,
      saleId,
      products: products!,
    };
  }
}
