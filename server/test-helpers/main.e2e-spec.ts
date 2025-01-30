import { describe, before, after } from "node:test";
import { PrismaTestEnvironment } from "prisma/prismaTestEnvironment";

import { app } from "@infra/http/app";
import { createPurchaseControllerEndToEndTests } from "@infra/http/controllers/create-purchase/create-purchase-controller.e2e-spec";
import { createSaleControllerEndToEndTests } from "@infra/http/controllers/create-sale/create-sale-controller.e2e-spec";
import { getPurchasesControllerEndToEndTests } from "@infra/http/controllers/get-purchases/get-purchases-controller-e2e-spec";
import { getSalesControllerEndToEndTests } from "@infra/http/controllers/get-sales/get-sales-controller-e2e-spec";
import { pageNotFoundErrorEndToEndTests } from "@infra/http/errors/page-not-found/page-not-found-error.e2e-spec";

import { MakeSaleFactory } from "./factories/make-sale-factory";

const prismaTestEnvironment = new PrismaTestEnvironment();
const server = app.listen(process.env.TEST_SERVER_PORT);

export let makeSaleFactoryToHttp: Response;

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

      makeSaleFactoryToHttp = await new MakeSaleFactory().toHttp({
        override: {
          name: `Doces ${letter}`,
        },
      });
    }
  });

  createSaleControllerEndToEndTests();
  getSalesControllerEndToEndTests();
  createPurchaseControllerEndToEndTests();
  getPurchasesControllerEndToEndTests();
  pageNotFoundErrorEndToEndTests();

  after(async () => {
    server.close();
    await prismaTestEnvironment.teardown();
  });
});
