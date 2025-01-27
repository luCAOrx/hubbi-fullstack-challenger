import { deepStrictEqual, ok, rejects } from "node:assert";
import { describe, it } from "node:test";
import { ValidationErrors } from "src/core/logic/domain/validations/errors/validation-errors";

import { Sale } from "@domain/entities/sale/sale";
import { MakeSaleFactory } from "@test-helpers/factories/make-user-factory";
import { InMemorySaleDatabase } from "@test-helpers/in-memory-database/in-memory-sale-database";

import { GlobalUseCaseErrors } from "../global-errors/global-use-case-errors";
import { CreateSaleUseCase } from "./create-sale-use-case";

describe("Create sale use case", () => {
  const inMemorySaleDatabase = new InMemorySaleDatabase();
  const createSaleUseCase = new CreateSaleUseCase(inMemorySaleDatabase);

  it("should be able to create a new user", async () => {
    await new MakeSaleFactory()
      .toDomain({ inMemoryDatabase: inMemorySaleDatabase })
      .then((sale) => {
        deepStrictEqual(inMemorySaleDatabase.sales[0].props, {
          name: "Produtos de limpeza",
          status: "Pendente",
          products: [
            sale.props.products.find(
              (product) => product.name === "Sabão em pó",
            ),
            sale.props.products.find(
              (product) => product.name === "Sabão líquido",
            ),
            sale.props.products.find(
              (product) => product.name === "Sabão em barra",
            ),
          ],
        });
        deepStrictEqual(inMemorySaleDatabase.sales.length, 1);
        ok(sale.created_at instanceof Date);
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
            status: "Pendente",
            products: [],
          },
        }),
      ValidationErrors.ValidationShouldNotBeEmptyError,
    );
  });

  it("should not be able to create new sale with existing name", async () => {
    await new MakeSaleFactory()
      .toDomain({ inMemoryDatabase: inMemorySaleDatabase })
      .then(async ({ props }) => {
        await rejects(
          async () => await createSaleUseCase.execute(props),
          GlobalUseCaseErrors.NameAlreadyExistsError,
        );
      });
  });
});
