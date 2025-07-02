import { cache } from "react";

export interface GetSaleProductByIdRouteParams {
  saleId: string;
}

export interface GetSaleProductByIdQueryParams {
  page: number;
}

export interface GetSaleProductByIdResponse {
  page: number;
  data: {
    saleProductId: string;
    productName: string;
  }[];
}

export const getSaleProductById = cache(
  async (
    { saleId }: GetSaleProductByIdRouteParams,
    { page = 1 }: GetSaleProductByIdQueryParams,
  ): Promise<GetSaleProductByIdResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get-sale-product-by-id/${saleId}?page=${page}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    return data;
  },
);
