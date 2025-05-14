import { Purchase } from "@domain/entities/purchase/purchase";
import { SaleProduct } from "@domain/entities/sale-product/sale-product";
import { Sale } from "@domain/entities/sale/sale";
import { CreatePurchaseUseCase } from "@domain/use-cases/create-purchase/create-purchase-use-case";
import { prisma } from "@infra/http/libs/prisma-client";
import { InMemoryPurchaseDatabase } from "@test-helpers/in-memory-database/in-memory-purchase-database";
import { InMemorySaleDatabase } from "@test-helpers/in-memory-database/in-memory-sale-database";

import { MakeRequestFactory } from "./make-request-factory";

interface PurchaseProps {
  saleId: string;
  saleProductId: string;
  saleName?: string;
}

interface MakePurchaseFactoryToDomainResponse {
  purchase: Purchase;
  sale: Sale;
}

type Override = Partial<PurchaseProps>;

export const inMemorySaleRecord: Sale[] = [];
export const inMemorySaleProductRecord: SaleProduct[] = [];

export class MakePurchaseFactory {
  public async toDomain({
    saleId,
    inMemoryDatabase,
    override,
  }: {
    saleId?: string;
    inMemoryDatabase: InMemoryPurchaseDatabase;
    override?: Override;
  }): Promise<MakePurchaseFactoryToDomainResponse> {
    const inMemorySaleDatabase = new InMemorySaleDatabase();
    const inMemoryPurchaseDatabase = new InMemoryPurchaseDatabase();
    const createPurchaseUseCase = new CreatePurchaseUseCase(
      inMemoryPurchaseDatabase,
      inMemorySaleDatabase,
    );

    const sale = Sale.create(
      {
        name: override?.saleName ?? "Create Purchase Test Unit",
        status: "Finalizada",
        products:
          "27c7f671-539f-4bc7-9b2c-ce5e2b01680e,5e38a998-8f86-4d24-944a-72a93ec50bd2,2e48b04f-20be-4eb6-93a5-dde897b2b9f1,a0c64a5c-5d58-4b42-9cb1-6863f2157e5b,b7ff27ce-1266-4186-bbf7-05ccf674b1dd,6dab5309-4244-4aef-af48-f495416066a7,1fdaff11-3645-4760-915c-57d945234b71,5411452b-a587-4fe9-b7ff-9ccb5183a488,0280334f-9fdb-4ddc-91a2-7c1f8cdc9001,5212ad14-4390-424e-9bec-0bab7bc73bb1,65677067-fe4f-40d9-8b07-91d1540af036,e764e7a2-faca-4748-a576-2a5906f9e9c9,cad22725-b84e-4008-8117-a72152b7f7f4,724db296-9c01-4706-a711-2e6f9473d774,4e5d6e83-7682-4272-accf-32f918710210,c5ad7556-07ad-463d-bbeb-ea04e4a25100,bb41cbde-fda7-4879-a5ab-05b426e34a8d,5b8b536f-7adb-4797-9515-7036bba04606,4e92fd1d-5002-49eb-9b8a-f119e3ddfe19,a1ad812c-b4af-46c0-aa3f-01219e5a6401",
      },
      { _products: inMemorySaleDatabase.products },
    );

    let saleProducts = sale.props.products.split(",").map((productId) => {
      const saleProduct = SaleProduct.create(
        {
          saleId: sale.id,
          productId,
        },
        { _sale: sale },
      );

      return saleProduct;
    });

    sale.products?.map((product) => {
      saleProducts = saleProducts.map((saleProduct) => {
        return SaleProduct.create(
          {
            saleId: saleProduct.props.saleId,
            productId: saleProduct.props.productId,
          },
          {
            _sale: saleProduct.sale,
            _product: product,
            _id: saleProduct.id,
          },
        );
      });
    });

    await inMemorySaleDatabase.transactionCreateSaleWithSaleProductAndSaleCounter(
      sale,
      saleProducts,
    );

    inMemorySaleDatabase.sales.map((inMemorySale) =>
      inMemorySaleRecord.push(inMemorySale),
    );

    inMemorySaleDatabase.saleProducts.map((inMemorySaleProduct) =>
      inMemorySaleProductRecord.push(inMemorySaleProduct),
    );

    const { purchase } = await createPurchaseUseCase.execute({
      saleId: saleId ?? sale.id,
      saleProductId: `${inMemorySaleDatabase.saleProducts[0].id},${inMemorySaleDatabase.saleProducts[1].id},${inMemorySaleDatabase.saleProducts[2].id},${inMemorySaleDatabase.saleProducts[3].id},${inMemorySaleDatabase.saleProducts[4].id},${inMemorySaleDatabase.saleProducts[5].id},${inMemorySaleDatabase.saleProducts[6].id},${inMemorySaleDatabase.saleProducts[7].id},${inMemorySaleDatabase.saleProducts[8].id},${inMemorySaleDatabase.saleProducts[9].id},${inMemorySaleDatabase.saleProducts[10].id},${inMemorySaleDatabase.saleProducts[11].id},${inMemorySaleDatabase.saleProducts[12].id},${inMemorySaleDatabase.saleProducts[13].id},${inMemorySaleDatabase.saleProducts[14].id},${inMemorySaleDatabase.saleProducts[15].id},${inMemorySaleDatabase.saleProducts[16].id},${inMemorySaleDatabase.saleProducts[17].id},${inMemorySaleDatabase.saleProducts[18].id},${inMemorySaleDatabase.saleProducts[19].id}`,
      ...override,
    });

    await inMemoryDatabase.transactionCreatePurchaseWithPurchaseSaleProductAndPurchaseCounter(
      purchase,
      purchase.purchaseSaleProducts,
    );

    return { purchase, sale };
  }

  public async toHttp({
    saleId,
    override,
  }: {
    saleId?: string;
    override?: Override;
  }): Promise<Response> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const saleProductOrSaleProducts = await prisma.saleProduct.findMany({
      where: { saleId },
    });

    const saleProducts = saleProductOrSaleProducts.map(
      (saleProduct) => saleProduct,
    );

    return await MakeRequestFactory.execute({
      url: `${String(process.env.TEST_SERVER_URL)}/create-purchase/${saleId}`,
      method: "POST",
      headers,
      data: {
        saleProductId: `${saleProducts[0].id},${saleProducts[1].id},${saleProducts[2].id},${saleProducts[3].id},${saleProducts[4].id},${saleProducts[5].id},${saleProducts[6].id},${saleProducts[7].id},${saleProducts[8].id},${saleProducts[9].id},${saleProducts[10].id},${saleProducts[11].id},${saleProducts[12].id},${saleProducts[13].id},${saleProducts[14].id},${saleProducts[15].id},${saleProducts[16].id},${saleProducts[17].id},${saleProducts[18].id},${saleProducts[19].id}`,
        ...override,
      },
    });
  }
}
