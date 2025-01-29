import { Router } from "express";

import { CreateSaleController } from "../controllers/create-sale/create-sale-controller";

export const createSaleRoute = Router();

createSaleRoute.post("/create-sale", async (request, response) => {
  await new CreateSaleController().execute(request, response);
});
