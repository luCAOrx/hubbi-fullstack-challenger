import { type Paths } from "swagger-jsdoc";

import { createSaleRequest } from "./src/infra/http/routes/create-sale/create-sale-request";
import { pageNotFoundRequest } from "./src/infra/http/routes/global-responses/page-not-found-request";

export const swaggerPaths: Paths = {
  "/create-sale": {
    post: createSaleRequest,
  },

  "/fake-route": {
    get: pageNotFoundRequest,
  },
};
