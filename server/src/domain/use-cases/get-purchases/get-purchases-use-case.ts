import { Purchase } from "@domain/entities/purchase/purchase";
import { PurchaseRepository } from "@domain/repositories/purchase-repository";

import { BaseUseCase } from "../base-use-case";

interface GetPurchasesRequest {
  page?: number;
}

export interface GetPurchasesResponse {
  page: number;
  perPage: number;
  pages: number;
  totalPurchases: number;
  data: Purchase[];
}

export class GetPurchasesUseCase
  implements BaseUseCase<GetPurchasesRequest, GetPurchasesResponse>
{
  constructor(private readonly purchaseRepository: PurchaseRepository) {}

  async execute({
    page = 1,
  }: GetPurchasesRequest): Promise<GetPurchasesResponse> {
    const perPage = 10;

    const purchaseOrPurchases = await this.purchaseRepository.findMany(
      page,
      perPage,
    );

    const totalPurchases =
      await this.purchaseRepository.getTotalPurchasesCount();

    const pages = Math.ceil(totalPurchases / perPage);

    return {
      page,
      perPage,
      pages,
      totalPurchases,
      data: purchaseOrPurchases,
    };
  }
}
