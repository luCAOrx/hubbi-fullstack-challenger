import { deepStrictEqual, ok } from "node:assert";
import { describe, it } from "node:test";

import { Product } from "../product/product";
import { Sale } from "../sale/sale";
import { SaleProduct } from "./sale-product";

describe("Sale Product entity", () => {
  it("should be able create a new sale product entity", () => {
    const product = Product.create(
      {
        name: "Product Entity",
      },
      {},
    );

    const sale = Sale.create(
      {
        name: "Sale Entity",
        products: product.id,
      },
      {},
    );

    const saleProduct = SaleProduct.create(
      {
        saleId: sale.id,
        productId: product.id,
      },
      {},
    );

    deepStrictEqual(saleProduct.id, saleProduct.id);
    deepStrictEqual(saleProduct.props, {
      saleId: sale.id,
      productId: sale.props.products,
    });
    ok(saleProduct.created_at instanceof Date);
  });
});
