import { deepStrictEqual, ok } from "node:assert";
import { describe, it } from "node:test";

import { Product } from "../product/product";
import { PurchaseSaleProduct } from "../purchase-sale-product/purchase-sale-product";
import { SaleProduct } from "../sale-product/sale-product";
import { Sale } from "../sale/sale";
import { Purchase } from "./purchase";

describe("Purchase entity", () => {
  const products: Product[] = [];

  it("should be able to create a new purchase", () => {
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

    deepStrictEqual(purchase.id, purchase.id);
    deepStrictEqual(purchase.props.saleId, sale.id);
    purchase.purchaseSaleProducts.map((purchaseProduct) => {
      deepStrictEqual(
        purchase.purchaseSaleProducts[0].id,
        purchaseSaleProducts[0].id,
      );
      deepStrictEqual(
        purchaseProduct.props.purchaseId,
        purchaseSaleProducts[0].props.purchaseId,
      );
      deepStrictEqual(
        purchaseProduct.props.saleProductId,
        purchaseSaleProducts[0].props.saleProductId,
      );

      deepStrictEqual(purchaseProduct.purchase?.id, purchase.id);
      deepStrictEqual(purchaseProduct.purchase.props.saleId, sale.id);
      deepStrictEqual(purchaseProduct.purchase.sale.id, sale.id);
      deepStrictEqual(purchaseProduct.purchase.sale.props.name, "Sale Entity");
      deepStrictEqual(purchaseProduct.purchase.sale.props.status, "Pendente");
      deepStrictEqual(
        purchaseProduct.purchase.sale.props.products,
        `${products[0].id},${products[1].id},${products[2].id}`,
      );
      deepStrictEqual(
        purchaseProduct.purchase.sale.products![0].id,
        products[0].id,
      );
      deepStrictEqual(
        purchaseProduct.purchase.sale.products![1].id,
        products[1].id,
      );
      deepStrictEqual(
        purchaseProduct.purchase.sale.products![2].id,
        products[2].id,
      );
      deepStrictEqual(
        purchaseProduct.purchase.sale.products![0].props.name,
        "Product Entity Zero",
      );
      deepStrictEqual(
        purchaseProduct.purchase.sale.products![1].props.name,
        "Product Entity One",
      );
      deepStrictEqual(
        purchaseProduct.purchase.sale.products![2].props.name,
        "Product Entity Two",
      );
      ok(purchaseProduct.purchase.sale.created_at instanceof Date);

      deepStrictEqual(
        purchaseSaleProducts[0].props.saleProductId,
        saleProducts[0].id,
      );
      deepStrictEqual(
        purchaseSaleProducts[0].saleProduct?.sale?.props.name,
        "Sale Entity",
      );
      deepStrictEqual(
        purchaseSaleProducts[0].saleProduct?.sale?.props.status,
        "Pendente",
      );
      deepStrictEqual(
        purchaseSaleProducts[0].saleProduct?.sale?.props.products,
        `${products[0].id},${products[1].id},${products[2].id}`,
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
});
