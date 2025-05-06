import { SaleProduct } from "@domain/entities/sale-product/sale-product";
import { SaleRepository } from "@domain/repositories/sale-repository";

import { BaseUseCase } from "../base-use-case";
import { GlobalUseCaseErrors } from "../global-errors/global-use-case-errors";

interface GetSaleProductByIdRequest {
  page?: number;
  saleId: string;
}

export interface GetSaleProductByIdResponse {
  page: number;
  data: SaleProduct[];
}

export class GetSaleProductByIdUseCase
  implements BaseUseCase<GetSaleProductByIdRequest, GetSaleProductByIdResponse>
{
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute({
    page = 1,
    saleId,
  }: GetSaleProductByIdRequest): Promise<GetSaleProductByIdResponse> {
    const perPage = 10;

    const saleOrNull = await this.saleRepository.findById(saleId);

    if (saleOrNull === null) {
      throw new GlobalUseCaseErrors.SaleNotFoundError();
    }

    const saleProductOrSaleProducts =
      await this.saleRepository.findSaleProductById(
        saleOrNull.id,
        page,
        perPage,
      );

    return {
      page,
      data: saleProductOrSaleProducts,
    };
  }
}
