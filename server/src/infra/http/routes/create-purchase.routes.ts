import { Router } from "express";

import { CreatePurchaseController } from "../controllers/create-purchase/create-purchase-controller";

export const createPurchaseRoute = Router();

createPurchaseRoute.post(
  "/create-purchase/:saleId",
  async (request, response) => {
    await new CreatePurchaseController().execute(request, response);
  },
);
