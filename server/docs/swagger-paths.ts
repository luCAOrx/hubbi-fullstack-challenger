import { type Paths } from "swagger-jsdoc";

import { createPurchaseRequest } from "./src/infra/http/routes/create-purchase/create-purchase-request";
import { createSaleRequest } from "./src/infra/http/routes/create-sale/create-sale-request";
import { getSalesRequest } from "./src/infra/http/routes/get-sales/get-sales-request";
import { pageNotFoundRequest } from "./src/infra/http/routes/global-responses/page-not-found-request";

export const swaggerPaths: Paths = {
  "/create-sale": {
    post: createSaleRequest,
  },

  "/get-sales": {
    get: getSalesRequest,
  },

  "/create-purchase/{saleId}": {
    post: createPurchaseRequest,
  },

  "/fake-route": {
    get: pageNotFoundRequest,
  },
};
