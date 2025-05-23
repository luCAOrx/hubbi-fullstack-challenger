import { Product } from "@domain/entities/product/product";
import { ProductRepository } from "@domain/repositories/product-repository";

interface ProductCounter {
  totalProducts: number;
}

export class InMemoryProductDatabase implements ProductRepository {
  public products: Product[] = [];
  public productCounter: ProductCounter = { totalProducts: 0 };

  async transactionCreateProductWithProductCounter(
    product: Product,
  ): Promise<Product> {
    this.productCounter.totalProducts++;

    product = Product.create(
      {
        name: `${product.props.name}`,
      },
      { _id: product.id },
    );

    this.products.push(product);

    return product;
  }

  async findMany(page: number, perPage: number): Promise<Product[]> {
    const productOrProducts = this.products.map((products) => products);

    return productOrProducts.slice((page - 1) * perPage, page * perPage);
  }

  async getTotalProductsCount(): Promise<number> {
    return this.productCounter.totalProducts ?? 0;
  }
}
