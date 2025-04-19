import { PurchaseSaleProduct } from "@domain/entities/purchase-sale-product/purchase-sale-product";
import { Purchase } from "@domain/entities/purchase/purchase";
import { PurchaseRepository } from "@domain/repositories/purchase-repository";
import { SaleRepository } from "@domain/repositories/sale-repository";

import { BaseUseCase } from "../base-use-case";
import { GlobalUseCaseErrors } from "../global-errors/global-use-case-errors";
import { CreatePurchaseUseCaseErrors } from "./errors/these-products-are-not-part-of-this-sale-error";

interface CreatePurchaseRequest {
  saleId: string;
  saleProductId: string;
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
    saleProductId,
  }: CreatePurchaseRequest): Promise<CreatePurchaseResponse> {
    const saleOrNull = await this.saleRepository.findById(saleId);

    if (saleOrNull === null) {
      throw new GlobalUseCaseErrors.SaleNotFoundError();
    }

    const saleProductOrSaleProducts =
      await this.saleRepository.findSaleProductById(saleOrNull.id);

    const saleProductIds = saleProductId
      .split(",")
      .map((saleProductId) => saleProductId);

    const isProductArePartFromSaleProduct = saleProductIds.every(
      (saleProductId) =>
        saleProductOrSaleProducts
          .map((saleProduct) => saleProduct.id)
          .includes(saleProductId),
    );

    if (!isProductArePartFromSaleProduct) {
      throw new CreatePurchaseUseCaseErrors.TheseProductsAreNotPartOfThisSaleError();
    }

    let purchase = Purchase.create(
      { saleId },
      {
        _sale: saleOrNull,
      },
    );

    const purchaseSaleProducts = saleProductIds.map((saleProductId) => {
      const purchaseSaleProduct = PurchaseSaleProduct.create(
        {
          saleProductId: saleProductId,
          purchaseId: purchase.id,
        },
        { _purchase: purchase },
      );

      return purchaseSaleProduct;
    });

    purchase = Purchase.create(
      { saleId },
      {
        _sale: saleOrNull,
        _purchaseSaleProducts: purchaseSaleProducts,
        _id: purchase.id,
      },
    );

    await this.purchaseRepository.transactionCreatePurchaseWithPurchaseSaleProductAndPurchaseCounter(
      purchase,
      purchaseSaleProducts,
    );

    return { purchase };
  }
}
