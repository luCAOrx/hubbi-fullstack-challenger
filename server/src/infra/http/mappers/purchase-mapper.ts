import { Purchase as DomainPurchase } from "@domain/entities/purchase/purchase";
import {
  Purchase as PrismaPurchase,
  PurchaseSaleProduct as PrismaPurchaseSaleProduct,
  Product as PrismaProduct,
  SaleProduct as PrismaSaleProduct,
  Sale as PrismaSale,
} from "@prisma/client";

import { PurchaseSaleProductMapper } from "./purchase-sale-product-mapper";
import { SaleMapper } from "./sale-mapper";

interface ToPersistenceResponse {
  id: string;
  saleId: string;
  created_at: Date;
}

type PurchaseSaleProducts = {
  purchaseSaleProduct: PrismaPurchaseSaleProduct;
  saleProduct: PrismaSaleProduct;
  product: PrismaProduct;
};

export class PurchaseMapper {
  static toDomain({
    rawPrismaPurchase,
    rawPrismaSale,
    rawPurchaseSaleProducts = [],
  }: {
    rawPrismaPurchase: PrismaPurchase;
    rawPrismaSale: PrismaSale;
    rawPurchaseSaleProducts?: PurchaseSaleProducts[];
  }): DomainPurchase {
    const saleMapper = SaleMapper.toDomain({ rawPrismaSale });

    const purchaseSaleProducts = rawPurchaseSaleProducts.map(
      ({ purchaseSaleProduct, saleProduct, product }) =>
        PurchaseSaleProductMapper.toDomain({
          rawPrismaSale,
          rawPrismaPurchase,
          rawPrismaSaleProduct: saleProduct,
          rawPrismaProduct: product,
          rawPrismaPurchaseSaleProduct: purchaseSaleProduct,
        }),
    );

    return DomainPurchase.create(
      {
        saleId: rawPrismaPurchase.saleId,
      },
      {
        _sale: saleMapper,
        _purchaseSaleProducts: purchaseSaleProducts,
        _id: rawPrismaPurchase.id,
      },
    );
  }

  static toPersistence({
    id,
    props: { saleId },
    created_at,
  }: DomainPurchase): ToPersistenceResponse {
    return {
      id,
      saleId,
      created_at,
    };
  }
}
