import { Sale } from "@domain/entities/sale/sale";
import { SaleRepository } from "@domain/repositories/sale-repository";

export class InMemorySaleDatabase implements SaleRepository {
  public sales: Sale[] = [];

  async create(sale: Sale): Promise<Sale> {
    this.sales.push(sale);

    return sale;
  }
  async exists(name: string): Promise<boolean> {
    return this.sales.some(({ props }) => props.name === name);
  }
}
