import { Request, Response } from "express";

import { GetSaleProductByIdUseCase } from "@domain/use-cases/get-sale-product-by-id/get-sale-product-by-id-use-case";
import { GlobalUseCaseErrors } from "@domain/use-cases/global-errors/global-use-case-errors";
import { PrismaSaleRepository } from "@infra/http/repositories/prisma-sale-repository";
import { GetSaleProductByIdViewModel } from "@infra/http/view-models/get-sale-product-by-id-view-model";

import { BaseController } from "../base-controller";

interface GetSalesRouteParamsProps {
  saleId: string;
}

export class GetSaleProductByIdController extends BaseController {
  protected async executeImplementation(
    request: Request,
    response: Response,
  ): Promise<any> {
    const { saleId } = request.params as unknown as GetSalesRouteParamsProps;

    const prismaSaleRepository = new PrismaSaleRepository();

    const getSaleProductByIdUseCase = new GetSaleProductByIdUseCase(
      prismaSaleRepository,
    );

    await getSaleProductByIdUseCase
      .execute({ saleId })
      .then(({ saleProduct }) => {
        const message = GetSaleProductByIdViewModel.toHttp({
          saleProduct,
        });

        return this.ok({
          response,
          message,
        });
      })
      .catch((error: Error) => {
        if (error instanceof GlobalUseCaseErrors.SaleNotFoundError) {
          return this.clientError({
            response,
            message: error.message,
          });
        }
      });
  }
}
