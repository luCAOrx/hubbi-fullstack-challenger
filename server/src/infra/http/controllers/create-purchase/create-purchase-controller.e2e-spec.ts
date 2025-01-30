import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import { prisma } from "@infra/http/libs/prisma-client";
import { MakePurchaseFactory } from "@test-helpers/factories/make-purchase-factory";
import { MakeRequestFactory } from "@test-helpers/factories/make-request-factory";
import { MakeSaleFactory } from "@test-helpers/factories/make-sale-factory";

export function createPurchaseControllerEndToEndTests(): void {
  describe("Create purchase controller", async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const saleId = await new MakeSaleFactory()
      .toHttp({
        override: {
          name: "Doces de festa",
        },
      })
      .then(async (response) => {
        const {
          sale: { id },
        }: any = await response.json();

        return id;
      });

    it("should be able create new purchase", async () => {
      await new MakePurchaseFactory()
        .toHttp({ saleId })
        .then(async (response) => {
          const purchaseResponse: any = await response
            .json()
            .then((response) => response);

          const saleOrNull = await prisma.sale.findUnique({
            where: {
              id: purchaseResponse.purchase.id,
            },
            select: { status: true },
          });

          if (saleOrNull === null) return null;

          deepStrictEqual(response.status, 201);
          deepStrictEqual(saleOrNull.status, "Finalizada");
          deepStrictEqual(purchaseResponse, {
            purchase: {
              id: purchaseResponse.purchase.id,
              saleId: purchaseResponse.purchase.saleId,
              products:
                "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
              created_at: purchaseResponse.purchase.created_at,
            },
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
