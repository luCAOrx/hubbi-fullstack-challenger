import { PurchaseSaleProduct as DomainPurchaseSaleProduct } from "@domain/entities/purchase-sale-product/purchase-sale-product";
import { Purchase } from "@domain/entities/purchase/purchase";
import { SaleProduct } from "@domain/entities/sale-product/sale-product";
import {
  SaleProduct as PrismaSaleProduct,
  Product as PrismaProduct,
  Sale as PrismaSale,
  Purchase as PrismaPurchase,
  PurchaseSaleProduct as PrismaPurchaseSaleProduct,
} from "@prisma/client";

import { PurchaseMapper } from "./purchase-mapper";
import { SaleProductMapper } from "./sale-product-mapper";

interface ToPersistenceResponse {
  id: string;
  saleProductId: string;
  purchaseId: string;
  purchase: Purchase;
  saleProduct: SaleProduct;
  created_at: Date;
}

export class PurchaseSaleProductMapper {
  static toDomain({
    rawPrismaSaleProduct,
    rawPrismaProduct,
    rawPrismaSale,
    rawPrismaPurchase,
    rawPrismaPurchaseSaleProduct,
  }: {
    rawPrismaSaleProduct?: PrismaSaleProduct;
    rawPrismaProduct?: PrismaProduct;
    rawPrismaSale: PrismaSale;
    rawPrismaPurchase: PrismaPurchase;
    rawPrismaPurchaseSaleProduct?: PrismaPurchaseSaleProduct;
  }): DomainPurchaseSaleProduct {
    const purchaseMapper: Purchase = PurchaseMapper.toDomain({
      rawPrismaPurchase,
      rawPrismaSale,
    });

    const saleProductMapper: SaleProduct = SaleProductMapper.toDomain({
      rawPrismaSaleProduct: rawPrismaSaleProduct!,
      rawPrismaProduct: rawPrismaProduct!,
      rawPrismaSale,
    });

    return DomainPurchaseSaleProduct.create(
      {
        purchaseId: rawPrismaPurchase.id,
        saleProductId: rawPrismaSaleProduct!.id,
      },
      {
        _id: rawPrismaPurchaseSaleProduct!.id,
        _purchase: purchaseMapper,
        _saleProduct: saleProductMapper,
      },
    );
  }

  static toPersistence({
    id,
    props: { saleProductId, purchaseId },
    purchase,
    saleProduct,
    created_at,
  }: DomainPurchaseSaleProduct): ToPersistenceResponse {
    return {
      id,
      saleProductId,
      purchaseId,
      purchase: purchase!,
      saleProduct: saleProduct!,
      created_at,
    };
  }
}
