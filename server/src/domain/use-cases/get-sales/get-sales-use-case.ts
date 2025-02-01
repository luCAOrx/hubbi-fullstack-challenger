import { Sale } from "@domain/entities/sale/sale";
import { SaleRepository } from "@domain/repositories/sale-repository";

import { BaseUseCase } from "../base-use-case";

interface GetSalesRequest {
  page?: number;
}

export interface GetSalesResponse {
  page: number;
  perPage: number;
  pages: number;
  totalSales: number;
  data: Sale[];
}

export class GetSalesUseCase
  implements BaseUseCase<GetSalesRequest, GetSalesResponse>
{
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute({ page = 1 }: GetSalesRequest): Promise<GetSalesResponse> {
    const perPage = 10;
    const saleOrSales = await this.saleRepository.findMany(page, perPage);

    const totalSales = await this.saleRepository.getTotalSalesCount();

    const pages = Math.ceil(totalSales / perPage);

    return {
      page,
      perPage,
      pages,
      totalSales,
      data: saleOrSales,
    };
  }
}
