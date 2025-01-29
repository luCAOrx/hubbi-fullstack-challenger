import { Sale, Status } from "@domain/entities/sale/sale";
import { CreateSaleUseCase } from "@domain/use-cases/create-sale/create-sale-use-case";
import { InMemorySaleDatabase } from "@test-helpers/in-memory-database/in-memory-sale-database";

import { MakeRequestFactory } from "./make-request-factory";

interface SaleProps {
  name: string;
  status: Status;
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

    const { sale } = await createSaleUseCase.execute({
      name: "Produtos de limpeza",
      status: "Pendente",
      products: "1,2,3",
      ...override,
    });

    await inMemoryDatabase.create(sale);

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
        status: "Pendente",
        products:
          "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
        ...override,
      },
    });
  }
}
