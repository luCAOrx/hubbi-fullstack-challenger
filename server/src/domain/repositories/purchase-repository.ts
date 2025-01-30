import { Purchase } from "@domain/entities/purchase/purchase";

export abstract class PurchaseRepository {
  abstract create(purchase: Purchase): Promise<Purchase>;
  abstract findMany(page: number): Promise<Purchase[]>;
}
