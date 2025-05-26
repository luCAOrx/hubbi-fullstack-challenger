import { cache } from "react";
import { Status } from "./create-sale";

interface Sale {
  id: string;
  name: string;
  status: Status;
  created_at: Date;
}

export interface GetSalesResponse {
  page: number;
  perPage: number;
  pages: number;
  totalSales: number;
  data: Sale[];
}

interface GetSalesQuery {
  page: number;
}

export const getSales = cache(
  async ({ page = 1 }: GetSalesQuery): Promise<GetSalesResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-sales?page=${page}`,
      {
        method: "GET",
        next: {
          tags: ["get-sales"],
        },
      },
    );

    const data = await response.json();

    return data;
  },
);
