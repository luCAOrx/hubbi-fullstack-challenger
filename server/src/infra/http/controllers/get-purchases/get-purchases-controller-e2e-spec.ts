import { deepStrictEqual, notDeepStrictEqual, ok } from "node:assert";
import { describe, it } from "node:test";

import { GetPurchasesToHttpResponse } from "@infra/http/view-models/get-purchases-view-model";
import { MakeRequestFactory } from "@test-helpers/factories/make-request-factory";

export function getPurchasesControllerEndToEndTests(): void {
  describe("Get purchases controller", () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

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
        }: GetPurchasesToHttpResponse =
          (await response.json()) as GetPurchasesToHttpResponse;

        deepStrictEqual(response.status, 200);
        deepStrictEqual(page, 1);
        deepStrictEqual(perPage, 10);
        deepStrictEqual(pages, 3);
        deepStrictEqual(totalPurchases, 21);
        deepStrictEqual(data.length, 10);
        notDeepStrictEqual(data[0].purchaseId, data[1].purchaseId);
        notDeepStrictEqual(data[2].purchaseId, data[3].purchaseId);
        notDeepStrictEqual(data[4].purchaseId, data[5].purchaseId);
        notDeepStrictEqual(data[6].purchaseId, data[7].purchaseId);
        notDeepStrictEqual(data[8].purchaseId, data[9].purchaseId);
        deepStrictEqual(data[0].saleName, "Doces A");
        deepStrictEqual(data[1].saleName, "Doces A");
        deepStrictEqual(data[2].saleName, "Doces A");
        deepStrictEqual(data[3].saleName, "Doces A");
        deepStrictEqual(data[4].saleName, "Doces A");
        deepStrictEqual(data[5].saleName, "Doces A");
        deepStrictEqual(data[6].saleName, "Doces A");
        deepStrictEqual(data[7].saleName, "Doces A");
        deepStrictEqual(data[8].saleName, "Doces A");
        deepStrictEqual(data[9].saleName, "Doces A");
        ok(new Date(data[0].purchase_created_at) instanceof Date);
        ok(new Date(data[1].purchase_created_at) instanceof Date);
        ok(new Date(data[2].purchase_created_at) instanceof Date);
        ok(new Date(data[3].purchase_created_at) instanceof Date);
        ok(new Date(data[4].purchase_created_at) instanceof Date);
        ok(new Date(data[5].purchase_created_at) instanceof Date);
        ok(new Date(data[6].purchase_created_at) instanceof Date);
        ok(new Date(data[7].purchase_created_at) instanceof Date);
        ok(new Date(data[8].purchase_created_at) instanceof Date);
        ok(new Date(data[9].purchase_created_at) instanceof Date);
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
