import { Purchase } from "@domain/entities/purchase/purchase";
import { PurchaseRepository } from "@domain/repositories/purchase-repository";

interface PurchaseCounter {
  totalPurchases: number;
}

export class InMemoryPurchaseDatabase implements PurchaseRepository {
  public purchases: Purchase[] = [];
  public purchaseCounter: PurchaseCounter = { totalPurchases: 0 };

  async createPurchaseWithTotalPurchases(
    purchase: Purchase,
  ): Promise<Purchase> {
    this.purchaseCounter.totalPurchases++;

    this.purchases.push(purchase);

    return purchase;
  }

  async findMany(page: number): Promise<Purchase[]> {
    const purchaseOrPurchases = this.purchases.map((purchases) => purchases);

    return purchaseOrPurchases.slice((page - 1) * 10, page * 10);
  }

  async getTotalPurchasesCount(): Promise<number> {
    return this.purchaseCounter.totalPurchases ?? 0;
  }
}
