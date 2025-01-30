import { Request, Response } from "express";

import { GetPurchasesUseCase } from "@domain/use-cases/get-purchases/get-purchases-use-case";
import { PrismaPurchaseRepository } from "@infra/http/repositories/prisma-purchase-repository";
import { GetPurchasesViewModel } from "@infra/http/view-models/get-purchases-view-model";
import { PurchaseViewModel } from "@infra/http/view-models/purchase-view-model";

import { BaseController } from "../base-controller";

interface GetPurchasesQueryParamsProps {
  page: string;
}

export class GetPurchasesController extends BaseController {
  protected async executeImplementation(
    request: Request,
    response: Response,
  ): Promise<any> {
    const { page } = request.query as unknown as GetPurchasesQueryParamsProps;

    const prismaPurchaseRepository = new PrismaPurchaseRepository();

    const getPurchasesUseCase = new GetPurchasesUseCase(
      prismaPurchaseRepository,
    );

    await getPurchasesUseCase
      .execute({ page: Number(page) })
      .then((purchase) => {
        const purchaseOrPurchases = purchase.map((purchaseResponse) => {
          return GetPurchasesViewModel.toHttp(purchaseResponse);
        });

        return this.ok({ response, message: { purchaseOrPurchases } });
      })
      .catch((error: Error) => {
        if (
          Object.keys(request.query).length === 0 ||
          Object.hasOwn(request.query, "page") ||
          !Object.hasOwn(request.query, "page")
        ) {
          return this.clientError({
            response,
            message:
              "The query parameters: page must be provided in the query parameters of the request",
          });
        }
      });
  }
}
