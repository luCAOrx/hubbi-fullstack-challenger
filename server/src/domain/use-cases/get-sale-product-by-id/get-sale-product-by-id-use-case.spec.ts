import { deepStrictEqual, rejects } from "node:assert";
import { describe, it } from "node:test";

import { MakeSaleFactory } from "@test-helpers/factories/make-sale-factory";
import { InMemorySaleDatabase } from "@test-helpers/in-memory-database/in-memory-sale-database";

import { GlobalUseCaseErrors } from "../global-errors/global-use-case-errors";
import { GetSaleProductByIdUseCase } from "./get-sale-product-by-id-use-case";

describe("Get sale product by id use case", () => {
  const inMemorySaleDatabase = new InMemorySaleDatabase();
  const getSaleProductById = new GetSaleProductByIdUseCase(
    inMemorySaleDatabase,
  );

  const saleIds: Array<string> = [];

  new MakeSaleFactory()
    .toDomain({
      inMemoryDatabase: inMemorySaleDatabase,
      override: {
        name: "Get Sale Product By Id Unit Test",
        products:
          "27c7f671-539f-4bc7-9b2c-ce5e2b01680e,5e38a998-8f86-4d24-944a-72a93ec50bd2,2e48b04f-20be-4eb6-93a5-dde897b2b9f1,a0c64a5c-5d58-4b42-9cb1-6863f2157e5b,b7ff27ce-1266-4186-bbf7-05ccf674b1dd,6dab5309-4244-4aef-af48-f495416066a7,1fdaff11-3645-4760-915c-57d945234b71,5411452b-a587-4fe9-b7ff-9ccb5183a488,0280334f-9fdb-4ddc-91a2-7c1f8cdc9001,5212ad14-4390-424e-9bec-0bab7bc73bb1,65677067-fe4f-40d9-8b07-91d1540af036,e764e7a2-faca-4748-a576-2a5906f9e9c9,cad22725-b84e-4008-8117-a72152b7f7f4,724db296-9c01-4706-a711-2e6f9473d774,4e5d6e83-7682-4272-accf-32f918710210,c5ad7556-07ad-463d-bbeb-ea04e4a25100,bb41cbde-fda7-4879-a5ab-05b426e34a8d,5b8b536f-7adb-4797-9515-7036bba04606,4e92fd1d-5002-49eb-9b8a-f119e3ddfe19,a1ad812c-b4af-46c0-aa3f-01219e5a6401",
      },
    })
    .then(({ id }) => saleIds.push(id));

  it("should be able get sale product by id", async () => {
    await getSaleProductById
      .execute({ saleId: saleIds[0] })
      .then(({ page, data }) => {
        deepStrictEqual(data.length, 10);
        deepStrictEqual(page, 1);

        const product = inMemorySaleDatabase.products;

        deepStrictEqual(data[0].props.saleId, saleIds[0]);
        deepStrictEqual(data[1].props.saleId, saleIds[0]);
        deepStrictEqual(data[2].props.saleId, saleIds[0]);
        deepStrictEqual(data[3].props.saleId, saleIds[0]);
        deepStrictEqual(data[4].props.saleId, saleIds[0]);
        deepStrictEqual(data[5].props.saleId, saleIds[0]);
        deepStrictEqual(data[6].props.saleId, saleIds[0]);
        deepStrictEqual(data[7].props.saleId, saleIds[0]);
        deepStrictEqual(data[8].props.saleId, saleIds[0]);
        deepStrictEqual(data[9].props.saleId, saleIds[0]);

        deepStrictEqual(data[0].props.productId, product[0].id);
        deepStrictEqual(data[1].props.productId, product[1].id);
        deepStrictEqual(data[2].props.productId, product[2].id);
        deepStrictEqual(data[3].props.productId, product[3].id);
        deepStrictEqual(data[4].props.productId, product[4].id);
        deepStrictEqual(data[5].props.productId, product[5].id);
        deepStrictEqual(data[6].props.productId, product[6].id);
        deepStrictEqual(data[7].props.productId, product[7].id);
        deepStrictEqual(data[8].props.productId, product[8].id);
        deepStrictEqual(data[9].props.productId, product[9].id);

        deepStrictEqual(data[0].sale!.products![0].id, product[0].id);
        deepStrictEqual(data[1].sale!.products![1].id, product[1].id);
        deepStrictEqual(data[2].sale!.products![2].id, product[2].id);
        deepStrictEqual(data[3].sale!.products![3].id, product[3].id);
        deepStrictEqual(data[4].sale!.products![4].id, product[4].id);
        deepStrictEqual(data[5].sale!.products![5].id, product[5].id);
        deepStrictEqual(data[6].sale!.products![6].id, product[6].id);
        deepStrictEqual(data[7].sale!.products![7].id, product[7].id);
        deepStrictEqual(data[8].sale!.products![8].id, product[8].id);
        deepStrictEqual(data[9].sale!.products![9].id, product[9].id);

        deepStrictEqual(
          data[0].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[1].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[2].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[3].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[4].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[5].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[6].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[7].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[8].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[9].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );

        deepStrictEqual(data[0].sale!.props.status, "Pendente");
        deepStrictEqual(data[1].sale!.props.status, "Pendente");
        deepStrictEqual(data[2].sale!.props.status, "Pendente");
        deepStrictEqual(data[3].sale!.props.status, "Pendente");
        deepStrictEqual(data[4].sale!.props.status, "Pendente");
        deepStrictEqual(data[5].sale!.props.status, "Pendente");
        deepStrictEqual(data[6].sale!.props.status, "Pendente");
        deepStrictEqual(data[7].sale!.props.status, "Pendente");
        deepStrictEqual(data[8].sale!.props.status, "Pendente");
        deepStrictEqual(data[9].sale!.props.status, "Pendente");

        deepStrictEqual(
          data[0].sale!.products![0].props.name,
          "Cachorro quente 0",
        );
        deepStrictEqual(
          data[1].sale!.products![1].props.name,
          "Cachorro quente 1",
        );
        deepStrictEqual(
          data[2].sale!.products![2].props.name,
          "Cachorro quente 2",
        );
        deepStrictEqual(
          data[3].sale!.products![3].props.name,
          "Cachorro quente 3",
        );
        deepStrictEqual(
          data[4].sale!.products![4].props.name,
          "Cachorro quente 4",
        );
        deepStrictEqual(
          data[5].sale!.products![5].props.name,
          "Cachorro quente 5",
        );
        deepStrictEqual(
          data[6].sale!.products![6].props.name,
          "Cachorro quente 6",
        );
        deepStrictEqual(
          data[7].sale!.products![7].props.name,
          "Cachorro quente 7",
        );
        deepStrictEqual(
          data[8].sale!.products![8].props.name,
          "Cachorro quente 8",
        );
        deepStrictEqual(
          data[9].sale!.products![9].props.name,
          "Cachorro quente 9",
        );

        deepStrictEqual(inMemorySaleDatabase.sales.length, 1);
      });
  });

  it("should be able jump to next page on sale product by id list", async () => {
    await getSaleProductById
      .execute({ saleId: saleIds[0], page: 2 })
      .then(({ page, data }) => {
        deepStrictEqual(data.length, 10);
        deepStrictEqual(page, 2);

        const product = inMemorySaleDatabase.products;

        deepStrictEqual(data[0].props.saleId, saleIds[0]);
        deepStrictEqual(data[1].props.saleId, saleIds[0]);
        deepStrictEqual(data[2].props.saleId, saleIds[0]);
        deepStrictEqual(data[3].props.saleId, saleIds[0]);
        deepStrictEqual(data[4].props.saleId, saleIds[0]);
        deepStrictEqual(data[5].props.saleId, saleIds[0]);
        deepStrictEqual(data[6].props.saleId, saleIds[0]);
        deepStrictEqual(data[7].props.saleId, saleIds[0]);
        deepStrictEqual(data[8].props.saleId, saleIds[0]);
        deepStrictEqual(data[9].props.saleId, saleIds[0]);

        deepStrictEqual(data[0].props.productId, product[10].id);
        deepStrictEqual(data[1].props.productId, product[11].id);
        deepStrictEqual(data[2].props.productId, product[12].id);
        deepStrictEqual(data[3].props.productId, product[13].id);
        deepStrictEqual(data[4].props.productId, product[14].id);
        deepStrictEqual(data[5].props.productId, product[15].id);
        deepStrictEqual(data[6].props.productId, product[16].id);
        deepStrictEqual(data[7].props.productId, product[17].id);
        deepStrictEqual(data[8].props.productId, product[18].id);
        deepStrictEqual(data[9].props.productId, product[19].id);

        deepStrictEqual(data[0].sale!.products![10].id, product[10].id);
        deepStrictEqual(data[1].sale!.products![11].id, product[11].id);
        deepStrictEqual(data[2].sale!.products![12].id, product[12].id);
        deepStrictEqual(data[3].sale!.products![13].id, product[13].id);
        deepStrictEqual(data[4].sale!.products![14].id, product[14].id);
        deepStrictEqual(data[5].sale!.products![15].id, product[15].id);
        deepStrictEqual(data[6].sale!.products![16].id, product[16].id);
        deepStrictEqual(data[7].sale!.products![17].id, product[17].id);
        deepStrictEqual(data[8].sale!.products![18].id, product[18].id);
        deepStrictEqual(data[9].sale!.products![19].id, product[19].id);

        deepStrictEqual(
          data[0].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[1].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[2].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[3].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[4].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[5].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[6].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[7].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[8].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );
        deepStrictEqual(
          data[9].sale!.props.name,
          "Get Sale Product By Id Unit Test",
        );

        deepStrictEqual(data[0].sale!.props.status, "Pendente");
        deepStrictEqual(data[1].sale!.props.status, "Pendente");
        deepStrictEqual(data[2].sale!.props.status, "Pendente");
        deepStrictEqual(data[3].sale!.props.status, "Pendente");
        deepStrictEqual(data[4].sale!.props.status, "Pendente");
        deepStrictEqual(data[5].sale!.props.status, "Pendente");
        deepStrictEqual(data[6].sale!.props.status, "Pendente");
        deepStrictEqual(data[7].sale!.props.status, "Pendente");
        deepStrictEqual(data[8].sale!.props.status, "Pendente");
        deepStrictEqual(data[9].sale!.props.status, "Pendente");

        deepStrictEqual(
          data[0].sale!.products![10].props.name,
          "Cachorro quente 10",
        );
        deepStrictEqual(
          data[1].sale!.products![11].props.name,
          "Cachorro quente 11",
        );
        deepStrictEqual(
          data[2].sale!.products![12].props.name,
          "Cachorro quente 12",
        );
        deepStrictEqual(
          data[3].sale!.products![13].props.name,
          "Cachorro quente 13",
        );
        deepStrictEqual(
          data[4].sale!.products![14].props.name,
          "Cachorro quente 14",
        );
        deepStrictEqual(
          data[5].sale!.products![15].props.name,
          "Cachorro quente 15",
        );
        deepStrictEqual(
          data[6].sale!.products![16].props.name,
          "Cachorro quente 16",
        );
        deepStrictEqual(
          data[7].sale!.products![17].props.name,
          "Cachorro quente 17",
        );
        deepStrictEqual(
          data[8].sale!.products![18].props.name,
          "Cachorro quente 18",
        );
        deepStrictEqual(
          data[9].sale!.products![19].props.name,
          "Cachorro quente 19",
        );

        deepStrictEqual(inMemorySaleDatabase.sales.length, 1);
      });
  });

  it("should not be able get sale product with sale inexistent", async () => {
    await new MakeSaleFactory()
      .toDomain({
        inMemoryDatabase: inMemorySaleDatabase,
        override: {
          name: "Sale Two",
        },
      })
      .then(async () => {
        await rejects(
          async () =>
            await getSaleProductById.execute({
              page: 1,
              saleId: "09964c69-cba2-455d-8cb9-4da7db5d797a",
            }),
          GlobalUseCaseErrors.SaleNotFoundError,
        );
      });
  });
});
