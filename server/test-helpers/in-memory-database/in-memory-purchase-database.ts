import { Purchase } from "@domain/entities/purchase/purchase";
import { PurchaseRepository } from "@domain/repositories/purchase-repository";

export class InMemoryPurchaseDatabase implements PurchaseRepository {
  public purchases: Purchase[] = [];

  async create(purchase: Purchase): Promise<Purchase> {
    this.purchases.push(purchase);

    return purchase;
  }

  async findMany(page: number): Promise<Purchase[]> {
    const purchaseOrPurchases = this.purchases.map((purchases) => purchases);

    return purchaseOrPurchases.slice((page - 1) * 10, page * 10);
  }
}
