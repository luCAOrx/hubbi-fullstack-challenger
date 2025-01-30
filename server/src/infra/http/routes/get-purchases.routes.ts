import { Router } from "express";

import { GetPurchasesController } from "../controllers/get-purchases/get-purchases-controller";

export const getPurchasesRoute = Router();

getPurchasesRoute.get("/get-purchases", async (request, response) => {
  await new GetPurchasesController().execute(request, response);
});
