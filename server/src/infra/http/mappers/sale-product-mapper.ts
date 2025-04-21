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
  sales?: Sale;
}

export class SaleProductMapper {
  static toDomain({
    rawPrismaSaleProduct,
    rawPrismaProduct,
    rawPrismaSale,
  }: {
    rawPrismaSaleProduct: PrismaSaleProduct;
    rawPrismaProduct: PrismaProduct;
    rawPrismaSale: PrismaSale;
  }): DomainSaleProduct {
    const productMapper: Product = ProductMapper.toDomain({
      rawPrismaProduct: rawPrismaProduct,
    });

    const saleMapper: Sale = SaleMapper.toDomain({ rawPrismaSale });

    return DomainSaleProduct.create(
      {
        productId: rawPrismaProduct.id,
        saleId: rawPrismaSale.id,
      },
      {
        _id: rawPrismaSaleProduct.id,
        _sale: saleMapper,
        _product: productMapper,
      },
    );
  }

  static toPersistence({
    id,
    props: { productId, saleId },
  }: DomainSaleProduct): ToPersistenceResponse {
    return {
      id,
      productId,
      saleId,
    };
  }
}
