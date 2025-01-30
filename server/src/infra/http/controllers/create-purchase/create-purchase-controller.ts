import { type Request, type Response } from "express";

import { ValidationErrors } from "@core/logic/domain/validations/errors/validation-errors";
import { CreatePurchaseUseCase } from "@domain/use-cases/create-purchase/create-purchase-use-case";
import { CreatePurchaseUseCaseErrors } from "@domain/use-cases/create-purchase/errors/sale-not-found-error";
import { PrismaPurchaseRepository } from "@infra/http/repositories/prisma-purchase-repository";
import { PrismaSaleRepository } from "@infra/http/repositories/prisma-sale-repository";
import { PurchaseViewModel } from "@infra/http/view-models/purchase-view-model";

import { BaseController } from "../base-controller";

interface CreatePurchaseRouteParamsProps {
  saleId: string;
}

interface CreatePurchaseRequestBodyProps {
  products: string;
}

export class CreatePurchaseController extends BaseController {
  protected async executeImplementation(
    request: Request,
    response: Response,
  ): Promise<any> {
    const { saleId } =
      request.params as unknown as CreatePurchaseRouteParamsProps;
    const { products } = request.body as CreatePurchaseRequestBodyProps;

    const prismaPurchaseRepository = new PrismaPurchaseRepository();
    const prismaSaleRepository = new PrismaSaleRepository();

    const createPurchaseUseCase = new CreatePurchaseUseCase(
      prismaPurchaseRepository,
      prismaSaleRepository,
    );

    await createPurchaseUseCase
      .execute({
        saleId,
        products,
      })
      .then(({ purchase }) => {
        const purchaseResponse = PurchaseViewModel.toHttp(purchase);

        return this.created({
          response,
          message: {
            purchase: purchaseResponse,
          },
        });
      })
      .catch((error: Error) => {
        if (
          error instanceof CreatePurchaseUseCaseErrors.SaleNotFoundError ||
          error instanceof ValidationErrors.ValidationShouldNotBeEmptyError ||
          error instanceof ValidationErrors.ValidationShouldBeLessThanError ||
          error instanceof
            ValidationErrors.ValidationShouldBeGreaterThanError ||
          error instanceof
            ValidationErrors.ValidationShouldOnlyAcceptLettersError
        ) {
          return this.clientError({
            response,
            message: error.message,
          });
        }

        if (
          Object.keys(request.body).length === 0 ||
          !Object.hasOwn(request.body, "products")
        ) {
          return this.clientError({
            response,
            message:
              "The property products should be provided in the request body",
          });
        }
      });
  }
}
