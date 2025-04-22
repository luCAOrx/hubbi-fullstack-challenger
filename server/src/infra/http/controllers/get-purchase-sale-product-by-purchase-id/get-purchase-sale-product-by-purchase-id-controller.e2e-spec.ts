import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import { GetPurchaseSaleProductByPurchaseIdToHttpResponse } from "@infra/http/view-models/get-purchase-sale-product-by-purchase-id-view-model";
import { MakeRequestFactory } from "@test-helpers/factories/make-request-factory";
import { purchaseId } from "@test-helpers/main.e2e-spec";

export function getPurchaseSaleProductByPurchaseId(): void {
  describe("Get purchase sale product by purchaseId controller", () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    it("should be able get purchase sale product by purchaseId", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-purchase-sale-product-by-purchase-id/${purchaseId[1]}`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const { data }: GetPurchaseSaleProductByPurchaseIdToHttpResponse =
          (await response.json()) as GetPurchaseSaleProductByPurchaseIdToHttpResponse;

        deepStrictEqual(response.status, 200);

        deepStrictEqual(data[0].saleName, "Doces A");
        deepStrictEqual(data[1].saleName, "Doces A");
        deepStrictEqual(data[2].saleName, "Doces A");
        deepStrictEqual(data[0].productName, "Açaí com granola");
        deepStrictEqual(data[1].productName, "Pão de queijo");
        deepStrictEqual(data[2].productName, "Torta de frutas");
        deepStrictEqual(data.length, 3);
      });
    });

    it("should not be able get purchase sale product with purchase inexistent", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-purchase-sale-product-by-purchase-id/1234`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const purchaseSaleProductResponse = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(purchaseSaleProductResponse, {
          statusCode: 400,
          message: "Compra não encontrada",
          error: "Bad request",
        });
      });
    });
  });
}
