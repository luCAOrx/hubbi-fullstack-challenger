import { Request, Response } from "express";

import { GetProductsUseCase } from "@domain/use-cases/get-products/get-products-use-case";
import { PrismaProductRepository } from "@infra/http/repositories/prisma-product-repository";
import { GetProductsViewModel } from "@infra/http/view-models/get-products-view-model";

import { BaseController } from "../base-controller";

interface GetProductsQueryParamsProps {
  page: string;
}

export class GetProductsController extends BaseController {
  protected async executeImplementation(
    request: Request,
    response: Response,
  ): Promise<any> {
    const { page } = request.query as unknown as GetProductsQueryParamsProps;

    const prismaProductRepository = new PrismaProductRepository();

    const getProductsUseCase = new GetProductsUseCase(prismaProductRepository);

    await getProductsUseCase
      .execute({ page: Number(page) })
      .then(({ page, perPage, pages, totalProducts, data }) => {
        const message = GetProductsViewModel.toHttp({
          page,
          perPage,
          pages,
          totalProducts,
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
