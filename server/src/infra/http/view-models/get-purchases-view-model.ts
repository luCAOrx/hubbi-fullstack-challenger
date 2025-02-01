import { Purchase } from "@domain/entities/purchase/purchase";
import { GetPurchasesResponse } from "@domain/use-cases/get-purchases/get-purchases-use-case";

export interface ToHttpResponse {
  page: number;
  perPage: number;
  pages: number;
  totalPurchases: number;
  data: Purchase[];
}

export class GetPurchasesViewModel {
  static toHttp({
    page,
    perPage,
    pages,
    totalPurchases,
    data,
  }: GetPurchasesResponse): ToHttpResponse {
    return {
      page,
      perPage,
      pages,
      totalPurchases,
      data,
    };
  }
}
