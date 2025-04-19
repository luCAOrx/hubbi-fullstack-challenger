import { deepStrictEqual, ok, rejects } from "node:assert";
import { describe, it } from "node:test";

import { Purchase } from "@domain/entities/purchase/purchase";
import { Sale } from "@domain/entities/sale/sale";
import { MakePurchaseFactory } from "@test-helpers/factories/make-purchase-factory";
import { InMemoryPurchaseDatabase } from "@test-helpers/in-memory-database/in-memory-purchase-database";

import { GlobalUseCaseErrors } from "../global-errors/global-use-case-errors";
import { CreatePurchaseUseCaseErrors } from "./errors/these-products-are-not-part-of-this-sale-error";

describe("Create purchase use case", () => {
  const inMemoryPurchaseDatabase = new InMemoryPurchaseDatabase();

  it("should be able to create a new purchase", async () => {
    await new MakePurchaseFactory()
      .toDomain({
        inMemoryDatabase: inMemoryPurchaseDatabase,
      })
      .then(({ purchase, sale }) => {
        deepStrictEqual(purchase.props.saleId, sale.id);
        deepStrictEqual(sale.props.name, "Create Purchase Test Unit");
        deepStrictEqual(sale.props.status, "Finalizada");
        deepStrictEqual(
          sale.props.products,
          "1aec1cf9-3443-4e4a-a9c9-319967bfe74c,1bd59f2d-b6b8-4f63-acd9-068246b6fee5,2d1cf07f-617d-4aac-892c-6b26ceecf36f",
        );
        deepStrictEqual(sale.products![0].props.name, "Cachorro quente 0");
        deepStrictEqual(sale.products![1].props.name, "Cachorro quente 1");
        deepStrictEqual(sale.products![2].props.name, "Cachorro quente 2");
        deepStrictEqual(sale.products?.length, 3);
        deepStrictEqual(purchase.purchaseSaleProducts.length, 3);
        deepStrictEqual(
          inMemoryPurchaseDatabase.purchaseCounter.totalPurchases,
          1,
        );
        deepStrictEqual(inMemoryPurchaseDatabase.purchases.length, 1);
        ok(purchase.created_at instanceof Date);
        ok(purchase instanceof Purchase);
        ok(sale.created_at instanceof Date);
        ok(sale instanceof Sale);
      });
  });

  it("should not to be able to create a new purchase with saleProductId that not are part this sale", async () => {
    await rejects(
      async () =>
        await new MakePurchaseFactory().toDomain({
          inMemoryDatabase: inMemoryPurchaseDatabase,
          override: {
            saleProductId:
              "531295b6-b124-4b62-8fba-5ae552ccbde1,e2c51c9c-3f0b-44ba-8645-0f9797ca6dda,e84ce846-fb77-4e24-984e-eed6435437ea",
          },
        }),
      CreatePurchaseUseCaseErrors.TheseProductsAreNotPartOfThisSaleError,
    );
  });

  it("should not be able to create new purchase with field saleProductId empty", async () => {
    await rejects(
      async () =>
        await new MakePurchaseFactory().toDomain({
          inMemoryDatabase: inMemoryPurchaseDatabase,
          override: {
            saleProductId: "",
          },
        }),
      CreatePurchaseUseCaseErrors.TheseProductsAreNotPartOfThisSaleError,
    );
  });

  it("should not be able create purchase with sale inexistent", async () => {
    await rejects(
      async () =>
        await new MakePurchaseFactory().toDomain({
          inMemoryDatabase: inMemoryPurchaseDatabase,
          saleId: "f3247",
        }),
      GlobalUseCaseErrors.SaleNotFoundError,
    );
  });
});
