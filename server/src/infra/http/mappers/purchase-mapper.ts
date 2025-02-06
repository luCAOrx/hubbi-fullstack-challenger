import { Purchase as DomainPurchase } from "@domain/entities/purchase/purchase";
import {
  Purchase as PrismaPurchase,
  ProductPurchase,
  Sale as PrismaSale,
} from "@prisma/client";

import { SaleMapper } from "./sale-mapper";

interface ToPersistenceResponse {
  id: string;
  saleId: string;
  created_at: Date;
  products: string;
}

export class PurchaseMapper {
  static toDomain({
    rawPrismaPurchase,
    rawPurchaseProducts,
    rawSales,
  }: {
    rawPrismaPurchase: PrismaPurchase;
    rawPurchaseProducts?: ProductPurchase[];
    rawSales: PrismaSale;
  }): DomainPurchase {
    const saleMapper = SaleMapper.toDomain({ rawPrismaSale: rawSales });

    return DomainPurchase.create(
      {
        saleId: rawPrismaPurchase.saleId,
        products: String(
          rawPurchaseProducts?.map((product) => product.productId).join(","),
        ),
      },
      rawPrismaPurchase.id,
      saleMapper,
    );
  }

  static toPersistence({
    id,
    props: { saleId, products },
    created_at,
  }: DomainPurchase): ToPersistenceResponse {
    return {
      id,
      saleId,
      products,
      created_at,
    };
  }
}
