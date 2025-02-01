import { Sale } from "@domain/entities/sale/sale";
import { GeSalesResponse } from "@domain/use-cases/get-sales/get-sales-use-case";

export interface ToHttpResponse {
  page: number;
  perPage: number;
  pages: number;
  totalSales: number;
  data: Sale[];
}

export class GetSalesViewModel {
  static toHttp({
    page,
    perPage,
    pages,
    totalSales,
    data,
  }: GeSalesResponse): ToHttpResponse {
    return {
      page,
      perPage,
      pages,
      totalSales,
      data,
    };
  }
}
