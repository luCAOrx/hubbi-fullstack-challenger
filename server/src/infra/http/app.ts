import "express-async-errors";

import cors from "cors";
import express from "express";
import { serve, setup } from "swagger-ui-express";

import { swaggerSpec } from "@doc/swagger";

import { pageNotFoundError } from "./errors/page-not-found/page-not-found-error";
import { createPurchaseRoute } from "./routes/create-purchase.routes";
import { createSaleRoute } from "./routes/create-sale.routes";
import { getProductsRoute } from "./routes/get-products.routes";
import { getPurchaseSaleProductByPurchaseIdRoute } from "./routes/get-purchase-sale-product-by-purchase-id.routes";
import { getPurchasesRoute } from "./routes/get-purchases.routes";
import { getSaleProductByIdRoute } from "./routes/get-sale-product-by-id.routes";
import { getSalesRoute } from "./routes/get-sales.routes";

export const app = express();

app.use(cors({ origin: [`${process.env.SERVER_URL}`] }));
app.use(express.json());
app.use(
  "/api-docs",
  serve,
  setup(swaggerSpec, {
    customSiteTitle: "Desafio Full-Stack NodeJS & ReactJS",
    swaggerUrl: String(process.env.SERVER_URL),
  }),
);

app.use(createSaleRoute);
app.use(getSalesRoute);
app.use(getSaleProductByIdRoute);
app.use(createPurchaseRoute);
app.use(getPurchasesRoute);
app.use(getProductsRoute);
app.use(getPurchaseSaleProductByPurchaseIdRoute);
app.all("*", pageNotFoundError);
