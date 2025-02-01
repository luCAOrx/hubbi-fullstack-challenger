import { Sale } from "@domain/entities/sale/sale";
import { SaleRepository } from "@domain/repositories/sale-repository";

interface SaleCounter {
  totalSales: number;
}

export class InMemorySaleDatabase implements SaleRepository {
  public sales: Sale[] = [];
  public saleCounter: SaleCounter = { totalSales: 0 };

  async createSaleWithTotalSales(sale: Sale): Promise<Sale> {
    this.saleCounter.totalSales++;

    this.sales.push(sale);

    return sale;
  }

  async exists(name: string): Promise<boolean> {
    return this.sales.some(({ props }) => props.name === name);
  }

  async findById(id: string): Promise<Sale | null> {
    const sale = this.sales.find((sale) => sale.id === id);

    if (sale == null) return null;

    return sale;
  }

  async findMany(page: number, perPage: number): Promise<Sale[]> {
    const saleOrSales = this.sales.map((sales) => sales);

    return saleOrSales.slice((page - 1) * perPage, page * perPage);
  }

  async getTotalSalesCount(): Promise<number> {
    return this.saleCounter.totalSales ?? 0;
  }
}
