import { Request, Response } from "express";

import { prisma } from "@infra/http/libs/prisma-client";

import { BaseController } from "../base-controller";

export class GetProductsController extends BaseController {
  protected async executeImplementation(
    request: Request,
    response: Response,
  ): Promise<any> {
    await prisma.product
      .findMany({})
      .then((productOrProducts) => {
        return this.ok({
          response,
          message: { productOrProducts },
        });
      })
      .catch((error: Error) => {
        return this.clientError({
          response,
          message: "Erro ao listar produtos",
        });
      });
  }
}
