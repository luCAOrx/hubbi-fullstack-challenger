import "express-async-errors";

import cors from "cors";
import express from "express";
import { serve, setup } from "swagger-ui-express";

import { swaggerSpec } from "@doc/swagger";

import { pageNotFoundError } from "./errors/page-not-found/page-not-found-error";
import { createSaleRoute } from "./routes/create-sale.routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/api-docs",
  serve,
  setup(swaggerSpec, {
    customSiteTitle: "Desafio Full-Stack NodeJS & ReactJS",
    swaggerUrl: String(process.env.DOCUMENTATION_SERVER_URL),
  }),
);

app.use(createSaleRoute);
app.all("*", pageNotFoundError);
