import { deepStrictEqual } from "node:assert";
import { before, describe, it } from "node:test";

import { MakePurchaseFactory } from "@test-helpers/factories/make-purchase-factory";
import { MakeRequestFactory } from "@test-helpers/factories/make-request-factory";
import { makeSaleFactoryToHttp } from "@test-helpers/main.e2e-spec";

export function getPurchasesControllerEndToEndTests(): void {
  describe("Get purchases controller", () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    let saleId: string;
    before(async () => {
      saleId = await makeSaleFactoryToHttp
        .json()
        .then(({ sale }: any) => sale.id);

      for (let i = 0; i < 20; i++) {
        await new MakePurchaseFactory().toHttp({
          saleId,
        });
      }
    });

    it("should be able list purchase or purchases", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-purchases?page=1`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const responseBody: any = await response.json();

        deepStrictEqual(response.status, 200);

        [responseBody].map(({ purchaseOrPurchases }: any) => {
          deepStrictEqual(purchaseOrPurchases.length, 10);
          deepStrictEqual(responseBody.purchaseOrPurchases[0].saleId, saleId);
          deepStrictEqual(
            responseBody.purchaseOrPurchases[0].sales.name,
            "Doces T",
          );
          deepStrictEqual(
            responseBody.purchaseOrPurchases[0].sales.status,
            "Finalizada",
          );
          deepStrictEqual(responseBody.purchaseOrPurchases[1].saleId, saleId);
          deepStrictEqual(
            responseBody.purchaseOrPurchases[1].sales.name,
            "Doces T",
          );
          deepStrictEqual(
            responseBody.purchaseOrPurchases[1].sales.status,
            "Finalizada",
          );
          deepStrictEqual(responseBody.purchaseOrPurchases[2].saleId, saleId);
          deepStrictEqual(
            responseBody.purchaseOrPurchases[2].sales.name,
            "Doces T",
          );
          deepStrictEqual(
            responseBody.purchaseOrPurchases[2].sales.status,
            "Finalizada",
          );
          deepStrictEqual(responseBody.purchaseOrPurchases[3].saleId, saleId);
          deepStrictEqual(
            responseBody.purchaseOrPurchases[3].sales.name,
            "Doces T",
          );
          deepStrictEqual(
            responseBody.purchaseOrPurchases[3].sales.status,
            "Finalizada",
          );
          deepStrictEqual(responseBody.purchaseOrPurchases[4].saleId, saleId);
          deepStrictEqual(
            responseBody.purchaseOrPurchases[4].sales.name,
            "Doces T",
          );
          deepStrictEqual(
            responseBody.purchaseOrPurchases[4].sales.status,
            "Finalizada",
          );
          deepStrictEqual(responseBody.purchaseOrPurchases[5].saleId, saleId);
          deepStrictEqual(
            responseBody.purchaseOrPurchases[5].sales.name,
            "Doces T",
          );
          deepStrictEqual(
            responseBody.purchaseOrPurchases[5].sales.status,
            "Finalizada",
          );
          deepStrictEqual(responseBody.purchaseOrPurchases[6].saleId, saleId);
          deepStrictEqual(
            responseBody.purchaseOrPurchases[6].sales.name,
            "Doces T",
          );
          deepStrictEqual(
            responseBody.purchaseOrPurchases[6].sales.status,
            "Finalizada",
          );
          deepStrictEqual(responseBody.purchaseOrPurchases[7].saleId, saleId);
          deepStrictEqual(
            responseBody.purchaseOrPurchases[7].sales.name,
            "Doces T",
          );
          deepStrictEqual(
            responseBody.purchaseOrPurchases[7].sales.status,
            "Finalizada",
          );
          deepStrictEqual(responseBody.purchaseOrPurchases[8].saleId, saleId);
          deepStrictEqual(
            responseBody.purchaseOrPurchases[8].sales.name,
            "Doces T",
          );
          deepStrictEqual(
            responseBody.purchaseOrPurchases[8].sales.status,
            "Finalizada",
          );
          deepStrictEqual(responseBody.purchaseOrPurchases[9].saleId, saleId);
          deepStrictEqual(
            responseBody.purchaseOrPurchases[9].sales.name,
            "Doces T",
          );
          deepStrictEqual(
            responseBody.purchaseOrPurchases[9].sales.status,
            "Finalizada",
          );
        });
      });
    });

    it("should not be able to list purchases if query params not same as page", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-purchases?fakePage=1`,
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

    it("should not be able list purchases without query params of the request", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-purchases`,
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
