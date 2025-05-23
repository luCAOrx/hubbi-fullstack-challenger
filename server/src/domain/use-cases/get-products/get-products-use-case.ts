import { Product } from "@domain/entities/product/product";
import { ProductRepository } from "@domain/repositories/product-repository";

import { BaseUseCase } from "../base-use-case";

interface GetProductsRequest {
  page?: number;
}

export interface GetProductsResponse {
  page: number;
  perPage: number;
  pages: number;
  totalProducts: number;
  data: Product[];
}

export class GetProductsUseCase
  implements BaseUseCase<GetProductsRequest, GetProductsResponse>
{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    page = 1,
  }: GetProductsRequest): Promise<GetProductsResponse> {
    const perPage = 10;

    const productOrProducts = await this.productRepository.findMany(
      page,
      perPage,
    );

    const totalProducts = await this.productRepository.getTotalProductsCount();

    const pages = Math.ceil(totalProducts / perPage);

    return {
      page,
      perPage,
      pages,
      totalProducts,
      data: productOrProducts,
    };
  }
}
