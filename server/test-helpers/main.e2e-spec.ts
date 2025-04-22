import { describe, before, after } from "node:test";
import { PrismaTestEnvironment } from "prisma/prismaTestEnvironment";

import { app } from "@infra/http/app";
import { createPurchaseControllerEndToEndTests } from "@infra/http/controllers/create-purchase/create-purchase-controller.e2e-spec";
import { createSaleControllerEndToEndTests } from "@infra/http/controllers/create-sale/create-sale-controller.e2e-spec";
import { getPurchaseSaleProductByPurchaseId } from "@infra/http/controllers/get-purchase-sale-product-by-purchase-id/get-purchase-sale-product-by-purchase-id-controller.e2e-spec";
import { getPurchasesControllerEndToEndTests } from "@infra/http/controllers/get-purchases/get-purchases-controller-e2e-spec";
import { getSaleProductByIdControllerEndToEndTests } from "@infra/http/controllers/get-sale-product-by-id/get-sale-product-by-id-controller.e2e-spec";
import { getSalesControllerEndToEndTests } from "@infra/http/controllers/get-sales/get-sales-controller-e2e-spec";
import { pageNotFoundErrorEndToEndTests } from "@infra/http/errors/page-not-found/page-not-found-error.e2e-spec";
import { CreatePurchaseToHttpResponse } from "@infra/http/view-models/purchase-view-model";
import { CreateSaleToHttpResponse } from "@infra/http/view-models/sale-view-model";

import { MakePurchaseFactory } from "./factories/make-purchase-factory";
import { MakeSaleFactory } from "./factories/make-sale-factory";

const prismaTestEnvironment = new PrismaTestEnvironment();
const server = app.listen(process.env.TEST_SERVER_PORT);

export const saleId: string[] = [];
export const purchaseId: string[] = [];

describe("End to end (E2E) tests", () => {
  before(async () => {
    process.stdout.write(
      `Uploading the database, running migrations, seeds and up the server, wait...\n`,
    );

    await prismaTestEnvironment.setup();
    await new Promise((resolve) => server.once("listening", resolve));

    process.stdout.write(`Registering 20 sales, wait...\n`);

    for (let i = 0; i < 20; i++) {
      const letter = String.fromCharCode(65 + i);

      await new MakeSaleFactory()
        .toHttp({
          override: {
            name: `Doces ${letter}`,
            products:
              "25255125-a94f-47cf-85d9-e7717badb661,0c81db75-3c03-4220-8fdc-76d532e4b1b2,cc5a9e1b-c5ab-450d-b9bd-1be0899f36a5",
          },
        })
        .then(async (response) => {
          const sale: CreateSaleToHttpResponse =
            (await response.json()) as CreateSaleToHttpResponse;

          saleId.push(sale.id);

          return sale.id;
        });

      await new MakePurchaseFactory()
        .toHttp({
          saleId: saleId[0],
        })
        .then(async (response) => {
          const purchase: CreatePurchaseToHttpResponse =
            (await response.json()) as CreatePurchaseToHttpResponse;

          purchaseId.push(purchase.id);

          return purchase;
        });
    }
  });

  createSaleControllerEndToEndTests();
  getSalesControllerEndToEndTests();
  createPurchaseControllerEndToEndTests();
  getSaleProductByIdControllerEndToEndTests();
  getPurchasesControllerEndToEndTests();
  getPurchaseSaleProductByPurchaseId();
  pageNotFoundErrorEndToEndTests();

  after(async () => {
    server.close();
    await prismaTestEnvironment.teardown();
  });
});
