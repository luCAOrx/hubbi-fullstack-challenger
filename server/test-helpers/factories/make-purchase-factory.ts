import { Purchase } from "@domain/entities/purchase/purchase";
import { Sale } from "@domain/entities/sale/sale";
import { CreatePurchaseUseCase } from "@domain/use-cases/create-purchase/create-purchase-use-case";
import { CreateSaleUseCase } from "@domain/use-cases/create-sale/create-sale-use-case";
import { InMemoryPurchaseDatabase } from "@test-helpers/in-memory-database/in-memory-purchase-database";
import { InMemorySaleDatabase } from "@test-helpers/in-memory-database/in-memory-sale-database";

import { MakeRequestFactory } from "./make-request-factory";

interface PurchaseProps {
  saleId: string;
  products: string;
}

interface MakePurchaseFactoryToDomainResponse {
  purchase: Purchase;
  sale: Sale;
}

type Override = Partial<PurchaseProps>;

export class MakePurchaseFactory {
  public async toDomain({
    saleId,
    inMemoryDatabaseToPurchase,
    inMemoryDatabaseToSale,
    override,
  }: {
    saleId?: string;
    inMemoryDatabaseToPurchase: InMemoryPurchaseDatabase;
    inMemoryDatabaseToSale?: InMemorySaleDatabase;
    override?: Override;
  }): Promise<MakePurchaseFactoryToDomainResponse> {
    const inMemorySaleDatabase = new InMemorySaleDatabase();
    const inMemoryPurchaseDatabase = new InMemoryPurchaseDatabase();
    const createPurchaseUseCase = new CreatePurchaseUseCase(
      inMemoryPurchaseDatabase,
      inMemorySaleDatabase,
    );

    const createSaleUseCase = new CreateSaleUseCase(inMemorySaleDatabase);

    const { sale } = await createSaleUseCase.execute({
      name: "Produtos de limpeza",
      status: "Finalizada",
      products: "1,2,3",
    });

    const { purchase } = await createPurchaseUseCase.execute({
      saleId: saleId ?? sale.id,
      products: "1,2,3",
      ...override,
    });

    await inMemoryDatabaseToSale?.create(sale);

    await inMemoryDatabaseToPurchase.create(purchase);

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

    return await MakeRequestFactory.execute({
      url: `${String(process.env.TEST_SERVER_URL)}/create-purchase/${saleId}`,
      method: "POST",
      headers,
      data: {
        products:
          "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
        ...override,
      },
    });
  }
}
