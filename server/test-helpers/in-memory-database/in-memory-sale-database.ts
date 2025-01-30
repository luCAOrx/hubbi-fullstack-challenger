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

  async update(sale: Sale): Promise<Sale> {
    const saleIndex = this.sales.findIndex(
      (saleFound) => saleFound.id === sale.id,
    );

    this.sales[saleIndex] = sale;

    return sale;
  }

  async findById(id: string): Promise<Sale | null> {
    const sale = this.sales.find((sale) => sale.id === id);

    if (sale == null) return null;

    return sale;
  }

  async findMany(page: number): Promise<Sale[]> {
    const saleOrSales = this.sales.map((sales) => sales);

    return saleOrSales.slice((page - 1) * 10, page * 10);
  }
}
