import { PurchaseSaleProduct } from "@domain/entities/purchase-sale-product/purchase-sale-product";
import { Purchase } from "@domain/entities/purchase/purchase";
import { PurchaseRepository } from "@domain/repositories/purchase-repository";
import {
  inMemorySaleProductRecord,
  inMemorySaleRecord,
} from "@test-helpers/factories/make-purchase-factory";

interface PurchaseCounter {
  totalPurchases: number;
}

export class InMemoryPurchaseDatabase implements PurchaseRepository {
  public purchases: Purchase[] = [];
  public purchaseSaleProducts: PurchaseSaleProduct[] = [];
  public purchaseCounter: PurchaseCounter = { totalPurchases: 0 };

  async transactionCreatePurchaseWithPurchaseSaleProductAndPurchaseCounter(
    purchase: Purchase,
    purchaseSaleProduct: PurchaseSaleProduct[],
  ): Promise<Purchase> {
    this.purchaseCounter.totalPurchases++;

    purchaseSaleProduct = inMemorySaleProductRecord.map((saleProduct) => {
      const purchaseSaleProduct = PurchaseSaleProduct.create(
        {
          saleProductId: saleProduct.id,
          purchaseId: purchase.id,
        },
        { _purchase: purchase, _saleProduct: saleProduct },
      );

      return purchaseSaleProduct;
    });

    purchaseSaleProduct.map((purchaseSaleProduct) => {
      this.purchaseSaleProducts.push(purchaseSaleProduct);
    });

    purchase = Purchase.create(
      { saleId: inMemorySaleRecord[0].id },
      {
        _sale: inMemorySaleRecord[0],
        _purchaseSaleProducts: this.purchaseSaleProducts,
        _id: purchase.id,
      },
    );

    this.purchases.push(purchase);

    return purchase;
  }

  async findMany(page: number): Promise<Purchase[]> {
    const purchaseOrPurchases = this.purchases.map((purchases) => purchases);

    return purchaseOrPurchases.slice((page - 1) * 10, page * 10);
  }

  async findPurchaseSaleProductByPurchaseId(
    purchaseId: string,
    page: number,
    perPage: number,
  ): Promise<PurchaseSaleProduct[] | null> {
    const purchaseOrNull = this.purchases.find(
      (purchase) => purchase.id === purchaseId,
    );

    if (purchaseOrNull == null) return null;

    return purchaseOrNull.purchaseSaleProducts.slice(
      (page - 1) * perPage,
      page * perPage,
    );
  }
  async getTotalPurchasesCount(): Promise<number> {
    return this.purchaseCounter.totalPurchases ?? 0;
  }
}
