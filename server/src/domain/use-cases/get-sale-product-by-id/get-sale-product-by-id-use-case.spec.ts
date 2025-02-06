import { deepStrictEqual, rejects } from "node:assert";
import { describe, it } from "node:test";

import { MakeSaleFactory } from "@test-helpers/factories/make-sale-factory";
import { InMemorySaleDatabase } from "@test-helpers/in-memory-database/in-memory-sale-database";

import { GlobalUseCaseErrors } from "../global-errors/global-use-case-errors";
import { GetSaleProductByIdUseCase } from "./get-sale-product-by-id-use-case";

describe("Get sale product by id use case", () => {
  const inMemorySaleDatabase = new InMemorySaleDatabase();
  const getSaleProductById = new GetSaleProductByIdUseCase(
    inMemorySaleDatabase,
  );

  it("should be able get sale product by id", async () => {
    await new MakeSaleFactory()
      .toDomain({
        inMemoryDatabase: inMemorySaleDatabase,
        override: {
          products: "0afaac83-2c90-4eea-80f0-b6d1db1f7525",
        },
      })
      .then(async (sale) => {
        await getSaleProductById
          .execute({ saleId: sale.id })
          .then(({ saleProduct }) => {
            deepStrictEqual(saleProduct.products?.length, 3);

            const products = saleProduct.products.map((product) => product);

            deepStrictEqual(
              products[0].props.name,

              "Cachorro quente 0",
            );

            deepStrictEqual(
              products[1].props.name,

              "Cachorro quente 1",
            );

            deepStrictEqual(
              products[2].props.name,

              "Cachorro quente 2",
            );

            deepStrictEqual(inMemorySaleDatabase.sales.length, 1);
          });
      });
  });

  it("should not be able get sale product with sale inexistent", async () => {
    await new MakeSaleFactory()
      .toDomain({
        inMemoryDatabase: inMemorySaleDatabase,
        override: {
          name: "Sale Two",
        },
      })
      .then(async () => {
        await rejects(
          async () =>
            await getSaleProductById.execute({
              saleId: "f2983hf",
            }),
          GlobalUseCaseErrors.SaleNotFoundError,
        );
      });
  });
});
