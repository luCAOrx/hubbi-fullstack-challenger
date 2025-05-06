import { SaleProduct } from "@domain/entities/sale-product/sale-product";
import { Sale } from "@domain/entities/sale/sale";

export abstract class SaleRepository {
  abstract transactionCreateSaleWithSaleProductAndSaleCounter(
    sale: Sale,
    saleProducts: SaleProduct[],
  ): Promise<Sale>;
  abstract exists(name: string): Promise<boolean>;
  abstract findById(id: string): Promise<Sale | null>;
  abstract findSaleProductById(
    saleId: string,
    page: number,
    perPage: number,
  ): Promise<SaleProduct[]>;
  abstract findMany(page: number, perPage: number): Promise<Sale[]>;
  abstract getTotalSalesCount(): Promise<number>;
}
