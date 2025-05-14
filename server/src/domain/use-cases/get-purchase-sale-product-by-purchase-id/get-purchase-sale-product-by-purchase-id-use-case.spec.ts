import { deepStrictEqual, rejects } from "node:assert";
import { describe, it } from "node:test";

import { MakePurchaseFactory } from "@test-helpers/factories/make-purchase-factory";
import { InMemoryPurchaseDatabase } from "@test-helpers/in-memory-database/in-memory-purchase-database";

import { GlobalUseCaseErrors } from "../global-errors/global-use-case-errors";
import { GetPurchaseSaleProductByPurchaseIdUseCase } from "./get-purchase-sale-product-by-purchase-id-use-case";

describe("Get purchase sale product by purchaseId use case", async () => {
  const inMemoryPurchaseDatabase = new InMemoryPurchaseDatabase();
  const getPurchaseSaleProductByPurchaseId =
    new GetPurchaseSaleProductByPurchaseIdUseCase(inMemoryPurchaseDatabase);

  const purchaseId: string[] = [];
  const saleId: string[] = [];

  await new MakePurchaseFactory()
    .toDomain({
      inMemoryDatabase: inMemoryPurchaseDatabase,
      override: {
        saleName: "Get Purchase Sale Product Unit Test",
      },
    })
    .then(async ({ purchase }) => {
      purchaseId.push(purchase.id);
      saleId.push(purchase.sale.id);
    });

  it("should be able get purchase sale product by purchaseId", async () => {
    await getPurchaseSaleProductByPurchaseId
      .execute({ purchaseId: purchaseId[0] })
      .then(({ data }) => {
        data.map((purchaseSaleProduct) => {
          deepStrictEqual(saleId[0], purchaseSaleProduct.purchase?.sale.id);
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.props.name,
            "Get Purchase Sale Product Unit Test",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.props.status,
            "Finalizada",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.props.products,
            "27c7f671-539f-4bc7-9b2c-ce5e2b01680e,5e38a998-8f86-4d24-944a-72a93ec50bd2,2e48b04f-20be-4eb6-93a5-dde897b2b9f1,a0c64a5c-5d58-4b42-9cb1-6863f2157e5b,b7ff27ce-1266-4186-bbf7-05ccf674b1dd,6dab5309-4244-4aef-af48-f495416066a7,1fdaff11-3645-4760-915c-57d945234b71,5411452b-a587-4fe9-b7ff-9ccb5183a488,0280334f-9fdb-4ddc-91a2-7c1f8cdc9001,5212ad14-4390-424e-9bec-0bab7bc73bb1,65677067-fe4f-40d9-8b07-91d1540af036,e764e7a2-faca-4748-a576-2a5906f9e9c9,cad22725-b84e-4008-8117-a72152b7f7f4,724db296-9c01-4706-a711-2e6f9473d774,4e5d6e83-7682-4272-accf-32f918710210,c5ad7556-07ad-463d-bbeb-ea04e4a25100,bb41cbde-fda7-4879-a5ab-05b426e34a8d,5b8b536f-7adb-4797-9515-7036bba04606,4e92fd1d-5002-49eb-9b8a-f119e3ddfe19,a1ad812c-b4af-46c0-aa3f-01219e5a6401",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![0].props.name,
            "Cachorro quente 0",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![1].props.name,
            "Cachorro quente 1",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![2].props.name,
            "Cachorro quente 2",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![3].props.name,
            "Cachorro quente 3",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![4].props.name,
            "Cachorro quente 4",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![5].props.name,
            "Cachorro quente 5",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![6].props.name,
            "Cachorro quente 6",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![7].props.name,
            "Cachorro quente 7",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![8].props.name,
            "Cachorro quente 8",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![9].props.name,
            "Cachorro quente 9",
          );
        });

        deepStrictEqual(data.length, 10);
      });
  });

  it("should be able jump to next page on get purchase sale product by purchaseId list", async () => {
    await getPurchaseSaleProductByPurchaseId
      .execute({ purchaseId: purchaseId[0], page: 2 })
      .then(({ data }) => {
        data.map((purchaseSaleProduct) => {
          deepStrictEqual(saleId[0], purchaseSaleProduct.purchase?.sale.id);
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.props.name,
            "Get Purchase Sale Product Unit Test",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.props.status,
            "Finalizada",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.props.products,
            "27c7f671-539f-4bc7-9b2c-ce5e2b01680e,5e38a998-8f86-4d24-944a-72a93ec50bd2,2e48b04f-20be-4eb6-93a5-dde897b2b9f1,a0c64a5c-5d58-4b42-9cb1-6863f2157e5b,b7ff27ce-1266-4186-bbf7-05ccf674b1dd,6dab5309-4244-4aef-af48-f495416066a7,1fdaff11-3645-4760-915c-57d945234b71,5411452b-a587-4fe9-b7ff-9ccb5183a488,0280334f-9fdb-4ddc-91a2-7c1f8cdc9001,5212ad14-4390-424e-9bec-0bab7bc73bb1,65677067-fe4f-40d9-8b07-91d1540af036,e764e7a2-faca-4748-a576-2a5906f9e9c9,cad22725-b84e-4008-8117-a72152b7f7f4,724db296-9c01-4706-a711-2e6f9473d774,4e5d6e83-7682-4272-accf-32f918710210,c5ad7556-07ad-463d-bbeb-ea04e4a25100,bb41cbde-fda7-4879-a5ab-05b426e34a8d,5b8b536f-7adb-4797-9515-7036bba04606,4e92fd1d-5002-49eb-9b8a-f119e3ddfe19,a1ad812c-b4af-46c0-aa3f-01219e5a6401",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![10].props.name,
            "Cachorro quente 10",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![11].props.name,
            "Cachorro quente 11",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![12].props.name,
            "Cachorro quente 12",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![13].props.name,
            "Cachorro quente 13",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![14].props.name,
            "Cachorro quente 14",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![15].props.name,
            "Cachorro quente 15",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![16].props.name,
            "Cachorro quente 16",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![17].props.name,
            "Cachorro quente 17",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![18].props.name,
            "Cachorro quente 18",
          );
          deepStrictEqual(
            purchaseSaleProduct.purchase?.sale.products![19].props.name,
            "Cachorro quente 19",
          );
        });

        deepStrictEqual(data.length, 10);
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
