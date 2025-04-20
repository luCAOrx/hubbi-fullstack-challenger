import { deepStrictEqual, rejects } from "node:assert";
import { describe, it } from "node:test";

import { MakePurchaseFactory } from "@test-helpers/factories/make-purchase-factory";
import { InMemoryPurchaseDatabase } from "@test-helpers/in-memory-database/in-memory-purchase-database";

import { GlobalUseCaseErrors } from "../global-errors/global-use-case-errors";
import { GetPurchaseSaleProductByPurchaseIdUseCase } from "./get-purchase-sale-product-by-purchase-id-use-case";

describe("Get purchase sale product by purchaseId use case", () => {
  const inMemoryPurchaseDatabase = new InMemoryPurchaseDatabase();
  const getPurchaseSaleProductByPurchaseId =
    new GetPurchaseSaleProductByPurchaseIdUseCase(inMemoryPurchaseDatabase);

  it("should be able get purchase sale product by purchaseId", async () => {
    await new MakePurchaseFactory()
      .toDomain({
        inMemoryDatabase: inMemoryPurchaseDatabase,
        override: {
          saleName: "Get Purchase Sale Product Unit Test",
        },
      })
      .then(async ({ purchase }) => {
        await getPurchaseSaleProductByPurchaseId
          .execute({ purchaseId: purchase.id })
          .then(({ purchaseSaleProduct }) => {
            deepStrictEqual(purchaseSaleProduct.purchaseSaleProducts.length, 3);

            deepStrictEqual(purchase.sale.id, purchaseSaleProduct.sale.id);
            deepStrictEqual(
              purchaseSaleProduct.sale.props.name,
              "Get Purchase Sale Product Unit Test",
            );
            deepStrictEqual(
              purchaseSaleProduct.sale.props.status,
              "Finalizada",
            );
            deepStrictEqual(
              purchaseSaleProduct.sale.props.products,
              "1aec1cf9-3443-4e4a-a9c9-319967bfe74c,1bd59f2d-b6b8-4f63-acd9-068246b6fee5,2d1cf07f-617d-4aac-892c-6b26ceecf36f",
            );
            deepStrictEqual(
              purchaseSaleProduct.sale.products![0].props.name,
              "Cachorro quente 0",
            );
            deepStrictEqual(
              purchaseSaleProduct.sale.products![1].props.name,
              "Cachorro quente 1",
            );
            deepStrictEqual(
              purchaseSaleProduct.sale.products![2].props.name,
              "Cachorro quente 2",
            );
            deepStrictEqual(purchaseSaleProduct.sale.products?.length, 3);
            deepStrictEqual(purchaseSaleProduct.purchaseSaleProducts.length, 3);
          });
      });
  });

  it("should not be able get purchase sale product with purchase inexistent", async () => {
    await rejects(
      async () =>
        await getPurchaseSaleProductByPurchaseId.execute({
          purchaseId: "f2983hf",
        }),
      GlobalUseCaseErrors.PurchaseNotFoundError,
    );
  });
});
