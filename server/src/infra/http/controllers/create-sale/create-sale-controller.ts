import { type Request, type Response } from "express";

import { ValidationErrors } from "@core/logic/domain/validations/errors/validation-errors";
import { CreateSaleUseCase } from "@domain/use-cases/create-sale/create-sale-use-case";
import { CreateSaleUseCaseErrors } from "@domain/use-cases/create-sale/errors/sale-already-exists-error";
import { PrismaSaleRepository } from "@infra/http/repositories/prisma-sale-repository";
import { CreateSaleViewModel } from "@infra/http/view-models/create-sale-view-model";

import { BaseController } from "../base-controller";

interface CreateSaleRequestBodyProps {
  name: string;
  products: string;
}

export class CreateSaleController extends BaseController {
  protected async executeImplementation(
    request: Request,
    response: Response,
  ): Promise<any> {
    const { name, products } = request.body as CreateSaleRequestBodyProps;

    const prismaSaleRepository = new PrismaSaleRepository();

    const createSaleUseCase = new CreateSaleUseCase(prismaSaleRepository);

    await createSaleUseCase
      .execute({
        name,
        products,
      })
      .then(({ sale }) => {
        const saleResponse = CreateSaleViewModel.toHttp(sale);

        return this.created({
          response,
          message: saleResponse,
        });
      })
      .catch((error: Error) => {
        if (
          error instanceof CreateSaleUseCaseErrors.SaleAlreadyExistsError ||
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
          Object.hasOwn(request.body, "name") ||
          Object.hasOwn(request.body, "products") ||
          !Object.hasOwn(request.body, "name") ||
          !Object.hasOwn(request.body, "products")
        ) {
          return this.clientError({
            response,
            message:
              "The properties: name and products, should be provided in the request body",
          });
        }
      });
  }
}
