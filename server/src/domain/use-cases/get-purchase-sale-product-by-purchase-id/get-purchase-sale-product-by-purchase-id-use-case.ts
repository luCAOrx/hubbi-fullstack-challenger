import { Purchase } from "@domain/entities/purchase/purchase";
import { PurchaseRepository } from "@domain/repositories/purchase-repository";

import { BaseUseCase } from "../base-use-case";
import { GlobalUseCaseErrors } from "../global-errors/global-use-case-errors";

interface GetPurchaseSaleProductByPurchaseIdRequest {
  purchaseId: string;
}

export interface GetPurchaseSaleProductByPurchaseIdResponse {
  purchaseSaleProduct: Purchase;
}

export class GetPurchaseSaleProductByPurchaseIdUseCase
  implements
    BaseUseCase<
      GetPurchaseSaleProductByPurchaseIdRequest,
      GetPurchaseSaleProductByPurchaseIdResponse
    >
{
  constructor(
    private readonly purchaseSaleProductRepository: PurchaseRepository,
  ) {}

  async execute({
    purchaseId,
  }: GetPurchaseSaleProductByPurchaseIdRequest): Promise<GetPurchaseSaleProductByPurchaseIdResponse> {
    const purchaseOrNull =
      await this.purchaseSaleProductRepository.findPurchaseSaleProductByPurchaseId(
        purchaseId,
      );

    if (purchaseOrNull === null) {
      throw new GlobalUseCaseErrors.PurchaseNotFoundError();
    }

    return { purchaseSaleProduct: purchaseOrNull };
  }
}
