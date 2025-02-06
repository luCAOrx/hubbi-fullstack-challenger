import { Router } from "express";

import { GetSaleProductByIdController } from "../controllers/get-sale-product-by-id/get-sale-product-by-id-controller";

export const getSaleProductByIdRoute = Router();

getSaleProductByIdRoute.get(
  "/get-sale-product-by-id/:saleId",
  async (request, response) => {
    await new GetSaleProductByIdController().execute(request, response);
  },
);
