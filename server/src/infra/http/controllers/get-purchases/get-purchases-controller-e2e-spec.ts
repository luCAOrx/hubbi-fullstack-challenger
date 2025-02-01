import { deepStrictEqual } from "node:assert";
import { before, describe, it } from "node:test";

import { GetPurchasesResponse } from "@domain/use-cases/get-purchases/get-purchases-use-case";
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
        const {
          data,
          totalPurchases,
          page,
          pages,
          perPage,
        }: GetPurchasesResponse =
          (await response.json()) as GetPurchasesResponse;

        console.log(data[0].props);

        deepStrictEqual(response.status, 200);
        deepStrictEqual(data.length, 10);
        deepStrictEqual(page, 1);
        deepStrictEqual(perPage, 10);
        deepStrictEqual(pages, 3);
        deepStrictEqual(totalPurchases, 21);
        deepStrictEqual(data.length, 10);
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
