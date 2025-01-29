import { deepStrictEqual, notDeepStrictEqual } from "node:assert";
import { describe, it, before } from "node:test";

import { MakeSaleFactory } from "@test-helpers/factories/make-sale-factory";
import { InMemorySaleDatabase } from "@test-helpers/in-memory-database/in-memory-sale-database";

import { GetSalesUseCase } from "./get-sales-use-case";

describe("Get sales use case", () => {
  const inMemorySaleDatabase = new InMemorySaleDatabase();
  const getSalesUseCase = new GetSalesUseCase(inMemorySaleDatabase);

  before(async () => {
    for (let i = 0; i < 20; i++) {
      const letter = String.fromCharCode(65 + i);

      await new MakeSaleFactory().toDomain({
        inMemoryDatabase: inMemorySaleDatabase,
        override: {
          name: `Doces ${letter}`,
        },
      });
    }
  });

  it("should be able list sale or sales", async () => {
    await getSalesUseCase.execute({}).then((response) => {
      notDeepStrictEqual(response.length, 11);
      deepStrictEqual(response.length, 10);
      deepStrictEqual(inMemorySaleDatabase.sales.length, 20);
      deepStrictEqual(response[0].props.name, "Doces A");
      deepStrictEqual(response[1].props.name, "Doces B");
      deepStrictEqual(response[2].props.name, "Doces C");
      deepStrictEqual(response[3].props.name, "Doces D");
      deepStrictEqual(response[4].props.name, "Doces E");
      deepStrictEqual(response[5].props.name, "Doces F");
      deepStrictEqual(response[6].props.name, "Doces G");
      deepStrictEqual(response[7].props.name, "Doces H");
      deepStrictEqual(response[8].props.name, "Doces I");
      deepStrictEqual(response[9].props.name, "Doces J");
    });
  });
});
