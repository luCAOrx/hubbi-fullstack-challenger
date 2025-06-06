import { type Paths } from "swagger-jsdoc";

import { createPurchaseRequest } from "./src/infra/http/routes/create-purchase/create-purchase-request";
import { createSaleRequest } from "./src/infra/http/routes/create-sale/create-sale-request";
import { getProductsRequest } from "./src/infra/http/routes/get-products/get-products-request";
import { getPurhcaseSaleProductByPurchaseIdRequest } from "./src/infra/http/routes/get-purchase-sale-product-by-purchase-id/get-purchase-sale-product-by-purchase-id-request";
import { getPurchasesRequest } from "./src/infra/http/routes/get-purchases/get-purchases-request";
import { getSaleProductByIdRequest } from "./src/infra/http/routes/get-sale-product-by-id/get-sale-product-by-id-request";
import { getSalesRequest } from "./src/infra/http/routes/get-sales/get-sales-request";
import { pageNotFoundRequest } from "./src/infra/http/routes/global-responses/page-not-found-request";

export const swaggerPaths: Paths = {
  "/create-sale": {
    post: createSaleRequest,
  },

  "/get-sales": {
    get: getSalesRequest,
  },

  "/get-sale-product-by-id/{saleId}": {
    get: getSaleProductByIdRequest,
  },

  "/create-purchase/{saleId}": {
    post: createPurchaseRequest,
  },

  "/get-purchases": {
    get: getPurchasesRequest,
  },

  "/get-products": {
    get: getProductsRequest,
  },

  "/get-purchase-sale-product-by-purchase-id/{purchaseId}": {
    get: getPurhcaseSaleProductByPurchaseIdRequest,
  },

  "/fake-route": {
    get: pageNotFoundRequest,
  },
};
