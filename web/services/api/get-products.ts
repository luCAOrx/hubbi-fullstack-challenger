import { cache } from "react";

export interface GetProductsResponse {
  page: number;
  perPage: number;
  pages: number;
  totalProducts: number;
  data: {
    id: string;
    name: string;
  }[];
}

interface GetProductsQuery {
  page: number;
}

export const getProducts = cache(
  async ({ page = 1 }: GetProductsQuery): Promise<GetProductsResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-products?page=${page}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    return data;
  },
);
