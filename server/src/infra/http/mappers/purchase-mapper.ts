import { Purchase as DomainPurchase } from "@domain/entities/purchase/purchase";
import { Purchase as PrismaPurchase, ProductPurchase } from "@prisma/client";

interface ToPersistenceResponse {
  id: string;
  saleId: string;
  created_at: Date;
  products: string;
}

export class PurchaseMapper {
  static toDomain(
    rawPrismaPurchase: PrismaPurchase,
    rawPurchaseProducts?: ProductPurchase[],
  ): DomainPurchase {
    return DomainPurchase.create(
      {
        saleId: rawPrismaPurchase.saleId,
        products: String(
          rawPurchaseProducts?.map((product) => product.productId).join(","),
        ),
      },
      rawPrismaPurchase.id,
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
