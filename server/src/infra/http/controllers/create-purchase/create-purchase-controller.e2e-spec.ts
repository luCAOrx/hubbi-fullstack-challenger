import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import { GetSalesToHttpResponse } from "@infra/http/view-models/get-sales-view-model";
import { CreatePurchaseToHttpResponse } from "@infra/http/view-models/purchase-view-model";
import { MakePurchaseFactory } from "@test-helpers/factories/make-purchase-factory";
import { MakeRequestFactory } from "@test-helpers/factories/make-request-factory";
import { MakeSaleFactory } from "@test-helpers/factories/make-sale-factory";
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
            products:
              "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
            created_at: purchase.created_at,
          });
        });
    });

    it("should not be able create purchase with sale inexistent", async () => {
      await new MakePurchaseFactory()
        .toHttp({
          saleId: "f823hf",
        })
        .then(async (response) => {
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
      const saleId = await new MakeSaleFactory()
        .toHttp({
          override: {
            name: "Create Purchase Without Properties",
          },
        })
        .then(async (response) => {
          const data: any = await response.json();

          return data.sale.id;
        });

      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/create-purchase/${saleId}`,
        method: "POST",
        headers,
        data: {},
      }).then(async (response) => {
        const responseBody = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(responseBody, {
          statusCode: 400,
          message:
            "The property products should be provided in the request body",
          error: "Bad request",
        });
      });
    });

    it("should not be able to create new purchase if property of request body not same products", async () => {
      const saleId = await new MakeSaleFactory()
        .toHttp({
          override: {
            name: "Get sale product by id test C",
          },
        })
        .then(async (response) => {
          const {
            sale: { id },
          }: any = await response.json();

          return id;
        });

      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/create-purchase/${saleId}`,
        method: "POST",
        headers,
        data: {
          fakeProducts: "lllllll",
        },
      }).then(async (response) => {
        const responseBody = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(responseBody, {
          statusCode: 400,
          message:
            "The property products should be provided in the request body",
          error: "Bad request",
        });
      });
    });

    it("should not be able to create new purchase with field products empty", async () => {
      const saleId = await new MakeSaleFactory()
        .toHttp({
          override: {
            name: "Get sale product by id test D",
          },
        })
        .then(async (response) => {
          const data: any = await response.json();

          return data.sale.id;
        });

      await new MakePurchaseFactory()
        .toHttp({ saleId, override: { products: "" } })
        .then(async (response) => {
          const purchaseResponse = await response.json();

          deepStrictEqual(response.status, 400);
          deepStrictEqual(purchaseResponse, {
            statusCode: 400,
            message: "The field products should not be empty",
            error: "Bad request",
          });
        });
    });
  });
}
