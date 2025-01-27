import { deepStrictEqual, throws } from "node:assert";
import { randomUUID } from "node:crypto";
import { describe, it } from "node:test";
import { ValidationErrors } from "src/core/logic/domain/validations/errors/validation-errors";

import { Sale } from "./sale";

describe("Sale entity", () => {
  it("should be able to create a new pending sale", () => {
    const sale = Sale.create(
      {
        name: "Produtos de limpeza",
        status: "Pendente",
        products: [
          {
            public_id: randomUUID(),
            name: "Sabão em pó",
          },
          {
            public_id: randomUUID(),
            name: "Sabão líquido",
          },
          {
            public_id: randomUUID(),
            name: "Sabão em barra",
          },
        ],
      },
      1,
    );

    deepStrictEqual(sale.private_id, 1);
    deepStrictEqual(sale.public_id, sale.public_id);
    deepStrictEqual(sale.props, {
      name: "Produtos de limpeza",
      status: "Pendente",
      products: [
        sale.props.products.find((product) => product.name === "Sabão em pó"),
        sale.props.products.find((product) => product.name === "Sabão líquido"),
        sale.props.products.find(
          (product) => product.name === "Sabão em barra",
        ),
      ],
    });
  });

  it("should be able to create a new finished sale", () => {
    const sale = Sale.create(
      {
        name: "Produtos de limpeza",
        status: "Finalizada",
        products: [
          {
            public_id: randomUUID(),
            name: "Sabão em pó",
          },
          {
            public_id: randomUUID(),
            name: "Sabão líquido",
          },
          {
            public_id: randomUUID(),
            name: "Sabão em barra",
          },
        ],
      },
      2,
    );

    deepStrictEqual(sale.private_id, 2);
    deepStrictEqual(sale.public_id, sale.public_id);
    deepStrictEqual(sale.props, {
      name: "Produtos de limpeza",
      status: "Finalizada",
      products: [
        sale.props.products.find((product) => product.name === "Sabão em pó"),
        sale.props.products.find((product) => product.name === "Sabão líquido"),
        sale.props.products.find(
          (product) => product.name === "Sabão em barra",
        ),
      ],
    });
  });

  it("should not be able to create a new sale with field name empty", () => {
    throws(
      () =>
        Sale.create(
          {
            name: "",
            status: "Finalizada",
            products: [
              {
                public_id: randomUUID(),
                name: "Sabão em pó",
              },
              {
                public_id: randomUUID(),
                name: "Sabão líquido",
              },
              {
                public_id: randomUUID(),
                name: "Sabão em barra",
              },
            ],
          },
          2,
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
            products: [
              {
                public_id: randomUUID(),
                name: "Sabão em pó",
              },
              {
                public_id: randomUUID(),
                name: "Sabão líquido",
              },
              {
                public_id: randomUUID(),
                name: "Sabão em barra",
              },
            ],
          },
          2,
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
            products: [
              {
                public_id: randomUUID(),
                name: "Sabão em pó",
              },
              {
                public_id: randomUUID(),
                name: "Sabão líquido",
              },
              {
                public_id: randomUUID(),
                name: "Sabão em barra",
              },
            ],
          },
          2,
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
            products: [
              {
                public_id: randomUUID(),
                name: "Sabão em pó",
              },
              {
                public_id: randomUUID(),
                name: "Sabão líquido",
              },
              {
                public_id: randomUUID(),
                name: "Sabão em barra",
              },
            ],
          },
          2,
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
            products: [],
          },
          2,
        ),
      ValidationErrors.ValidationShouldNotBeEmptyError,
    );
  });
});
