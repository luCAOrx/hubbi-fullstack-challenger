import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import { MakeRequestFactory } from "@test-helpers/factories/make-request-factory";
import { MakeSaleFactory } from "@test-helpers/factories/make-sale-factory";

export function createSaleControllerEndToEndTests(): void {
  describe("Create sale controller", () => {
    it("should be able create new sale", async () => {
      await new MakeSaleFactory().toHttp({}).then(async (response) => {
        const responseBody: any = await response.json();

        deepStrictEqual(response.status, 201);
        deepStrictEqual(responseBody, {
          sale: {
            id: responseBody.sale.id,
            name: "Produtos de limpeza",
            status: "Pendente",
            products:
              "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
            created_at: responseBody.sale.created_at,
          },
        });
      });
    });

    it("should not be able to create new sale with existing sale", async () => {
      await new MakeSaleFactory()
        .toHttp({
          override: {
            name: "Produtos de limpeza",
          },
        })
        .then(async (response) => {
          const responseBody = await response.json();

          deepStrictEqual(response.status, 400);
          deepStrictEqual(responseBody, {
            statusCode: 400,
            message: "Uma venda com esse nome já existe",
            error: "Bad request",
          });
        });
    });

    it("should not be able to create new sale without properties of request body", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/create-sale`,
        method: "POST",
        headers,
        data: {},
      }).then(async (response) => {
        const responseBody = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(responseBody, {
          statusCode: 400,
          message:
            "The properties: name, status and products, should be provided in the request body",
          error: "Bad request",
        });
      });
    });

    it("should not be able to create new sale if properties of request body not same as name, status and products", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/create-sale`,
        method: "POST",
        headers,
        data: {
          fakeName: "zzzzz",
          fakeStatus: "xxxxx",
          fakeProducts: "lllllll",
        },
      }).then(async (response) => {
        const responseBody = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(responseBody, {
          statusCode: 400,
          message:
            "The properties: name, status and products, should be provided in the request body",
          error: "Bad request",
        });
      });
    });

    it("should not be able to create new sale just with name property of the request body", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/create-sale`,
        method: "POST",
        headers,
        data: { name: "Produtos de limpeza" },
      }).then(async (response) => {
        const responseBody = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(responseBody, {
          statusCode: 400,
          message:
            "The properties: name, status and products, should be provided in the request body",
          error: "Bad request",
        });
      });
    });

    it("should not be able to create new sale just with status property of the request body", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/create-sale`,
        method: "POST",
        headers,
        data: { status: "Pendente" },
      }).then(async (response) => {
        const responseBody = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(responseBody, {
          statusCode: 400,
          message:
            "The properties: name, status and products, should be provided in the request body",
          error: "Bad request",
        });
      });
    });

    it("should not be able to create new sale just with products property of the request body", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/create-sale`,
        method: "POST",
        headers,
        data: { products: "1,2,3" },
      }).then(async (response) => {
        const responseBody = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(responseBody, {
          statusCode: 400,
          message:
            "The properties: name, status and products, should be provided in the request body",
          error: "Bad request",
        });
      });
    });

    it("should not be able to create new sale with field name empty", async () => {
      await new MakeSaleFactory()
        .toHttp({ override: { name: "" } })
        .then(async (response) => {
          const responseBody = await response.json();

          deepStrictEqual(response.status, 400);
          deepStrictEqual(responseBody, {
            statusCode: 400,
            message: "The field name should not be empty",
            error: "Bad request",
          });
        });
    });

    it("should not be able to create new sale with field name more than 150 characters", async () => {
      await new MakeSaleFactory()
        .toHttp({ override: { name: "Produtos de limpeza".repeat(160) } })
        .then(async (response) => {
          const responseBody = await response.json();

          deepStrictEqual(response.status, 400);
          deepStrictEqual(responseBody, {
            statusCode: 400,
            message: "The field name should be less than 150 characters",
            error: "Bad request",
          });
        });
    });

    it("should not be able to create new sale with field name less than 6 characters", async () => {
      await new MakeSaleFactory()
        .toHttp({ override: { name: "Prod" } })
        .then(async (response) => {
          const responseBody = await response.json();

          deepStrictEqual(response.status, 400);
          deepStrictEqual(responseBody, {
            statusCode: 400,
            message: "The field name should be greater than 6 characters",
            error: "Bad request",
          });
        });
    });

    it("should not be able to create new sale with field products empty", async () => {
      await new MakeSaleFactory()
        .toHttp({ override: { products: "" } })
        .then(async (response) => {
          const responseBody = await response.json();

          deepStrictEqual(response.status, 400);
          deepStrictEqual(responseBody, {
            statusCode: 400,
            message: "The field products should not be empty",
            error: "Bad request",
          });
        });
    });
  });
}
