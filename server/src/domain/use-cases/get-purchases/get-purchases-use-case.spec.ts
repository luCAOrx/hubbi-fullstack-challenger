import { deepStrictEqual, notDeepStrictEqual } from "node:assert";
import { describe, it, before } from "node:test";

import { MakePurchaseFactory } from "@test-helpers/factories/make-purchase-factory";
import { InMemoryPurchaseDatabase } from "@test-helpers/in-memory-database/in-memory-purchase-database";

import { GetPurchasesUseCase } from "./get-purchases-use-case";

describe("Get purchases use case", () => {
  const inMemoryPurchaseDatabase = new InMemoryPurchaseDatabase();
  const getPurchasesUseCase = new GetPurchasesUseCase(inMemoryPurchaseDatabase);
  const saleIds: string[] = [];

  before(async () => {
    for (let i = 0; i < 20; i++) {
      const letter = String.fromCharCode(65 + i);

      await new MakePurchaseFactory()
        .toDomain({
          inMemoryDatabase: inMemoryPurchaseDatabase,
          override: {
            saleName: `Doces ${letter}`,
          },
        })
        .then(({ sale }) => {
          saleIds.push(sale.id);
        });
    }
  });

  it("should be able list purchase or purchases", async () => {
    await getPurchasesUseCase
      .execute({})
      .then(({ page, pages, perPage, totalPurchases, data }) => {
        notDeepStrictEqual(data.length, 11);
        deepStrictEqual(page, 1);
        deepStrictEqual(pages, 2);
        deepStrictEqual(perPage, 10);
        deepStrictEqual(totalPurchases, 20);
        deepStrictEqual(inMemoryPurchaseDatabase.purchases.length, 20);
        deepStrictEqual(data[0].props.saleId, saleIds[0]);
        deepStrictEqual(data[1].props.saleId, saleIds[0]);
        deepStrictEqual(data[2].props.saleId, saleIds[0]);
        deepStrictEqual(data[3].props.saleId, saleIds[0]);
        deepStrictEqual(data[4].props.saleId, saleIds[0]);
        deepStrictEqual(data[5].props.saleId, saleIds[0]);
        deepStrictEqual(data[6].props.saleId, saleIds[0]);
        deepStrictEqual(data[7].props.saleId, saleIds[0]);
        deepStrictEqual(data[8].props.saleId, saleIds[0]);
        deepStrictEqual(data[9].props.saleId, saleIds[0]);
        deepStrictEqual(data[0].sale.props.name, "Doces A");
        deepStrictEqual(data[1].sale.props.name, "Doces A");
        deepStrictEqual(data[2].sale.props.name, "Doces A");
        deepStrictEqual(data[3].sale.props.name, "Doces A");
        deepStrictEqual(data[4].sale.props.name, "Doces A");
        deepStrictEqual(data[5].sale.props.name, "Doces A");
        deepStrictEqual(data[6].sale.props.name, "Doces A");
        deepStrictEqual(data[7].sale.props.name, "Doces A");
        deepStrictEqual(data[8].sale.props.name, "Doces A");
        deepStrictEqual(data[9].sale.props.name, "Doces A");
      });
  });

  it("should be able jump to next page on purchases list", async () => {
    await getPurchasesUseCase
      .execute({ page: 2 })
      .then(({ page, pages, perPage, totalPurchases, data }) => {
        notDeepStrictEqual(data.length, 11);
        deepStrictEqual(page, 2);
        deepStrictEqual(pages, 2);
        deepStrictEqual(perPage, 10);
        deepStrictEqual(totalPurchases, 20);
        deepStrictEqual(inMemoryPurchaseDatabase.purchases.length, 20);
        deepStrictEqual(data[0].props.saleId, saleIds[0]);
        deepStrictEqual(data[1].props.saleId, saleIds[0]);
        deepStrictEqual(data[2].props.saleId, saleIds[0]);
        deepStrictEqual(data[3].props.saleId, saleIds[0]);
        deepStrictEqual(data[4].props.saleId, saleIds[0]);
        deepStrictEqual(data[5].props.saleId, saleIds[0]);
        deepStrictEqual(data[6].props.saleId, saleIds[0]);
        deepStrictEqual(data[7].props.saleId, saleIds[0]);
        deepStrictEqual(data[8].props.saleId, saleIds[0]);
        deepStrictEqual(data[9].props.saleId, saleIds[0]);
        deepStrictEqual(data[0].sale.props.name, "Doces A");
        deepStrictEqual(data[1].sale.props.name, "Doces A");
        deepStrictEqual(data[2].sale.props.name, "Doces A");
        deepStrictEqual(data[3].sale.props.name, "Doces A");
        deepStrictEqual(data[4].sale.props.name, "Doces A");
        deepStrictEqual(data[5].sale.props.name, "Doces A");
        deepStrictEqual(data[6].sale.props.name, "Doces A");
        deepStrictEqual(data[7].sale.props.name, "Doces A");
        deepStrictEqual(data[8].sale.props.name, "Doces A");
        deepStrictEqual(data[9].sale.props.name, "Doces A");
      });
  });
});
