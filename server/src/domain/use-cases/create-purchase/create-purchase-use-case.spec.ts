import { deepStrictEqual, ok, rejects } from "node:assert";
import { describe, it } from "node:test";

import { Purchase } from "@domain/entities/purchase/purchase";
import { Sale } from "@domain/entities/sale/sale";
import { MakePurchaseFactory } from "@test-helpers/factories/make-purchase-factory";
import { InMemoryPurchaseDatabase } from "@test-helpers/in-memory-database/in-memory-purchase-database";

import { GlobalUseCaseErrors } from "../global-errors/global-use-case-errors";
import { CreatePurchaseUseCaseErrors } from "./errors/these-products-are-not-part-of-this-sale-error";

describe("Create purchase use case", () => {
  const inMemoryPurchaseDatabase = new InMemoryPurchaseDatabase();

  it("should be able to create a new purchase", async () => {
    await new MakePurchaseFactory()
      .toDomain({
        inMemoryDatabase: inMemoryPurchaseDatabase,
      })
      .then(({ purchase, sale }) => {
        deepStrictEqual(purchase.props.saleId, sale.id);
        deepStrictEqual(sale.props.name, "Create Purchase");
        deepStrictEqual(sale.props.status, "Finalizada");
        deepStrictEqual(
          sale.props.products,
          "27c7f671-539f-4bc7-9b2c-ce5e2b01680e,5e38a998-8f86-4d24-944a-72a93ec50bd2,2e48b04f-20be-4eb6-93a5-dde897b2b9f1,a0c64a5c-5d58-4b42-9cb1-6863f2157e5b,b7ff27ce-1266-4186-bbf7-05ccf674b1dd,6dab5309-4244-4aef-af48-f495416066a7,1fdaff11-3645-4760-915c-57d945234b71,5411452b-a587-4fe9-b7ff-9ccb5183a488,0280334f-9fdb-4ddc-91a2-7c1f8cdc9001,5212ad14-4390-424e-9bec-0bab7bc73bb1,65677067-fe4f-40d9-8b07-91d1540af036,e764e7a2-faca-4748-a576-2a5906f9e9c9,cad22725-b84e-4008-8117-a72152b7f7f4,724db296-9c01-4706-a711-2e6f9473d774,4e5d6e83-7682-4272-accf-32f918710210,c5ad7556-07ad-463d-bbeb-ea04e4a25100,bb41cbde-fda7-4879-a5ab-05b426e34a8d,5b8b536f-7adb-4797-9515-7036bba04606,4e92fd1d-5002-49eb-9b8a-f119e3ddfe19,a1ad812c-b4af-46c0-aa3f-01219e5a6401",
        );
        deepStrictEqual(sale.products![0].props.name, "Cachorro quente 0");
        deepStrictEqual(sale.products![1].props.name, "Cachorro quente 1");
        deepStrictEqual(sale.products![2].props.name, "Cachorro quente 2");
        deepStrictEqual(sale.products![3].props.name, "Cachorro quente 3");
        deepStrictEqual(sale.products![4].props.name, "Cachorro quente 4");
        deepStrictEqual(sale.products![5].props.name, "Cachorro quente 5");
        deepStrictEqual(sale.products![6].props.name, "Cachorro quente 6");
        deepStrictEqual(sale.products![7].props.name, "Cachorro quente 7");
        deepStrictEqual(sale.products![8].props.name, "Cachorro quente 8");
        deepStrictEqual(sale.products![9].props.name, "Cachorro quente 9");
        deepStrictEqual(sale.products![10].props.name, "Cachorro quente 10");
        deepStrictEqual(sale.products![11].props.name, "Cachorro quente 11");
        deepStrictEqual(sale.products![12].props.name, "Cachorro quente 12");
        deepStrictEqual(sale.products![13].props.name, "Cachorro quente 13");
        deepStrictEqual(sale.products![14].props.name, "Cachorro quente 14");
        deepStrictEqual(sale.products![15].props.name, "Cachorro quente 15");
        deepStrictEqual(sale.products![16].props.name, "Cachorro quente 16");
        deepStrictEqual(sale.products![17].props.name, "Cachorro quente 17");
        deepStrictEqual(sale.products![18].props.name, "Cachorro quente 18");
        deepStrictEqual(sale.products![19].props.name, "Cachorro quente 19");

        deepStrictEqual(sale.products?.length, 20);
        deepStrictEqual(purchase.purchaseSaleProducts.length, 20);
        deepStrictEqual(
          inMemoryPurchaseDatabase.purchaseCounter.totalPurchases,
          1,
        );
        deepStrictEqual(inMemoryPurchaseDatabase.purchases.length, 1);
        ok(purchase.created_at instanceof Date);
        ok(purchase instanceof Purchase);
        ok(sale.created_at instanceof Date);
        ok(sale instanceof Sale);
      });
  });

  it("should not to be able to create a new purchase with saleProductId that not are part this sale", async () => {
    await rejects(
      async () =>
        await new MakePurchaseFactory().toDomain({
          inMemoryDatabase: inMemoryPurchaseDatabase,
          override: {
            saleProductId:
              "531295b6-b124-4b62-8fba-5ae552ccbde1,e2c51c9c-3f0b-44ba-8645-0f9797ca6dda,e84ce846-fb77-4e24-984e-eed6435437ea",
          },
        }),
      CreatePurchaseUseCaseErrors.TheseProductsAreNotPartOfThisSaleError,
    );
  });

  it("should not be able to create new purchase with field saleProductId empty", async () => {
    await rejects(
      async () =>
        await new MakePurchaseFactory().toDomain({
          inMemoryDatabase: inMemoryPurchaseDatabase,
          override: {
            saleProductId: "",
          },
        }),
      CreatePurchaseUseCaseErrors.TheseProductsAreNotPartOfThisSaleError,
    );
  });

  it("should not be able create purchase with sale inexistent", async () => {
    await rejects(
      async () =>
        await new MakePurchaseFactory().toDomain({
          inMemoryDatabase: inMemoryPurchaseDatabase,
          saleId: "5f7dfc24-1463-4029-9935-9e44f16f066f",
        }),
      GlobalUseCaseErrors.SaleNotFoundError,
    );
  });
});
