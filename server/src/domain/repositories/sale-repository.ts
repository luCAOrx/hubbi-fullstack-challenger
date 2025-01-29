import { Sale } from "@domain/entities/sale/sale";

export abstract class SaleRepository {
  abstract create(sale: Sale): Promise<Sale>;
  abstract exists(name: string): Promise<boolean>;
  abstract findMany(page: number): Promise<Sale[]>;
}
