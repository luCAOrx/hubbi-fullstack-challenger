import { GetProductsResponse } from "@domain/use-cases/get-products/get-products-use-case";

export interface GetProductsToHttpResponse {
  page: number;
  perPage: number;
  pages: number;
  totalProducts: number;
  data: {
    id: string;
    name: string;
  }[];
}

export class GetProductsViewModel {
  static toHttp({
    page,
    perPage,
    pages,
    totalProducts,
    data,
  }: GetProductsResponse): GetProductsToHttpResponse {
    const products = data.map(({ id, props: { name } }) => {
      return {
        id,
        name,
      };
    });

    return {
      page,
      perPage,
      pages,
      totalProducts,
      data: products,
    };
  }
}
