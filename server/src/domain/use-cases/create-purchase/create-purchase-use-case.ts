import { Purchase } from "@domain/entities/purchase/purchase";
import { PurchaseRepository } from "@domain/repositories/purchase-repository";
import { SaleRepository } from "@domain/repositories/sale-repository";

import { BaseUseCase } from "../base-use-case";
import { GlobalUseCaseErrors } from "../global-errors/global-use-case-errors";

interface CreatePurchaseRequest {
  saleId: string;
  products: string;
}

interface CreatePurchaseResponse {
  purchase: Purchase;
}

export class CreatePurchaseUseCase
  implements BaseUseCase<CreatePurchaseRequest, CreatePurchaseResponse>
{
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    private readonly saleRepository: SaleRepository,
  ) {}

  async execute({
    saleId,
    products,
  }: CreatePurchaseRequest): Promise<CreatePurchaseResponse> {
    const saleOrNull = await this.saleRepository.findById(saleId);

    if (saleOrNull === null) {
      throw new GlobalUseCaseErrors.SaleNotFoundError();
    }

    const purchase = Purchase.create({ saleId, products });

    await this.purchaseRepository.createPurchaseWithTotalPurchases(purchase);

    return { purchase };
  }
}
