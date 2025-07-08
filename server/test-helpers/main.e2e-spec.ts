import { before, after } from "node:test";
import { PrismaTestEnvironment } from "prisma/prismaTestEnvironment";

import { app } from "@infra/http/app";
import { createPurchaseControllerEndToEndTests } from "@infra/http/controllers/create-purchase/create-purchase-controller.e2e-spec";
import { createSaleControllerEndToEndTests } from "@infra/http/controllers/create-sale/create-sale-controller.e2e-spec";
import { getProductsControllerEndToEndTests } from "@infra/http/controllers/get-products/get-products-controller-e2e-spec";
import { getPurchaseSaleProductByPurchaseId } from "@infra/http/controllers/get-purchase-sale-product-by-purchase-id/get-purchase-sale-product-by-purchase-id-controller.e2e-spec";
import { getPurchasesControllerEndToEndTests } from "@infra/http/controllers/get-purchases/get-purchases-controller-e2e-spec";
import { getSaleProductByIdControllerEndToEndTests } from "@infra/http/controllers/get-sale-product-by-id/get-sale-product-by-id-controller.e2e-spec";
import { getSalesControllerEndToEndTests } from "@infra/http/controllers/get-sales/get-sales-controller-e2e-spec";
import { pageNotFoundErrorEndToEndTests } from "@infra/http/errors/page-not-found/page-not-found-error.e2e-spec";
import { CreatePurchaseToHttpResponse } from "@infra/http/view-models/create-purchase-view-model";
import { CreateSaleToHttpResponse } from "@infra/http/view-models/create-sale-view-model";

import { MakePurchaseFactory } from "./factories/make-purchase-factory";
import { MakeSaleFactory } from "./factories/make-sale-factory";

const prismaTestEnvironment = new PrismaTestEnvironment();
const server = app.listen(process.env.TEST_SERVER_PORT);

export const saleId: string[] = [];
export const purchaseId: string[] = [];

before(async () => {
  process.stdout.write(
    `Uploading the database, running migrations, seeds and up the server, wait...\n`,
  );

  await prismaTestEnvironment.setup();
  await new Promise((resolve) => server.once("listening", resolve));

  process.stdout.write(`Registering 20 sales and purchases, wait...\n`);

  for (let i = 0; i < 20; i++) {
    const letter = String.fromCharCode(65 + i);

    await new MakeSaleFactory()
      .toHttp({
        override: {
          name: `Doces ${letter}`,
          products:
            "036de3a9-4b89-4578-b72a-6a99efb8c634,2632524b-72ee-4650-8741-a93d97f325b8,584d84c6-673a-4e09-9513-9e47adcbd30a,25255125-a94f-47cf-85d9-e7717badb661,0c81db75-3c03-4220-8fdc-76d532e4b1b2,cc5a9e1b-c5ab-450d-b9bd-1be0899f36a5,ddf9a0e3-e839-43b3-ac29-4ac212615097,fb4db0ae-08e9-44c1-a809-9ad54d1930dc,da45c44b-69f8-4314-be15-43a1bc3d8aab,8e3a1846-c413-4371-9697-65e1dd5a83b6,8d9c2baf-c762-4654-b28a-19cb9ebb3ed8,1468a93e-a786-4417-9d1f-4c33ecec2c9b,4cf9673c-eb2d-4f24-98b7-f5e7f1c0efd0,d6a74dab-828e-424c-a582-4ddc14a74406,76739c72-5956-4fb0-b8b5-42c4f6882a71,5895b86e-e54d-4326-aba6-4ead8873428a,48419db1-d749-43ea-801a-944478272612,f93ccd61-3395-436b-9862-426b5cd242d9,b4a1df0d-c0d7-4d5e-b07e-f28bcafc4ba1,9f285452-c3a3-478c-a0b6-675731c1f412",
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
getProductsControllerEndToEndTests();
pageNotFoundErrorEndToEndTests();

after(async () => {
  server.close();
  await prismaTestEnvironment.teardown();
});
