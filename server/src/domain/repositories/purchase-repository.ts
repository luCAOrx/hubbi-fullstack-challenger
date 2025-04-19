import { PurchaseSaleProduct } from "@domain/entities/purchase-sale-product/purchase-sale-product";
import { Purchase } from "@domain/entities/purchase/purchase";

export abstract class PurchaseRepository {
  abstract transactionCreatePurchaseWithPurchaseSaleProductAndPurchaseCounter(
    purchase: Purchase,
    purchasSaleProducts: PurchaseSaleProduct[],
  ): Promise<Purchase>;
  abstract findMany(page: number, perPage: number): Promise<Purchase[]>;
  abstract findPurchaseSaleProductByPurchaseId(
    purchaseId: string,
  ): Promise<Purchase | null>;
  abstract getTotalPurchasesCount(): Promise<number>;
}
