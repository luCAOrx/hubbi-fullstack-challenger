import { Status } from "@domain/entities/sale/sale";
import { GetSalesResponse } from "@domain/use-cases/get-sales/get-sales-use-case";

export interface GetSalesToHttpResponse {
  page: number;
  perPage: number;
  pages: number;
  totalSales: number;
  data: {
    id: string;
    name: string;
    status?: Status;
    created_at: Date;
  }[];
}

export class GetSalesViewModel {
  static toHttp({
    page,
    perPage,
    pages,
    totalSales,
    data,
  }: GetSalesResponse): GetSalesToHttpResponse {
    const sales = data.map((sale) => {
      return {
        id: sale.id,
        name: sale.props.name,
        status: sale.props.status,
        created_at: sale.created_at,
      };
    });

    return {
      page,
      perPage,
      pages,
      totalSales,
      data: sales,
    };
  }
}
