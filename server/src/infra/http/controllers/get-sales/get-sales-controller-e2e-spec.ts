import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

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
        const responseBody: any = await response.json();

        deepStrictEqual(response.status, 200);

        [responseBody].map(({ saleOrSales }: any) => {
          deepStrictEqual(saleOrSales.length, 10);
          deepStrictEqual(
            responseBody.saleOrSales[0].name,
            "Produtos de limpeza",
          );
          deepStrictEqual(responseBody.saleOrSales[1].name, "Doces T");
          deepStrictEqual(responseBody.saleOrSales[2].name, "Doces S");
          deepStrictEqual(responseBody.saleOrSales[3].name, "Doces R");
          deepStrictEqual(responseBody.saleOrSales[4].name, "Doces Q");
          deepStrictEqual(responseBody.saleOrSales[5].name, "Doces P");
          deepStrictEqual(responseBody.saleOrSales[6].name, "Doces O");
          deepStrictEqual(responseBody.saleOrSales[7].name, "Doces N");
          deepStrictEqual(responseBody.saleOrSales[8].name, "Doces M");
          deepStrictEqual(responseBody.saleOrSales[9].name, "Doces L");

          deepStrictEqual(responseBody.saleOrSales[0].status, "Pendente");
          deepStrictEqual(responseBody.saleOrSales[1].status, "Pendente");
          deepStrictEqual(responseBody.saleOrSales[2].status, "Pendente");
          deepStrictEqual(responseBody.saleOrSales[3].status, "Pendente");
          deepStrictEqual(responseBody.saleOrSales[4].status, "Pendente");
          deepStrictEqual(responseBody.saleOrSales[5].status, "Pendente");
          deepStrictEqual(responseBody.saleOrSales[6].status, "Pendente");
          deepStrictEqual(responseBody.saleOrSales[7].status, "Pendente");
          deepStrictEqual(responseBody.saleOrSales[8].status, "Pendente");
          deepStrictEqual(responseBody.saleOrSales[9].status, "Pendente");

          deepStrictEqual(
            responseBody.saleOrSales[0].products,
            "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
          );
          deepStrictEqual(
            responseBody.saleOrSales[1].products,
            "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
          );
          deepStrictEqual(
            responseBody.saleOrSales[2].products,
            "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
          );
          deepStrictEqual(
            responseBody.saleOrSales[3].products,
            "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
          );
          deepStrictEqual(
            responseBody.saleOrSales[4].products,
            "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
          );
          deepStrictEqual(
            responseBody.saleOrSales[5].products,
            "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
          );
          deepStrictEqual(
            responseBody.saleOrSales[6].products,
            "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
          );
          deepStrictEqual(
            responseBody.saleOrSales[7].products,
            "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
          );
          deepStrictEqual(
            responseBody.saleOrSales[8].products,
            "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
          );
          deepStrictEqual(
            responseBody.saleOrSales[9].products,
            "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
          );
        });
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
