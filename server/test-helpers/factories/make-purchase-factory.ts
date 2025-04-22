import { Product } from "@domain/entities/product/product";
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

    const productZero = Product.create(
      {
        name: "Cachorro quente 0",
      },
      {
        _id: "1aec1cf9-3443-4e4a-a9c9-319967bfe74c",
      },
    );

    const productOne = Product.create(
      {
        name: "Cachorro quente 1",
      },
      {
        _id: "1bd59f2d-b6b8-4f63-acd9-068246b6fee5",
      },
    );

    const productTwo = Product.create(
      {
        name: "Cachorro quente 2",
      },
      {
        _id: "2d1cf07f-617d-4aac-892c-6b26ceecf36f",
      },
    );

    const sale = Sale.create(
      {
        name: override?.saleName ?? "Create Purchase Test Unit",
        status: "Finalizada",
        products: `${productZero.id},${productOne.id},${productTwo.id}`,
      },
      { _products: inMemorySaleDatabase.products },
    );

    const saleProducts = sale.props.products.split(",").map((productId) => {
      return SaleProduct.create(
        {
          saleId: sale.id,
          productId,
        },
        { _sale: sale },
      );
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
