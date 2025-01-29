import { describe, before, after } from "node:test";
import { PrismaTestEnvironment } from "prisma/prismaTestEnvironment";

import { app } from "@infra/http/app";
import { createSaleControllerEndToEndTests } from "@infra/http/controllers/create-sale/create-sale-controller.e2e-spec";
import { pageNotFoundErrorEndToEndTests } from "@infra/http/errors/page-not-found/page-not-found-error.e2e-spec";

const prismaTestEnvironment = new PrismaTestEnvironment();
const server = app.listen(process.env.TEST_SERVER_PORT);

describe("End to end (E2E) tests", () => {
  before(async () => {
    process.stdout.write(
      `Uploading the database, running migrations, seeds and up the server, wait...\n`,
    );

    await prismaTestEnvironment.setup();
    await new Promise((resolve) => server.once("listening", resolve));
  });

  createSaleControllerEndToEndTests();
  pageNotFoundErrorEndToEndTests();

  after(async () => {
    server.close();
    await prismaTestEnvironment.teardown();
  });
});
