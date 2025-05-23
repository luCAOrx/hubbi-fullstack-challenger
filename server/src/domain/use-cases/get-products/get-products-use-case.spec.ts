import { deepStrictEqual, notDeepStrictEqual } from "node:assert";
import { describe, it, before } from "node:test";

import { Product } from "@domain/entities/product/product";
import { InMemoryProductDatabase } from "@test-helpers/in-memory-database/in-memory-product-database";

import { GetProductsUseCase } from "./get-products-use-case";

describe("Get products use case", () => {
  const inMemoryProductDatabase = new InMemoryProductDatabase();
  const getProductsUseCase = new GetProductsUseCase(inMemoryProductDatabase);
  const products: Product[] = [];

  before(async () => {
    for (let i = 0; i < 20; i++) {
      const letter = String.fromCharCode(65 + i);

      const product = Product.create(
        {
          name: `Doces ${letter}`,
        },
        {},
      );

      inMemoryProductDatabase.transactionCreateProductWithProductCounter(
        product,
      );

      products.push(product);
    }
  });

  it("should be able list product or products", async () => {
    await getProductsUseCase
      .execute({})
      .then(({ page, pages, perPage, totalProducts, data }) => {
        notDeepStrictEqual(data.length, 11);
        deepStrictEqual(page, 1);
        deepStrictEqual(pages, 2);
        deepStrictEqual(perPage, 10);
        deepStrictEqual(totalProducts, 20);
        deepStrictEqual(inMemoryProductDatabase.products.length, 20);
        deepStrictEqual(data[0].id, inMemoryProductDatabase.products[0].id);
        deepStrictEqual(data[1].id, inMemoryProductDatabase.products[1].id);
        deepStrictEqual(data[2].id, inMemoryProductDatabase.products[2].id);
        deepStrictEqual(data[3].id, inMemoryProductDatabase.products[3].id);
        deepStrictEqual(data[4].id, inMemoryProductDatabase.products[4].id);
        deepStrictEqual(data[5].id, inMemoryProductDatabase.products[5].id);
        deepStrictEqual(data[6].id, inMemoryProductDatabase.products[6].id);
        deepStrictEqual(data[7].id, inMemoryProductDatabase.products[7].id);
        deepStrictEqual(data[8].id, inMemoryProductDatabase.products[8].id);
        deepStrictEqual(data[9].id, inMemoryProductDatabase.products[9].id);
        deepStrictEqual(data[0].props.name, "Doces A");
        deepStrictEqual(data[1].props.name, "Doces B");
        deepStrictEqual(data[2].props.name, "Doces C");
        deepStrictEqual(data[3].props.name, "Doces D");
        deepStrictEqual(data[4].props.name, "Doces E");
        deepStrictEqual(data[5].props.name, "Doces F");
        deepStrictEqual(data[6].props.name, "Doces G");
        deepStrictEqual(data[7].props.name, "Doces H");
        deepStrictEqual(data[8].props.name, "Doces I");
        deepStrictEqual(data[9].props.name, "Doces J");
      });
  });

  it("should be able jump to next page on products list", async () => {
    await getProductsUseCase
      .execute({ page: 2 })
      .then(({ page, pages, perPage, totalProducts, data }) => {
        notDeepStrictEqual(data.length, 11);
        deepStrictEqual(page, 2);
        deepStrictEqual(pages, 2);
        deepStrictEqual(perPage, 10);
        deepStrictEqual(totalProducts, 20);
        deepStrictEqual(inMemoryProductDatabase.products.length, 20);
        deepStrictEqual(data[0].id, inMemoryProductDatabase.products[10].id);
        deepStrictEqual(data[1].id, inMemoryProductDatabase.products[11].id);
        deepStrictEqual(data[2].id, inMemoryProductDatabase.products[12].id);
        deepStrictEqual(data[3].id, inMemoryProductDatabase.products[13].id);
        deepStrictEqual(data[4].id, inMemoryProductDatabase.products[14].id);
        deepStrictEqual(data[5].id, inMemoryProductDatabase.products[15].id);
        deepStrictEqual(data[6].id, inMemoryProductDatabase.products[16].id);
        deepStrictEqual(data[7].id, inMemoryProductDatabase.products[17].id);
        deepStrictEqual(data[8].id, inMemoryProductDatabase.products[18].id);
        deepStrictEqual(data[9].id, inMemoryProductDatabase.products[19].id);
        deepStrictEqual(data[0].props.name, "Doces K");
        deepStrictEqual(data[1].props.name, "Doces L");
        deepStrictEqual(data[2].props.name, "Doces M");
        deepStrictEqual(data[3].props.name, "Doces N");
        deepStrictEqual(data[4].props.name, "Doces O");
        deepStrictEqual(data[5].props.name, "Doces P");
        deepStrictEqual(data[6].props.name, "Doces Q");
        deepStrictEqual(data[7].props.name, "Doces R");
        deepStrictEqual(data[8].props.name, "Doces S");
        deepStrictEqual(data[9].props.name, "Doces T");
      });
  });
});
