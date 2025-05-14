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
    saleProducts: SaleProduct[],
  ): Promise<Sale> {
    this.saleCounter.totalSales++;

    sale.props.products.split(",").map((productId, index) => {
      const product = Product.create(
        {
          name: `Cachorro quente ${index}`,
        },
        { _id: productId },
      );

      this.products.push(product);
    });

    sale = Sale.create(
      {
        name: sale.props.name,
        products: sale.props.products,
        status: sale.props.status,
      },
      { _products: this.products, _id: sale.id },
    );
    this.sales.push(sale);

    const salePropsProducts = sale.props.products
      .split(",")
      .map((productId) => {
        const saleProduct = SaleProduct.create(
          {
            saleId: sale.id,
            productId,
          },
          { _sale: sale },
        );

        return saleProduct;
      });

    sale.products?.map((product) => {
      saleProducts = salePropsProducts.map((saleProduct) => {
        return SaleProduct.create(
          {
            saleId: saleProduct.props.saleId,
            productId: saleProduct.props.productId,
          },
          {
            _sale: saleProduct.sale,
            _product: product,
            _id: saleProduct.id,
          },
        );
      });
    });

    saleProducts.map((saleProduct) => {
      this.saleProducts.push(saleProduct);
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

  async findSaleProductById(
    saleId: string,
    page: number,
    perPage: number,
  ): Promise<SaleProduct[]> {
    const saleProductOrSaleProducts = this.saleProducts.filter(
      (saleProduct) => saleProduct.props.saleId === saleId,
    );

    return saleProductOrSaleProducts.slice(
      (page - 1) * perPage,
      page * perPage,
    );
  }

  async validateSaleProductIdsThatBelongToTheSale(
    saleId: string,
    saleProductIds: string[],
  ): Promise<boolean> {
    const validIds = new Set(
      this.saleProducts
        .filter((sp) => sp.sale?.id === saleId)
        .map((sp) => sp.id),
    );

    return saleProductIds.every((id) => validIds.has(id));
  }

  async findMany(page: number, perPage: number): Promise<Sale[]> {
    const saleOrSales = this.sales.map((sales) => sales);

    return saleOrSales.slice((page - 1) * perPage, page * perPage);
  }

  async getTotalSalesCount(): Promise<number> {
    return this.saleCounter.totalSales ?? 0;
  }
}
