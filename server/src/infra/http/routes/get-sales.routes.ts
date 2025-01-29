import { Router } from "express";

import { GetSalesController } from "../controllers/get-sales/get-sales-controller";

export const getSalesRoute = Router();

getSalesRoute.get("/get-sales", async (request, response) => {
  await new GetSalesController().execute(request, response);
});
