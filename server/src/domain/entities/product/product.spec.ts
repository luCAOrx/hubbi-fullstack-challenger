import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import { Product } from "./product";

describe("Product entity", () => {
  it("should be able to create a new product", () => {
    const product = Product.create({ name: "Produtos de limpeza" }, {});

    deepStrictEqual(product.id, product.id);
    deepStrictEqual(product.props, {
      name: "Produtos de limpeza",
    });
  });
});
