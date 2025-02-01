import { deepStrictEqual, notDeepStrictEqual } from "node:assert";
import { describe, it, before } from "node:test";

import { InMemorySaleDatabase } from "@test-helpers/in-memory-database/in-memory-sale-database";

import { CreateSaleUseCase } from "../create-sale/create-sale-use-case";
import { GetSalesUseCase } from "./get-sales-use-case";

describe("Get sales use case", () => {
  const inMemorySaleDatabase = new InMemorySaleDatabase();
  const getSalesUseCase = new GetSalesUseCase(inMemorySaleDatabase);
  const createSaleUseCase = new CreateSaleUseCase(inMemorySaleDatabase);

  before(async () => {
    for (let i = 0; i < 20; i++) {
      const letter = String.fromCharCode(65 + i);

      await createSaleUseCase.execute({
        name: `Doces ${letter}`,
        products: "1,2,3",
      });
    }
  });

  it("should be able list sale or sales", async () => {
    await getSalesUseCase
      .execute({})
      .then(({ page, pages, perPage, totalSales, data }) => {
        notDeepStrictEqual(data.length, 11);
        deepStrictEqual(page, 1);
        deepStrictEqual(pages, 2);
        deepStrictEqual(perPage, 10);
        deepStrictEqual(totalSales, 20);
        deepStrictEqual(inMemorySaleDatabase.sales.length, 20);
        deepStrictEqual(data[0].props.name, "Doces A");
        deepStrictEqual(data[1].props.name, "Doces B");
        deepStrictEqual(data[2].props.name, "Doces C");
        deepStrictEqual(data[3].props.name, "Doces D");
        deepStrictEqual(data[4].props.name, "Doces E");
        deepStrictEqual(data[5].props.name, "Doces F");
        deepStrictEqual(data[6].props.name, "Doces G");
        deepStrictEqual(data[7].props.name, "Doces H");
        deepStrictEqual(data[8].props.name, "Doces I");
        deepStrictEqual(data[9].props.name, "Doces J");
      });
  });

  it("should be able jump to next page on sales list", async () => {
    await getSalesUseCase
      .execute({ page: 2 })
      .then(({ page, pages, perPage, totalSales, data }) => {
        notDeepStrictEqual(data.length, 11);
        deepStrictEqual(page, 2);
        deepStrictEqual(pages, 2);
        deepStrictEqual(perPage, 10);
        deepStrictEqual(totalSales, 20);
        deepStrictEqual(inMemorySaleDatabase.sales.length, 20);
        deepStrictEqual(data[0].props.name, "Doces K");
        deepStrictEqual(data[1].props.name, "Doces L");
        deepStrictEqual(data[2].props.name, "Doces M");
        deepStrictEqual(data[3].props.name, "Doces N");
        deepStrictEqual(data[4].props.name, "Doces O");
        deepStrictEqual(data[5].props.name, "Doces P");
        deepStrictEqual(data[6].props.name, "Doces Q");
        deepStrictEqual(data[7].props.name, "Doces R");
        deepStrictEqual(data[8].props.name, "Doces S");
        deepStrictEqual(data[9].props.name, "Doces T");
      });
  });
});
