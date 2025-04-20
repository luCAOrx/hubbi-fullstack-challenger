import { Sale } from "@domain/entities/sale/sale";
import { SaleRepository } from "@domain/repositories/sale-repository";

import { BaseUseCase } from "../base-use-case";
import { GlobalUseCaseErrors } from "../global-errors/global-use-case-errors";

interface GetSaleProductByIdRequest {
  saleId: string;
}

export interface GetSaleProductByIdResponse {
  saleProduct: Sale;
}

export class GetSaleProductByIdUseCase
  implements BaseUseCase<GetSaleProductByIdRequest, GetSaleProductByIdResponse>
{
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute({
    saleId,
  }: GetSaleProductByIdRequest): Promise<GetSaleProductByIdResponse> {
    const saleOrNull = await this.saleRepository.findById(saleId);

    if (saleOrNull === null) {
      throw new GlobalUseCaseErrors.SaleNotFoundError();
    }

    return { saleProduct: saleOrNull };
  }
}
