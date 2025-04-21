import { type Request, type Response } from "express";

import { ValidationErrors } from "@core/logic/domain/validations/errors/validation-errors";
import { CreatePurchaseUseCase } from "@domain/use-cases/create-purchase/create-purchase-use-case";
import { CreatePurchaseUseCaseErrors } from "@domain/use-cases/create-purchase/errors/these-products-are-not-part-of-this-sale-error";
import { GlobalUseCaseErrors } from "@domain/use-cases/global-errors/global-use-case-errors";
import { PrismaPurchaseRepository } from "@infra/http/repositories/prisma-purchase-repository";
import { PrismaSaleRepository } from "@infra/http/repositories/prisma-sale-repository";
import { PurchaseViewModel } from "@infra/http/view-models/purchase-view-model";

import { BaseController } from "../base-controller";

interface CreatePurchaseRouteParamsProps {
  saleId: string;
}

interface CreatePurchaseRequestBodyProps {
  saleProductId: string;
}

export class CreatePurchaseController extends BaseController {
  protected async executeImplementation(
    request: Request,
    response: Response,
  ): Promise<any> {
    const { saleId } =
      request.params as unknown as CreatePurchaseRouteParamsProps;
    const { saleProductId } = request.body as CreatePurchaseRequestBodyProps;

    const prismaPurchaseRepository = new PrismaPurchaseRepository();
    const prismaSaleRepository = new PrismaSaleRepository();

    const createPurchaseUseCase = new CreatePurchaseUseCase(
      prismaPurchaseRepository,
      prismaSaleRepository,
    );

    await createPurchaseUseCase
      .execute({
        saleId,
        saleProductId,
      })
      .then(({ purchase }) => {
        const message = PurchaseViewModel.toHttp(purchase);

        return this.created({
          response,
          message,
        });
      })
      .catch((error: Error) => {
        if (
          error instanceof GlobalUseCaseErrors.SaleNotFoundError ||
          error instanceof
            CreatePurchaseUseCaseErrors.TheseProductsAreNotPartOfThisSaleError ||
          error instanceof ValidationErrors.ValidationShouldNotBeEmptyError
        ) {
          return this.clientError({
            response,
            message: error.message,
          });
        }

        if (
          Object.keys(request.body).length === 0 ||
          Object.hasOwn(request.body, "saleProductId") ||
          !Object.hasOwn(request.body, "saleProductId")
        ) {
          return this.clientError({
            response,
            message:
              "The property: saleProductId, should be provided in the request body",
          });
        }
      });
  }
}
