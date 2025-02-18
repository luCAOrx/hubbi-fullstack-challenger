import { deepStrictEqual, ok, rejects } from "node:assert";
import { describe, it } from "node:test";

import { Purchase } from "@domain/entities/purchase/purchase";
import { MakePurchaseFactory } from "@test-helpers/factories/make-purchase-factory";
import { MakeSaleFactory } from "@test-helpers/factories/make-sale-factory";
import { InMemoryPurchaseDatabase } from "@test-helpers/in-memory-database/in-memory-purchase-database";
import { InMemorySaleDatabase } from "@test-helpers/in-memory-database/in-memory-sale-database";

import { CreatePurchaseUseCase } from "./create-purchase-use-case";
import { CreatePurchaseUseCaseErrors } from "./errors/sale-not-found-error";

describe("Create purchase use case", () => {
  const inMemorySaleDatabase = new InMemorySaleDatabase();
  const inMemoryPurchaseDatabase = new InMemoryPurchaseDatabase();
  const createPurchaseUseCase = new CreatePurchaseUseCase(
    inMemoryPurchaseDatabase,
    inMemorySaleDatabase,
  );

  it("should be able to create a new purchase", async () => {
    await new MakePurchaseFactory()
      .toDomain({
        inMemoryDatabaseToPurchase: inMemoryPurchaseDatabase,
        inMemoryDatabaseToSale: inMemorySaleDatabase,
      })
      .then(({ purchase, sale }) => {
        deepStrictEqual(inMemoryPurchaseDatabase.purchases[0].props, {
          saleId: sale.id,
          products: "1,2,3",
        });
        deepStrictEqual(
          inMemorySaleDatabase.sales[0].props.status,
          "Finalizada",
        );
        deepStrictEqual(inMemorySaleDatabase.sales.length, 1);
        deepStrictEqual(inMemoryPurchaseDatabase.purchases.length, 1);
        ok(purchase.created_at instanceof Date);
        ok(purchase instanceof Purchase);
      });
  });

  it("should not be able to create new purchase with invalid data", async () => {
    await rejects(
      async () =>
        await new MakePurchaseFactory().toDomain({
          saleId: "33731c7a-d990-48c6-8168-36fd6cdf06fd",
          inMemoryDatabaseToPurchase: inMemoryPurchaseDatabase,
          override: {
            products: "",
          },
        }),
    );
  });

  it("should not be able create purchase with sale inexistent", async () => {
    await new MakeSaleFactory()
      .toDomain({
        inMemoryDatabase: inMemorySaleDatabase,
      })
      .then(async ({ props: { products } }) => {
        await rejects(
          async () =>
            await createPurchaseUseCase.execute({
              saleId: "f2983hf",
              products,
            }),
          CreatePurchaseUseCaseErrors.SaleNotFoundError,
        );
      });
  });
});
