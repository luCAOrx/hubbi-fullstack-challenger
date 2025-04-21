import { Sale as DomainSale, Status } from "@domain/entities/sale/sale";
import {
  Sale as PrismaSale,
  SaleProduct,
  Product as PrismaProduct,
} from "@prisma/client";

import { ProductMapper } from "./product-mapper";

interface ToPersistenceResponse {
  id: string;
  name: string;
  status: Status;
  created_at: Date;
  products: string;
}

export class SaleMapper {
  static toDomain({
    rawPrismaSale,
    rawPrismaProduct,
    rawPrismaSaleProducts,
  }: {
    rawPrismaSale: PrismaSale;
    rawPrismaProduct?: PrismaProduct[];
    rawPrismaSaleProducts?: SaleProduct[];
  }): DomainSale {
    const products = rawPrismaProduct
      ? rawPrismaProduct.map((product) =>
          ProductMapper.toDomain({ rawPrismaProduct: product }),
        )
      : [];

    return DomainSale.create(
      {
        name: rawPrismaSale.name,
        status: rawPrismaSale.status,
        products: String(
          rawPrismaSaleProducts?.map((product) => product.productId),
        ),
      },
      { _id: rawPrismaSale.id, _products: products },
    );
  }

  static toPersistence({
    id,
    props: { name, status, products },
    created_at,
  }: DomainSale): ToPersistenceResponse {
    return {
      id,
      name,
      status: status!,
      products,
      created_at,
    };
  }
}
