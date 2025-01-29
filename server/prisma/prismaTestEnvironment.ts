import { execSync } from "node:child_process";

import { prisma } from "@infra/http/libs/prisma-client";

export class PrismaTestEnvironment {
  async setup(): Promise<void> {
    execSync("npm run prisma:migrate");
    execSync("npm run prisma:seed:test");
  }

  async teardown(): Promise<void> {
    await prisma.sale.deleteMany();
    await prisma.product.deleteMany();
    await prisma.saleProduct.deleteMany();
  }
}
