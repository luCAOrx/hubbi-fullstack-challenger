import { deepStrictEqual, notDeepStrictEqual } from "node:assert";
import { describe, it, before } from "node:test";

import { MakePurchaseFactory } from "@test-helpers/factories/make-purchase-factory";
import { MakeSaleFactory } from "@test-helpers/factories/make-sale-factory";
import { InMemoryPurchaseDatabase } from "@test-helpers/in-memory-database/in-memory-purchase-database";
import { InMemorySaleDatabase } from "@test-helpers/in-memory-database/in-memory-sale-database";

import { GetPurchasesUseCase } from "./get-purchases-use-case";

describe("Get purchases use case", () => {
  const inMemoryPurchaseDatabase = new InMemoryPurchaseDatabase();
  const inMemorySaleDatabase = new InMemorySaleDatabase();
  const getPurchasesUseCase = new GetPurchasesUseCase(inMemoryPurchaseDatabase);

  before(async () => {
    for (let i = 0; i < 20; i++) {
      const letter = String.fromCharCode(65 + i);

      await new MakeSaleFactory().toDomain({
        inMemoryDatabase: inMemorySaleDatabase,
        override: {
          name: `Doces ${letter}`,
        },
      });

      await new MakePurchaseFactory().toDomain({
        inMemoryDatabaseToPurchase: inMemoryPurchaseDatabase,
        inMemoryDatabaseToSale: inMemorySaleDatabase,
      });
    }
  });

  it("should be able list purchase or purchases", async () => {
    await getPurchasesUseCase.execute({ page: 2 }).then((response) => {
      notDeepStrictEqual(response.length, 11);
      deepStrictEqual(response.length, 10);
      deepStrictEqual(inMemoryPurchaseDatabase.purchases.length, 20);
      deepStrictEqual(response[0].props.products, "1,2,3");
      deepStrictEqual(response[1].props.products, "1,2,3");
      deepStrictEqual(response[2].props.products, "1,2,3");
      deepStrictEqual(response[3].props.products, "1,2,3");
      deepStrictEqual(response[4].props.products, "1,2,3");
      deepStrictEqual(response[5].props.products, "1,2,3");
      deepStrictEqual(response[6].props.products, "1,2,3");
      deepStrictEqual(response[7].props.products, "1,2,3");
      deepStrictEqual(response[8].props.products, "1,2,3");
      deepStrictEqual(response[9].props.products, "1,2,3");
    });
  });
});
