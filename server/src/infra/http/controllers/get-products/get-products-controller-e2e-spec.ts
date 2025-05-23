import { deepStrictEqual, notDeepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import { GetProductsToHttpResponse } from "@infra/http/view-models/get-products-view-model";
import { MakeRequestFactory } from "@test-helpers/factories/make-request-factory";

export function getProductsControllerEndToEndTests(): void {
  describe("Get products controller", () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    it("should be able list product or products", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-products?page=1`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const {
          data,
          totalProducts,
          page,
          pages,
          perPage,
        }: GetProductsToHttpResponse =
          (await response.json()) as GetProductsToHttpResponse;

        deepStrictEqual(response.status, 200);
        deepStrictEqual(page, 1);
        deepStrictEqual(perPage, 10);
        deepStrictEqual(pages, 5);
        deepStrictEqual(totalProducts, 41);
        deepStrictEqual(data.length, 10);
        notDeepStrictEqual(data[0].id, data[1].id);
        notDeepStrictEqual(data[2].id, data[3].id);
        notDeepStrictEqual(data[4].id, data[5].id);
        notDeepStrictEqual(data[6].id, data[7].id);
        notDeepStrictEqual(data[8].id, data[9].id);
        deepStrictEqual(data[0].name, "Cozinheiro de madeira");
        deepStrictEqual(data[1].name, "Lâmpada de mesa");
        deepStrictEqual(data[2].name, "Mesa de centro");
        deepStrictEqual(data[3].name, "Armário de madeira");
        deepStrictEqual(data[4].name, "Praia de sofá");
        deepStrictEqual(data[5].name, "Cama de madeira");
        deepStrictEqual(data[6].name, "Sofá de couro");
        deepStrictEqual(data[7].name, "Máquina de fazer panquecas");
        deepStrictEqual(data[8].name, "Cortina de cortinagem");
        deepStrictEqual(data[9].name, "Pratilheira de vidro");
      });
    });

    it("should be able jump to next page list product or products", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-products?page=2`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const {
          data,
          totalProducts,
          page,
          pages,
          perPage,
        }: GetProductsToHttpResponse =
          (await response.json()) as GetProductsToHttpResponse;

        deepStrictEqual(response.status, 200);
        deepStrictEqual(page, 2);
        deepStrictEqual(perPage, 10);
        deepStrictEqual(pages, 5);
        deepStrictEqual(totalProducts, 41);
        deepStrictEqual(data.length, 10);
        notDeepStrictEqual(data[0].id, data[1].id);
        notDeepStrictEqual(data[2].id, data[3].id);
        notDeepStrictEqual(data[4].id, data[5].id);
        notDeepStrictEqual(data[6].id, data[7].id);
        notDeepStrictEqual(data[8].id, data[9].id);
        deepStrictEqual(data[0].name, "Fork de plástico");
        deepStrictEqual(data[1].name, "Colher de madeira");
        deepStrictEqual(data[2].name, "Tigela de papel");
        deepStrictEqual(data[3].name, "Prato de vidro");
        deepStrictEqual(data[4].name, "Máscara para armário");
        deepStrictEqual(data[5].name, "Escova de chão");
        deepStrictEqual(data[6].name, "Pano de limpar");
        deepStrictEqual(data[7].name, "Desodorizante");
        deepStrictEqual(data[8].name, "Limpeza de superfícies");
        deepStrictEqual(data[9].name, "Lavagem de louça");
      });
    });

    it("should not be able to list products if query params not same as page", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-products?fakePage=1`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const responseBody = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(responseBody, {
          statusCode: 400,
          message:
            "The query parameters: page must be provided in the query parameters of the request",
          error: "Bad request",
        });
      });
    });

    it("should not be able list products without query params of the request", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-products`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const responseBody = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(responseBody, {
          statusCode: 400,
          message:
            "The query parameters: page must be provided in the query parameters of the request",
          error: "Bad request",
        });
      });
    });
  });
}
