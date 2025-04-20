import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import { Product } from "../product/product";
import { Purchase } from "../purchase/purchase";
import { SaleProduct } from "../sale-product/sale-product";
import { Sale } from "../sale/sale";
import { PurchaseSaleProduct } from "./purchase-sale-product";

describe("Purchase Sale Product entity", () => {
  const products: Product[] = [];
  it("should be able to create a new purchase sale product", () => {
    const productZero = Product.create(
      {
        name: "Product Entity Zero",
      },
      {},
    );

    const productOne = Product.create(
      {
        name: "Product Entity One",
      },
      {},
    );

    const productTwo = Product.create(
      {
        name: "Product Entity Two",
      },
      {},
    );

    products.push(productZero, productOne, productTwo);

    const sale = Sale.create(
      {
        name: "Sale Entity",
        status: "Pendente",
        products: `${products[0].id},${products[1].id},${products[2].id}`,
      },
      { _products: products },
    );

    const saleProducts = products.map((product) => {
      const saleProduct = SaleProduct.create(
        {
          saleId: sale.id,
          productId: products[0].id,
        },
        { _product: product, _sale: sale },
      );

      return saleProduct;
    });

    let purchase = Purchase.create(
      {
        saleId: sale.id,
      },
      { _sale: sale },
    );

    const purchaseSaleProducts = saleProducts.map((saleProduct) => {
      const purchaseSaleProduct = PurchaseSaleProduct.create(
        {
          purchaseId: purchase.id,
          saleProductId: saleProducts[0].id,
        },
        { _purchase: purchase, _saleProduct: saleProduct },
      );

      return purchaseSaleProduct;
    });

    purchase = Purchase.create(
      {
        saleId: sale.id,
      },
      {
        _id: purchase.id,
        _sale: sale,
        _purchaseSaleProducts: purchaseSaleProducts,
      },
    );

    deepStrictEqual(purchaseSaleProducts[0].id, purchaseSaleProducts[0].id);
    deepStrictEqual(purchaseSaleProducts[0].props, {
      purchaseId: purchase.id,
      saleProductId: saleProducts[0].id,
    });

    deepStrictEqual(purchaseSaleProducts[0].saleProduct?.props.saleId, sale.id);
    deepStrictEqual(
      purchaseSaleProducts[0].saleProduct?.props.productId,
      products[0].id,
    );

    deepStrictEqual(purchaseSaleProducts[0].saleProduct?.sale?.id, sale.id);
    deepStrictEqual(
      purchaseSaleProducts[0].saleProduct?.sale?.props.name,
      "Sale Entity",
    );
    deepStrictEqual(
      purchaseSaleProducts[1].saleProduct?.sale?.props.name,
      "Sale Entity",
    );
    deepStrictEqual(
      purchaseSaleProducts[2].saleProduct?.sale?.props.name,
      "Sale Entity",
    );
    deepStrictEqual(
      purchaseSaleProducts[0].saleProduct.sale.props.products,
      `${products[0].id},${products[1].id},${products[2].id}`,
    );
    deepStrictEqual(
      purchaseSaleProducts[1].saleProduct.sale.props.products,
      `${products[0].id},${products[1].id},${products[2].id}`,
    );
    deepStrictEqual(
      purchaseSaleProducts[2].saleProduct.sale.props.products,
      `${products[0].id},${products[1].id},${products[2].id}`,
    );
    deepStrictEqual(
      purchaseSaleProducts[0].saleProduct?.sale?.props.status,
      "Pendente",
    );
    deepStrictEqual(
      purchaseSaleProducts[1].saleProduct?.sale?.props.status,
      "Pendente",
    );
    deepStrictEqual(
      purchaseSaleProducts[2].saleProduct?.sale?.props.status,
      "Pendente",
    );

    deepStrictEqual(
      purchaseSaleProducts[0].saleProduct?.product?.id,
      products[0].id,
    );
    deepStrictEqual(
      purchaseSaleProducts[1].saleProduct?.product?.id,
      products[1].id,
    );
    deepStrictEqual(
      purchaseSaleProducts[2].saleProduct?.product?.id,
      products[2].id,
    );
    deepStrictEqual(
      purchaseSaleProducts[0].saleProduct?.product?.props.name,
      "Product Entity Zero",
    );
    deepStrictEqual(
      purchaseSaleProducts[1].saleProduct?.product?.props.name,
      "Product Entity One",
    );
    deepStrictEqual(
      purchaseSaleProducts[2].saleProduct?.product?.props.name,
      "Product Entity Two",
    );
  });
});
