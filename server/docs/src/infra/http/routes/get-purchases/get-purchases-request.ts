import { type Operation } from "swagger-jsdoc";

import { getPurchasesResponse } from "./get-purchases-response";

export const getPurchasesRequest: Operation = {
  tags: ["Compra"],
  summary: "Listar compras",
  description: "Essa rota vai listar 10 compras por página",
  parameters: [
    {
      in: "query",
      name: "page",
      required: true,
      schema: {
        $ref: "#/components/schemas/GetPurchasesQueryParams",
      },
      example: "1",
    },
  ],
  responses: getPurchasesResponse,
};
