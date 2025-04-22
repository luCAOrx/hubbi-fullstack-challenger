import { Product } from "@domain/entities/product/product";
import { SaleProduct } from "@domain/entities/sale-product/sale-product";
import { Sale } from "@domain/entities/sale/sale";
import { SaleRepository } from "@domain/repositories/sale-repository";

interface SaleCounter {
  totalSales: number;
}

export class InMemorySaleDatabase implements SaleRepository {
  public sales: Sale[] = [];
  public products: Product[] = [];
  public saleProducts: SaleProduct[] = [];
  public saleCounter: SaleCounter = { totalSales: 0 };

  async transactionCreateSaleWithSaleProductAndSaleCounter(
    sale: Sale,
    saleProduct: SaleProduct[],
  ): Promise<Sale> {
    this.saleCounter.totalSales++;

    const productZero = Product.create(
      {
        name: "Cachorro quente 0",
      },
      {
        _id: sale.props.products.split(",")[0],
      },
    );

    const productOne = Product.create(
      {
        name: "Cachorro quente 1",
      },
      {
        _id: sale.props.products.split(",")[1],
      },
    );

    const productTwo = Product.create(
      {
        name: "Cachorro quente 2",
      },
      {
        _id: sale.props.products.split(",")[2],
      },
    );
    this.products.push(productZero, productOne, productTwo);

    sale = Sale.create(
      {
        name: sale.props.name,
        products: sale.props.products,
        status: sale.props.status,
      },
      { _products: this.products, _id: sale.id },
    );
    this.sales.push(sale);

    saleProduct = sale.props.products.split(",").map((productId) => {
      const saleProduct = SaleProduct.create(
        {
          saleId: sale.id,
          productId,
        },
        {},
      );

      return saleProduct;
    });

    saleProduct.map((product) => {
      this.saleProducts.push(product);
    });

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

  async findSaleProductById(saleId: string): Promise<SaleProduct[]> {
    const saleProductOrNull = this.saleProducts.filter(
      (saleProduct) => saleProduct.props.saleId === saleId,
    );

    return saleProductOrNull;
  }

  async findMany(page: number, perPage: number): Promise<Sale[]> {
    const saleOrSales = this.sales.map((sales) => sales);

    return saleOrSales.slice((page - 1) * perPage, page * perPage);
  }

  async getTotalSalesCount(): Promise<number> {
    return this.saleCounter.totalSales ?? 0;
  }
}
