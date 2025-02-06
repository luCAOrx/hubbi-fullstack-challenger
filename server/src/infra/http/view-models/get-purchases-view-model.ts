import { GetPurchasesResponse } from "@domain/use-cases/get-purchases/get-purchases-use-case";

export interface GetPurchasesToHttpResponse {
  page: number;
  perPage: number;
  pages: number;
  totalPurchases: number;
  data: {
    purchaseId: string;
    saleName: string;
    purchase_created_at: Date;
  }[];
}

export class GetPurchasesViewModel {
  static toHttp({
    page,
    perPage,
    pages,
    totalPurchases,
    data,
  }: GetPurchasesResponse): GetPurchasesToHttpResponse {
    const purchases = data.map((purchase) => {
      return {
        purchaseId: purchase.id,
        saleName: purchase.sales.props.name,
        purchase_created_at: purchase.created_at,
      };
    });

    return {
      page,
      perPage,
      pages,
      totalPurchases,
      data: purchases,
    };
  }
}
