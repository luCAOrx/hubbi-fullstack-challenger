import { Request, Response } from "express";

import { GetSalesUseCase } from "@domain/use-cases/get-sales/get-sales-use-case";
import { PrismaSaleRepository } from "@infra/http/repositories/prisma-sale-repository";
import { GetSalesViewModel } from "@infra/http/view-models/get-sales-view-model";

import { BaseController } from "../base-controller";

interface GetSalesQueryParamsProps {
  page: string;
}

export class GetSalesController extends BaseController {
  protected async executeImplementation(
    request: Request,
    response: Response,
  ): Promise<any> {
    const { page } = request.query as unknown as GetSalesQueryParamsProps;

    const prismaSaleRepository = new PrismaSaleRepository();

    const getSalesUseCase = new GetSalesUseCase(prismaSaleRepository);

    await getSalesUseCase
      .execute({ page: Number(page) })
      .then(({ page, perPage, pages, totalSales, data }) => {
        const message = GetSalesViewModel.toHttp({
          page,
          perPage,
          pages,
          totalSales,
          data,
        });

        return this.ok({ response, message });
      })
      .catch(() => {
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
