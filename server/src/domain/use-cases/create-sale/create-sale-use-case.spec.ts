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
        products:
          "ab5b8162-553b-4807-920e-49693b4e7dfc,cf4523df-ae70-4e13-82d3-4f71314f0177,416a797d-bda4-449c-895b-b32462ae92e0",
      })
      .then(({ sale }) => {
        const saleProduct = inMemorySaleDatabase.saleProducts;

        deepStrictEqual(saleProduct[0].props.saleId, sale.id);
        deepStrictEqual(saleProduct[1].props.saleId, sale.id);
        deepStrictEqual(saleProduct[2].props.saleId, sale.id);

        deepStrictEqual(
          saleProduct[0].props.productId,
          "ab5b8162-553b-4807-920e-49693b4e7dfc",
        );
        deepStrictEqual(
          saleProduct[1].props.productId,
          "cf4523df-ae70-4e13-82d3-4f71314f0177",
        );
        deepStrictEqual(
          saleProduct[2].props.productId,
          "416a797d-bda4-449c-895b-b32462ae92e0",
        );
        deepStrictEqual(inMemorySaleDatabase.saleProducts.length, 3);

        deepStrictEqual(inMemorySaleDatabase.sales[0].props, {
          name: "Produtos A",
          status: "Pendente",
          products:
            "ab5b8162-553b-4807-920e-49693b4e7dfc,cf4523df-ae70-4e13-82d3-4f71314f0177,416a797d-bda4-449c-895b-b32462ae92e0",
        });
        deepStrictEqual(inMemorySaleDatabase.saleCounter.totalSales, 1);
        ok(inMemorySaleDatabase.sales[0].created_at instanceof Date);
        ok(sale instanceof Sale);
      });

    await createSaleUseCase
      .execute({
        name: "Produtos B",
        products:
          "444179a6-ff23-4d8b-8e55-8e65ccc0a32f,a0b368dc-4cd4-4529-9f71-8b1e5d729773,fdf5f18e-7e6c-4e87-8c04-3455d449af56",
      })
      .then(({ sale }) => {
        const saleProduct = inMemorySaleDatabase.saleProducts;

        deepStrictEqual(saleProduct[3].props.saleId, sale.id);
        deepStrictEqual(saleProduct[4].props.saleId, sale.id);
        deepStrictEqual(saleProduct[5].props.saleId, sale.id);

        deepStrictEqual(
          saleProduct[3].props.productId,
          "444179a6-ff23-4d8b-8e55-8e65ccc0a32f",
        );
        deepStrictEqual(
          saleProduct[4].props.productId,
          "a0b368dc-4cd4-4529-9f71-8b1e5d729773",
        );
        deepStrictEqual(
          saleProduct[5].props.productId,
          "fdf5f18e-7e6c-4e87-8c04-3455d449af56",
        );
        deepStrictEqual(inMemorySaleDatabase.saleProducts.length, 6);

        deepStrictEqual(inMemorySaleDatabase.sales[1].props, {
          name: "Produtos B",
          status: "Pendente",
          products:
            "444179a6-ff23-4d8b-8e55-8e65ccc0a32f,a0b368dc-4cd4-4529-9f71-8b1e5d729773,fdf5f18e-7e6c-4e87-8c04-3455d449af56",
        });
        deepStrictEqual(inMemorySaleDatabase.saleCounter.totalSales, 2);
        deepStrictEqual(inMemorySaleDatabase.sales.length, 2);
        ok(inMemorySaleDatabase.sales[0].created_at instanceof Date);
        ok(sale instanceof Sale);
      });

    await createSaleUseCase
      .execute({
        name: "Produtos C",
        products:
          "d95f56ae-71f8-49ee-927d-07d652f4ad42,de74d057-c3a5-40cc-a7ec-76099d828541,c8e4ce7f-2559-45a1-945b-043b6defd17b",
      })
      .then(({ sale }) => {
        const saleProduct = inMemorySaleDatabase.saleProducts;

        deepStrictEqual(saleProduct[6].props.saleId, sale.id);
        deepStrictEqual(saleProduct[7].props.saleId, sale.id);
        deepStrictEqual(saleProduct[8].props.saleId, sale.id);

        deepStrictEqual(
          saleProduct[6].props.productId,
          "d95f56ae-71f8-49ee-927d-07d652f4ad42",
        );
        deepStrictEqual(
          saleProduct[7].props.productId,
          "de74d057-c3a5-40cc-a7ec-76099d828541",
        );
        deepStrictEqual(
          saleProduct[8].props.productId,
          "c8e4ce7f-2559-45a1-945b-043b6defd17b",
        );
        deepStrictEqual(inMemorySaleDatabase.saleProducts.length, 9);

        deepStrictEqual(inMemorySaleDatabase.sales[2].props, {
          name: "Produtos C",
          status: "Pendente",
          products:
            "d95f56ae-71f8-49ee-927d-07d652f4ad42,de74d057-c3a5-40cc-a7ec-76099d828541,c8e4ce7f-2559-45a1-945b-043b6defd17b",
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
