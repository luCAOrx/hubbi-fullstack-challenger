import { PurchaseSaleProduct } from "@domain/entities/purchase-sale-product/purchase-sale-product";
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
          "1aec1cf9-3443-4e4a-a9c9-319967bfe74c,1bd59f2d-b6b8-4f63-acd9-068246b6fee5,2d1cf07f-617d-4aac-892c-6b26ceecf36f",
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

    const { purchase } = await createPurchaseUseCase.execute({
      saleId: saleId ?? sale.id,
      saleProductId: `${inMemorySaleDatabase.saleProducts[0].id},${inMemorySaleDatabase.saleProducts[1].id},${inMemorySaleDatabase.saleProducts[2].id}`,
      ...override,
    });

    const purchaseSaleProducts = inMemorySaleDatabase.saleProducts.map(
      (saleProduct) => {
        return PurchaseSaleProduct.create(
          {
            purchaseId: purchase.id,
            saleProductId: saleProduct.id,
          },
          { _saleProduct: saleProduct, _purchase: purchase },
        );
      },
    );

    await inMemoryDatabase.transactionCreatePurchaseWithPurchaseSaleProductAndPurchaseCounter(
      purchase,
      purchaseSaleProducts,
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
        saleProductId: `${saleProducts[0].id},${saleProducts[1].id},${saleProducts[2].id}`,
        ...override,
      },
    });
  }
}
