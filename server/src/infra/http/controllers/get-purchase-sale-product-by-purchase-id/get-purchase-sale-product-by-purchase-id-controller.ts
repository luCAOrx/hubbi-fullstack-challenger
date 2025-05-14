import { Request, Response } from "express";

import { GetPurchaseSaleProductByPurchaseIdUseCase } from "@domain/use-cases/get-purchase-sale-product-by-purchase-id/get-purchase-sale-product-by-purchase-id-use-case";
import { GlobalUseCaseErrors } from "@domain/use-cases/global-errors/global-use-case-errors";
import { PrismaPurchaseRepository } from "@infra/http/repositories/prisma-purchase-repository";
import { GetPurchaseSaleProductByPurchaseIdViewModel } from "@infra/http/view-models/get-purchase-sale-product-by-purchase-id-view-model";

import { BaseController } from "../base-controller";

interface GetPurchaseSaleProductByPurchaseIdRouteParamsProps {
  purchaseId: string;
}

interface GetPurchaseSaleProductByPurchaseIdQueryParamsProps {
  page: string;
}

export class GetPurchaseSaleProductByPurchaseIdController extends BaseController {
  protected async executeImplementation(
    request: Request,
    response: Response,
  ): Promise<any> {
    const { purchaseId } =
      request.params as unknown as GetPurchaseSaleProductByPurchaseIdRouteParamsProps;

    const { page } =
      request.query as unknown as GetPurchaseSaleProductByPurchaseIdQueryParamsProps;

    const prismaPurchaseRepository = new PrismaPurchaseRepository();

    const getPurchaseSaleProductByPurchaseId =
      new GetPurchaseSaleProductByPurchaseIdUseCase(prismaPurchaseRepository);

    await getPurchaseSaleProductByPurchaseId
      .execute({ purchaseId, page: Number(page) })
      .then(({ data }) => {
        const message = GetPurchaseSaleProductByPurchaseIdViewModel.toHttp({
          data,
        });

        return this.ok({
          response,
          message,
        });
      })
      .catch((error: Error) => {
        if (error instanceof GlobalUseCaseErrors.PurchaseNotFoundError) {
          return this.clientError({
            response,
            message: error.message,
          });
        }
      });
  }
}
