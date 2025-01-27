import { randomUUID } from "node:crypto";

import { Sale, Status } from "@domain/entities/sale/sale";
import { CreateSaleUseCase } from "@domain/use-cases/create-sale/create-sale-use-case";

import { InMemorySaleDatabase } from "../in-memory-database/in-memory-sale-database";

interface SaleProps {
  name: string;
  status: Status;
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
      ...override,
    });

    await inMemoryDatabase.create(sale);

    return sale;
  }
}
