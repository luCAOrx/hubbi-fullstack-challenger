import { Purchase } from "@domain/entities/purchase/purchase";
import { PurchaseRepository } from "@domain/repositories/purchase-repository";

import { BaseUseCase } from "../base-use-case";

interface GetPurchasesRequest {
  page?: number;
}

export class GetPurchasesUseCase
  implements BaseUseCase<GetPurchasesRequest, Purchase[]>
{
  constructor(private readonly purchaseRepository: PurchaseRepository) {}

  async execute({ page = 1 }: GetPurchasesRequest): Promise<Purchase[]> {
    const purchaseOrPurchases = await this.purchaseRepository.findMany(page);

    return purchaseOrPurchases;
  }
}
