import { Sale } from "@domain/entities/sale/sale";
import { SaleRepository } from "@domain/repositories/sale-repository";

import { BaseUseCase } from "../base-use-case";

interface GetSalesRequest {
  page?: number;
}

export class GetSalesUseCase implements BaseUseCase<GetSalesRequest, Sale[]> {
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute({ page = 1 }: GetSalesRequest): Promise<Sale[]> {
    const saleOrSales = await this.saleRepository.findMany(page);

    return saleOrSales;
  }
}
