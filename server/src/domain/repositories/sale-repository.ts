import { Sale } from "@domain/entities/sale/sale";

export abstract class SaleRepository {
  abstract createSaleWithTotalSales(sale: Sale): Promise<Sale>;
  abstract exists(name: string): Promise<boolean>;
  abstract findById(id: string): Promise<Sale | null>;
  abstract findSaleProductById(saleId: string): Promise<Sale | null>;
  abstract findMany(page: number, perPage: number): Promise<Sale[]>;
  abstract getTotalSalesCount(): Promise<number>;
}
