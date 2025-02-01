import { Purchase } from "@domain/entities/purchase/purchase";

export abstract class PurchaseRepository {
  abstract createPurchaseWithTotalPurchases(
    purchase: Purchase,
  ): Promise<Purchase>;
  abstract findMany(page: number, perPage: number): Promise<Purchase[]>;
  abstract getTotalPurchasesCount(): Promise<number>;
}
