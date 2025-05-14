import { PurchaseSaleProduct } from "@domain/entities/purchase-sale-product/purchase-sale-product";
import { PurchaseRepository } from "@domain/repositories/purchase-repository";

import { BaseUseCase } from "../base-use-case";
import { GlobalUseCaseErrors } from "../global-errors/global-use-case-errors";

interface GetPurchaseSaleProductByPurchaseIdRequest {
  page?: number;
  purchaseId: string;
}

export interface GetPurchaseSaleProductByPurchaseIdResponse {
  data: PurchaseSaleProduct[];
}

export class GetPurchaseSaleProductByPurchaseIdUseCase
  implements
    BaseUseCase<
      GetPurchaseSaleProductByPurchaseIdRequest,
      GetPurchaseSaleProductByPurchaseIdResponse
    >
{
  constructor(private readonly purchaseRepository: PurchaseRepository) {}

  async execute({
    page = 1,
    purchaseId,
  }: GetPurchaseSaleProductByPurchaseIdRequest): Promise<GetPurchaseSaleProductByPurchaseIdResponse> {
    const perPage = 10;

    const purchaseSaleProductOrNull =
      await this.purchaseRepository.findPurchaseSaleProductByPurchaseId(
        purchaseId,
        page,
        perPage,
      );

    if (purchaseSaleProductOrNull === null) {
      throw new GlobalUseCaseErrors.PurchaseNotFoundError();
    }

    return { data: purchaseSaleProductOrNull };
  }
}
