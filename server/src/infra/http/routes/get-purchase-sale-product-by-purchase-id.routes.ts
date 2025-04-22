import { Router } from "express";

import { GetPurchaseSaleProductByPurchaseIdController } from "../controllers/get-purchase-sale-product-by-purchase-id/get-purchase-sale-product-by-purchase-id-controller";

export const getPurchaseSaleProductByPurchaseIdRoute = Router();

getPurchaseSaleProductByPurchaseIdRoute.get(
  "/get-purchase-sale-product-by-purchase-id/:purchaseId",

  async (request, response) => {
    await new GetPurchaseSaleProductByPurchaseIdController().execute(
      request,
      response,
    );
  },
);
