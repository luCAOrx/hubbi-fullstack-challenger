import { Product as DomainProduct } from "@domain/entities/product/product";
import { Product as PrismaProduct } from "@prisma/client";

interface ToPersistenceResponse {
  id: string;
  name: string;
  created_at: Date;
}

export class ProductMapper {
  static toDomain({
    rawPrismaProduct,
  }: {
    rawPrismaProduct: PrismaProduct;
  }): DomainProduct {
    return DomainProduct.create(
      {
        name: String(rawPrismaProduct?.name),
      },
      { _id: String(rawPrismaProduct?.id) },
    );
  }

  static toPersistence({
    id,
    props: { name },
    created_at,
  }: DomainProduct): ToPersistenceResponse {
    return {
      id,
      name,
      created_at,
    };
  }
}
