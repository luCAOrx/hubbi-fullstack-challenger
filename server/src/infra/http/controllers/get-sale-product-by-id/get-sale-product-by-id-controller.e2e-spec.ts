import { deepStrictEqual } from "node:assert";
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
        url: `${String(process.env.TEST_SERVER_URL)}/get-sale-product-by-id/${saleId[0]}`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const { products, saleId: id }: GetSaleProductByIdToHttpResponse =
          (await response.json()) as GetSaleProductByIdToHttpResponse;

        deepStrictEqual(response.status, 200);
        deepStrictEqual(id, saleId[0]);
        deepStrictEqual(products[0].productName, "Açaí com granola");
        deepStrictEqual(products[1].productName, "Pão de queijo");
        deepStrictEqual(products[2].productName, "Torta de frutas");
      });
    });

    it("should not be able get sale product with sale inexistent", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-sale-product-by-id/123456`,
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
  });
}
