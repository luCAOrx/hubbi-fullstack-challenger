import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import { GetSalesToHttpResponse } from "@infra/http/view-models/get-sales-view-model";
import { CreatePurchaseToHttpResponse } from "@infra/http/view-models/purchase-view-model";
import { MakePurchaseFactory } from "@test-helpers/factories/make-purchase-factory";
import { MakeRequestFactory } from "@test-helpers/factories/make-request-factory";
import { saleId } from "@test-helpers/main.e2e-spec";

export function createPurchaseControllerEndToEndTests(): void {
  describe("Create purchase controller", () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    it("should be able create new purchase", async () => {
      const status = await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-sales?page=3`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const { data }: GetSalesToHttpResponse =
          (await response.json()) as GetSalesToHttpResponse;

        return data[0].status;
      });

      await new MakePurchaseFactory()
        .toHttp({ saleId: saleId[0] })
        .then(async (response) => {
          const purchase: CreatePurchaseToHttpResponse =
            (await response.json()) as CreatePurchaseToHttpResponse;

          deepStrictEqual(response.status, 201);
          deepStrictEqual(status, "Finalizada");
          deepStrictEqual(purchase, {
            id: purchase.id,
            saleId: purchase.saleId,
            created_at: purchase.created_at,
          });
        });
    });

    it("should not be able to create a new purchase with products that not are part this sale", async () => {
      await new MakePurchaseFactory()
        .toHttp({
          saleId: saleId[0],
          override: {
            saleProductId: "2",
          },
        })
        .then(async (response) => {
          const purchaseResponse = await response.json();

          deepStrictEqual(response.status, 400);
          deepStrictEqual(purchaseResponse, {
            statusCode: 400,
            message: "Esse(s) produto(s) não faz(em) parte dessa venda",
            error: "Bad request",
          });
        });
    });

    it("should not be able create purchase with sale inexistent", async () => {
      await new MakePurchaseFactory().toHttp({}).then(async (response) => {
        const purchaseResponse = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(purchaseResponse, {
          statusCode: 400,
          message: "Venda não encontrada",
          error: "Bad request",
        });
      });
    });

    it("should not be able to create new purchase without properties of request body", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/create-purchase/${saleId[0]}`,
        method: "POST",
        headers,
        data: {},
      }).then(async (response) => {
        const responseBody = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(responseBody, {
          statusCode: 400,
          message:
            "The property: saleProductId, should be provided in the request body",
          error: "Bad request",
        });
      });
    });

    it("should not be able to create new purchase if property of request body not same saleProductId", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/create-purchase/${saleId[0]}`,
        method: "POST",
        headers,
        data: {
          fakeSaleProductId: "552f99f0-8717-4171-9d35-3a9398a9819a",
        },
      }).then(async (response) => {
        const responseBody = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(responseBody, {
          statusCode: 400,
          message:
            "The property: saleProductId, should be provided in the request body",
          error: "Bad request",
        });
      });
    });

    it("should not be able to create new purchase with field saleProductId empty", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/create-purchase/${saleId[0]}`,
        method: "POST",
        headers,
        data: {
          saleProductId: "",
        },
      }).then(async (response) => {
        const purchaseResponse = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(purchaseResponse, {
          statusCode: 400,
          message: "Esse(s) produto(s) não faz(em) parte dessa venda",
          error: "Bad request",
        });
      });
    });
  });
}
