import { Product } from "@domain/entities/product/product";
import { Sale } from "@domain/entities/sale/sale";
import { SaleRepository } from "@domain/repositories/sale-repository";

interface SaleCounter {
  totalSales: number;
}

export class InMemorySaleDatabase implements SaleRepository {
  public sales: Sale[] = [];
  public products: Product[] = [];
  public saleCounter: SaleCounter = { totalSales: 0 };

  async createSaleWithTotalSales(sale: Sale): Promise<Sale> {
    this.saleCounter.totalSales++;

    for (let i = 0; i < 3; i++) {
      const product = Product.create({ name: `Cachorro quente ${i}` }, {});
      this.products.push(product);
    }

    sale = Sale.create(
      {
        name: sale.props.name,
        products: sale.props.products,
        status: sale.props.status,
      },
      { _products: this.products, _id: sale.id },
    );
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

  async findSaleProductById(saleId: string): Promise<Sale | null> {
    const saleOrNull = this.sales.find((sale) => sale.id === saleId);

    if (saleOrNull == null) return null;

    const products = saleOrNull.products?.map((product) => product);

    return Sale.create(
      {
        products: saleOrNull.props.products,
        name: saleOrNull.props.name,
        status: saleOrNull.props.status,
      },
      { _products: products! },
    );
  }

  async findMany(page: number, perPage: number): Promise<Sale[]> {
    const saleOrSales = this.sales.map((sales) => sales);

    return saleOrSales.slice((page - 1) * perPage, page * perPage);
  }

  async getTotalSalesCount(): Promise<number> {
    return this.saleCounter.totalSales ?? 0;
  }
}
