import { deepStrictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { ValidationErrors } from "src/core/logic/domain/validations/errors/validation-errors";

import { Sale } from "./sale";

describe("Sale entity", () => {
  it("should be able to create a new pending sale", () => {
    const sale = Sale.create(
      {
        name: "Produtos de limpeza",
        status: "Pendente",
        products: "1,2,3",
      },
      {},
    );

    deepStrictEqual(sale.id, sale.id);
    deepStrictEqual(sale.props, {
      name: "Produtos de limpeza",
      status: "Pendente",
      products: "1,2,3",
    });
  });

  it("should be able to create a new finished sale", () => {
    const sale = Sale.create(
      {
        name: "Produtos de limpeza",
        status: "Finalizada",
        products: "1,2,3",
      },
      {},
    );

    deepStrictEqual(sale.id, sale.id);
    deepStrictEqual(sale.props, {
      name: "Produtos de limpeza",
      status: "Finalizada",
      products: "1,2,3",
    });
  });

  it("should not be able to create a new sale with field name empty", () => {
    throws(
      () =>
        Sale.create(
          {
            name: "",
            status: "Finalizada",
            products: "1,2,3",
          },
          {},
        ),
      ValidationErrors.ValidationShouldNotBeEmptyError,
    );
  });

  it("should not be able to create a new sale with field name not be string", () => {
    throws(
      () =>
        Sale.create(
          {
            name: "1234567890",
            status: "Finalizada",
            products: "1,2,3",
          },
          {},
        ),
      ValidationErrors.ValidationShouldOnlyAcceptLettersError,
    );
  });

  it("should not be able to create a new sale with field name greater than 150 characters", () => {
    throws(
      () =>
        Sale.create(
          {
            name: "Produtos de limpeza".repeat(160),
            status: "Finalizada",
            products: "1,2,3",
          },
          {},
        ),
      ValidationErrors.ValidationShouldBeLessThanError,
    );
  });

  it("should not be able to create a new sale with field name less than 6 characters", () => {
    throws(
      () =>
        Sale.create(
          {
            name: "Cama",
            status: "Finalizada",
            products: "1,2,3",
          },
          {},
        ),
      ValidationErrors.ValidationShouldBeGreaterThanError,
    );
  });

  it("should not be able to create a new sale with field products empty", () => {
    throws(
      () =>
        Sale.create(
          {
            name: "Produtos de limpeza",
            status: "Finalizada",
            products: "",
          },
          {},
        ),
      ValidationErrors.ValidationShouldNotBeEmptyError,
    );
  });
});
