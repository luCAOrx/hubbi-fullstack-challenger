import { Product } from "@domain/entities/product/product";

export abstract class ProductRepository {
  abstract findMany(page: number, perPage: number): Promise<Product[]>;
  abstract getTotalProductsCount(): Promise<number>;
}
