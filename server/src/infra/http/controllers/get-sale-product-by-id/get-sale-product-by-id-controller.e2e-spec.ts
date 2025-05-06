import { deepStrictEqual, notDeepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import { GetSaleProductByIdToHttpResponse } from "@infra/http/view-models/get-sale-product-by-id-view-model";
import { MakeRequestFactory } from "@test-helpers/factories/make-request-factory";
import { saleId } from "@test-helpers/main.e2e-spec";

export function getSaleProductByIdControllerEndToEndTests(): void {
  describe("Get sale product by id controller", () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    it("should be able get sale product by id", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-sale-product-by-id/${saleId[0]}?page=1`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const { data, page }: GetSaleProductByIdToHttpResponse =
          (await response.json()) as GetSaleProductByIdToHttpResponse;

        deepStrictEqual(response.status, 200);
        deepStrictEqual(page, 1);
        deepStrictEqual(data.length, 10);
        notDeepStrictEqual(data[0].saleProductId, data[1].saleProductId);
        notDeepStrictEqual(data[1].saleProductId, data[2].saleProductId);
        notDeepStrictEqual(data[2].saleProductId, data[3].saleProductId);
        notDeepStrictEqual(data[3].saleProductId, data[4].saleProductId);
        notDeepStrictEqual(data[4].saleProductId, data[5].saleProductId);
        notDeepStrictEqual(data[5].saleProductId, data[6].saleProductId);
        notDeepStrictEqual(data[6].saleProductId, data[7].saleProductId);
        notDeepStrictEqual(data[7].saleProductId, data[8].saleProductId);
        notDeepStrictEqual(data[8].saleProductId, data[9].saleProductId);
        deepStrictEqual(data[0].productName, "Bolo de chocolate");
        deepStrictEqual(data[1].productName, "Arroz integral");
        deepStrictEqual(data[2].productName, "Feijão preto");
        deepStrictEqual(data[3].productName, "Açaí com granola");
        deepStrictEqual(data[4].productName, "Pão de queijo");
        deepStrictEqual(data[5].productName, "Torta de frutas");
        deepStrictEqual(data[6].productName, "Creme de leite");
        deepStrictEqual(data[7].productName, "Leite condensado");
        deepStrictEqual(data[8].productName, "Manteiga de amendoim");
        deepStrictEqual(data[9].productName, "Coco ralado");
      });
    });

    it("should be able jump to next page on sale product by id list", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-sale-product-by-id/${saleId[0]}?page=2`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const { data, page }: GetSaleProductByIdToHttpResponse =
          (await response.json()) as GetSaleProductByIdToHttpResponse;

        deepStrictEqual(response.status, 200);
        deepStrictEqual(page, 2);
        deepStrictEqual(data.length, 10);
        notDeepStrictEqual(data[0].saleProductId, data[1].saleProductId);
        notDeepStrictEqual(data[1].saleProductId, data[2].saleProductId);
        notDeepStrictEqual(data[2].saleProductId, data[3].saleProductId);
        notDeepStrictEqual(data[3].saleProductId, data[4].saleProductId);
        notDeepStrictEqual(data[4].saleProductId, data[5].saleProductId);
        notDeepStrictEqual(data[5].saleProductId, data[6].saleProductId);
        notDeepStrictEqual(data[6].saleProductId, data[7].saleProductId);
        notDeepStrictEqual(data[7].saleProductId, data[8].saleProductId);
        notDeepStrictEqual(data[8].saleProductId, data[9].saleProductId);
        deepStrictEqual(data[0].productName, "Sabonete de limão");
        deepStrictEqual(data[1].productName, "Shampoo de coco");
        deepStrictEqual(data[2].productName, "Condizente para cabelo");
        deepStrictEqual(data[3].productName, "Loção de barbear");
        deepStrictEqual(data[4].productName, "Desodorante");
        deepStrictEqual(data[5].productName, "Laca de unhas");
        deepStrictEqual(data[6].productName, "Creme hidratante para pele");
        deepStrictEqual(data[7].productName, "Kit de higiene bucal");
        deepStrictEqual(data[8].productName, "Máscara para olhos");
        deepStrictEqual(data[9].productName, "Sabão líquido");
      });
    });

    it("should not be able get sale product with sale inexistent", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-sale-product-by-id/123456?page=1`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const purchaseResponse = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(purchaseResponse, {
          statusCode: 400,
          message: "Venda não encontrada",
          error: "Bad request",
        });
      });
    });

    it("should not be able get sale product without query params of the request", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-sale-product-by-id/${saleId[0]}`,
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
