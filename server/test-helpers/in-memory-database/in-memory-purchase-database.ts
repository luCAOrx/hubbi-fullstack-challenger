import { PurchaseSaleProduct } from "@domain/entities/purchase-sale-product/purchase-sale-product";
import { Purchase } from "@domain/entities/purchase/purchase";
import { SaleProduct } from "@domain/entities/sale-product/sale-product";
import { Sale } from "@domain/entities/sale/sale";
import { PurchaseRepository } from "@domain/repositories/purchase-repository";

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

    const sale = Sale.create(
      {
        name: "Make Purchase Test Unit",
        products:
          "893797b4-280b-4748-9967-3b02ecbee647,066371ee-1033-405e-8888-f0f9578876ef,803f41eb-62e1-4522-9f17-bd0c47f8f47d",
      },
      {},
    );

    const saleProducts = sale.props.products.split(",").map((productId) => {
      const saleProduct = SaleProduct.create(
        {
          saleId: sale.id,
          productId,
        },
        {},
      );

      return saleProduct;
    });

    purchaseSaleProduct = saleProducts.map((saleProduct) => {
      const purchaseSaleProduct = PurchaseSaleProduct.create(
        {
          purchaseId: purchase.id,
          saleProductId: saleProduct.id,
        },
        {},
      );

      return purchaseSaleProduct;
    });

    purchaseSaleProduct.map((purchaseSaleProduct) => {
      this.purchaseSaleProducts.push(purchaseSaleProduct);
    });

    this.purchases.push(purchase);

    return purchase;
  }

  async findMany(page: number): Promise<Purchase[]> {
    const purchaseOrPurchases = this.purchases.map((purchases) => purchases);

    return purchaseOrPurchases.slice((page - 1) * 10, page * 10);
  }

  async findPurchaseSaleProductByPurchaseId(
    purchaseId: string,
  ): Promise<Purchase | null> {
    const purchaseOrNull = this.purchases.find(
      (purchase) => purchase.id === purchaseId,
    );

    if (purchaseOrNull == null) return null;

    return purchaseOrNull;
  }

  async getTotalPurchasesCount(): Promise<number> {
    return this.purchaseCounter.totalPurchases ?? 0;
  }
}
