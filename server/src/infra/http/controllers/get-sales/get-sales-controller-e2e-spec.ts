import { deepStrictEqual } from "node:assert";
import { describe, it, ok } from "node:test";

import { Sale } from "@domain/entities/sale/sale";
import { GeSalesResponse } from "@domain/use-cases/get-sales/get-sales-use-case";
import { MakeRequestFactory } from "@test-helpers/factories/make-request-factory";

export function getSalesControllerEndToEndTests(): void {
  describe("Get sales controller", () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    it("should be able list sale or sales", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-sales?page=1`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const { data, totalSales, page, pages, perPage }: GeSalesResponse =
          (await response.json()) as GeSalesResponse;
        console.log(data[0].props);

        deepStrictEqual(response.status, 200);
        deepStrictEqual(data.length, 10);
        deepStrictEqual(page, 1);
        deepStrictEqual(perPage, 10);
        deepStrictEqual(pages, 3);
        deepStrictEqual(totalSales, 21);
      });
    });

    it("should not be able to list sales if query params not same as page", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-sales?fakePage=1`,
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

    it("should not be able list sales without query params of the request", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-sales`,
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
