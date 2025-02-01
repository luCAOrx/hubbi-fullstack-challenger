import { deepStrictEqual, ok, rejects } from "node:assert";
import { describe, it } from "node:test";

import { Sale } from "@domain/entities/sale/sale";
import { MakeSaleFactory } from "@test-helpers/factories/make-sale-factory";
import { InMemorySaleDatabase } from "@test-helpers/in-memory-database/in-memory-sale-database";

import { CreateSaleUseCase } from "./create-sale-use-case";
import { CreateSaleUseCaseErrors } from "./errors/sale-already-exists-error";

describe("Create sale use case", () => {
  const inMemorySaleDatabase = new InMemorySaleDatabase();
  const createSaleUseCase = new CreateSaleUseCase(inMemorySaleDatabase);

  it("should be able to create a new sale", async () => {
    await createSaleUseCase
      .execute({
        name: "Produtos A",
        products: "1,2,3",
      })
      .then(({ sale }) => {
        deepStrictEqual(inMemorySaleDatabase.sales[0].props, {
          name: "Produtos A",
          status: "Pendente",
          products: "1,2,3",
        });
        deepStrictEqual(inMemorySaleDatabase.saleCounter.totalSales, 1);
        ok(inMemorySaleDatabase.sales[0].created_at instanceof Date);
        ok(sale instanceof Sale);
      });

    await createSaleUseCase
      .execute({
        name: "Produtos B",
        products: "1,2,3",
      })
      .then(({ sale }) => {
        deepStrictEqual(inMemorySaleDatabase.sales[1].props, {
          name: "Produtos B",
          status: "Pendente",
          products: "1,2,3",
        });
        deepStrictEqual(inMemorySaleDatabase.saleCounter.totalSales, 2);
        deepStrictEqual(inMemorySaleDatabase.sales.length, 2);
        ok(inMemorySaleDatabase.sales[0].created_at instanceof Date);
        ok(sale instanceof Sale);
      });

    await createSaleUseCase
      .execute({
        name: "Produtos C",
        products: "1,2,3",
      })
      .then(({ sale }) => {
        deepStrictEqual(inMemorySaleDatabase.sales[2].props, {
          name: "Produtos C",
          status: "Pendente",
          products: "1,2,3",
        });
        deepStrictEqual(inMemorySaleDatabase.saleCounter.totalSales, 3);
        deepStrictEqual(inMemorySaleDatabase.sales.length, 3);
        ok(inMemorySaleDatabase.sales[0].created_at instanceof Date);
        ok(sale instanceof Sale);
      });
  });

  it("should not be able to create new sale with invalid data", async () => {
    await rejects(
      async () =>
        await new MakeSaleFactory().toDomain({
          inMemoryDatabase: inMemorySaleDatabase,
          override: {
            name: "",
            products: "",
          },
        }),
    );
  });

  it("should not be able to create new sale with existing name", async () => {
    await new MakeSaleFactory()
      .toDomain({ inMemoryDatabase: inMemorySaleDatabase })
      .then(async ({ props }) => {
        await rejects(
          async () => await createSaleUseCase.execute(props),
          CreateSaleUseCaseErrors.SaleAlreadyExistsError,
        );
      });
  });
});
