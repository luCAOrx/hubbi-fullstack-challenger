import { cache } from "react";

interface Purchase {
  purchaseId: string;
  saleName: string;
  purchase_created_at: Date;
}

export interface GetPurchasesResponse {
  page: number;
  perPage: number;
  pages: number;
  totalPurchases: number;
  data: Purchase[];
}

interface GetPurchasesQuery {
  page: number;
}

export const getPurchases = cache(
  async ({ page = 1 }: GetPurchasesQuery): Promise<GetPurchasesResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-purchases?page=${page}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    return data;
  },
);
