import { Router } from "express";

import { GetProductsController } from "../controllers/get-products/get-products-controller";

export const getProductsRoute = Router();

getProductsRoute.get("/get-products", async (request, response) => {
  await new GetProductsController().execute(request, response);
});
