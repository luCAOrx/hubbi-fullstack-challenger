import { deepStrictEqual, notDeepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import { GetSalesToHttpResponse } from "@infra/http/view-models/get-sales-view-model";
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
        const {
          data,
          totalSales,
          page,
          pages,
          perPage,
        }: GetSalesToHttpResponse =
          (await response.json()) as GetSalesToHttpResponse;

        deepStrictEqual(response.status, 200);
        deepStrictEqual(data.length, 10);
        deepStrictEqual(page, 1);
        deepStrictEqual(perPage, 10);
        deepStrictEqual(pages, 3);
        deepStrictEqual(totalSales, 21);

        notDeepStrictEqual(data[0].id, data[1].id);
        notDeepStrictEqual(data[2].id, data[3].id);
        notDeepStrictEqual(data[4].id, data[5].id);
        notDeepStrictEqual(data[6].id, data[7].id);
        notDeepStrictEqual(data[8].id, data[9].id);

        deepStrictEqual(data[0].name, "Produtos de limpeza");
        deepStrictEqual(data[1].name, "Doces T");
        deepStrictEqual(data[2].name, "Doces S");
        deepStrictEqual(data[3].name, "Doces R");
        deepStrictEqual(data[4].name, "Doces Q");
        deepStrictEqual(data[5].name, "Doces P");
        deepStrictEqual(data[6].name, "Doces O");
        deepStrictEqual(data[7].name, "Doces N");
        deepStrictEqual(data[8].name, "Doces M");
        deepStrictEqual(data[9].name, "Doces L");

        deepStrictEqual(data[0].status, "Pendente");
        deepStrictEqual(data[1].status, "Pendente");
        deepStrictEqual(data[2].status, "Pendente");
        deepStrictEqual(data[3].status, "Pendente");
        deepStrictEqual(data[4].status, "Pendente");
        deepStrictEqual(data[5].status, "Pendente");
        deepStrictEqual(data[6].status, "Pendente");
        deepStrictEqual(data[7].status, "Pendente");
        deepStrictEqual(data[8].status, "Pendente");
        deepStrictEqual(data[9].status, "Pendente");
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
