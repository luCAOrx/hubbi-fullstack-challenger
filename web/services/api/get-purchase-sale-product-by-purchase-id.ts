import { cache } from "react";

export interface GetPurchaseSaleProductByPurchaseIdRouteParams {
  purchaseId: string;
}

export interface GetPurchaseSaleProductByPurchaseIdQueryParams {
  page: number;
}

export interface GetPurchaseSaleProductByPurchaseIdResponse {
  data: {
    purchaseSaleProductId: string;
    productName: string;
    saleName: string;
  }[];
}

export const getPurchaseSaleProductByPurchaseId = cache(
  async (
    { purchaseId }: GetPurchaseSaleProductByPurchaseIdRouteParams,
    { page = 1 }: GetPurchaseSaleProductByPurchaseIdQueryParams,
  ): Promise<GetPurchaseSaleProductByPurchaseIdResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-purchase-sale-product-by-purchase-id/${purchaseId}?page=${page}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    return data;
  },
);
