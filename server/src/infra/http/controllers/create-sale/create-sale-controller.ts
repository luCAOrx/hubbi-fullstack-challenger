import { type Request, type Response } from "express";

import { ValidationErrors } from "@core/logic/domain/validations/errors/validation-errors";
import { Status } from "@domain/entities/sale/sale";
import { CreateSaleUseCase } from "@domain/use-cases/create-sale/create-sale-use-case";
import { GlobalUseCaseErrors } from "@domain/use-cases/global-errors/global-use-case-errors";
import { PrismaSaleRepository } from "@infra/http/repositories/prisma-sale-repository";
import { SaleViewModel } from "@infra/http/view-models/sale-view-model";

import { BaseController } from "../base-controller";

interface CreateSaleRequestBodyProps {
  name: string;
  status: Status;
  products: string;
}

export class CreateSaleController extends BaseController {
  protected async executeImplementation(
    request: Request,
    response: Response,
  ): Promise<any> {
    const { name, status, products } =
      request.body as CreateSaleRequestBodyProps;

    const prismaSaleRepository = new PrismaSaleRepository();

    const createSaleUseCase = new CreateSaleUseCase(prismaSaleRepository);

    await createSaleUseCase
      .execute({
        name,
        status,
        products,
      })
      .then(({ sale }) => {
        const saleResponse = SaleViewModel.toHttp(sale);

        return this.created({
          response,
          message: {
            sale: saleResponse,
          },
        });
      })
      .catch((error: Error) => {
        if (
          error instanceof GlobalUseCaseErrors.SaleAlreadyExistsError ||
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
          Object.hasOwn(request.body, "status") ||
          Object.hasOwn(request.body, "products") ||
          !Object.hasOwn(request.body, "name") ||
          !Object.hasOwn(request.body, "status") ||
          !Object.hasOwn(request.body, "products")
        ) {
          return this.clientError({
            response,
            message:
              "The properties: name, status and products, should be provided in the request body",
          });
        }
      });
  }
}
