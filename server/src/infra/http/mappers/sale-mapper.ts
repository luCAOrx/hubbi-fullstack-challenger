import { Sale as DomainSale, Status } from "@domain/entities/sale/sale";
import { Sale as PrismaSale, SaleProduct } from "@prisma/client";

interface ToPersistenceResponse {
  id: string;
  name: string;
  status: Status;
  created_at: Date;
  products: string;
}

export class SaleMapper {
  static toDomain(
    rawPrismaSale: PrismaSale,
    rawSaleProducts?: SaleProduct[],
  ): DomainSale {
    return DomainSale.create(
      {
        name: rawPrismaSale.name,
        status: rawPrismaSale.status,
        products: String(
          rawSaleProducts?.map((product) => product.productId).join(","),
        ),
      },
      { _id: rawPrismaSale.id },
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
