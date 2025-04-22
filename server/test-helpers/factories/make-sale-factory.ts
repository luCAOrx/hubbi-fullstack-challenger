import { Product } from "@domain/entities/product/product";
import { SaleProduct } from "@domain/entities/sale-product/sale-product";
import { Sale } from "@domain/entities/sale/sale";
import { CreateSaleUseCase } from "@domain/use-cases/create-sale/create-sale-use-case";
import { InMemorySaleDatabase } from "@test-helpers/in-memory-database/in-memory-sale-database";

import { MakeRequestFactory } from "./make-request-factory";

interface SaleProps {
  name: string;
  products: string;
}

type Override = Partial<SaleProps>;

export class MakeSaleFactory {
  public async toDomain({
    inMemoryDatabase,
    override,
  }: {
    inMemoryDatabase: InMemorySaleDatabase;
    override?: Override;
  }): Promise<Sale> {
    const inMemorySaleDatabase = new InMemorySaleDatabase();
    const createSaleUseCase = new CreateSaleUseCase(inMemorySaleDatabase);

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

    const { sale } = await createSaleUseCase.execute({
      name: "Produtos de limpeza",
      products: `${productZero.id},${productOne.id},${productTwo.id}`,
      ...override,
    });

    const saleProducts = sale.props.products.split(",").map((productId) => {
      const saleProduct = SaleProduct.create(
        {
          saleId: sale.id,
          productId,
        },
        { _sale: sale },
      );

      return saleProduct;
    });

    await inMemoryDatabase.transactionCreateSaleWithSaleProductAndSaleCounter(
      sale,
      saleProducts,
    );

    return sale;
  }

  public async toHttp({
    override,
  }: {
    override?: Override;
  }): Promise<Response> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    return await MakeRequestFactory.execute({
      url: `${String(process.env.TEST_SERVER_URL)}/create-sale`,
      method: "POST",
      headers,
      data: {
        name: "Produtos de limpeza",
        products:
          "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
        ...override,
      },
    });
  }
}
