import { type Operation } from "swagger-jsdoc";

import { getSalesResponse } from "./get-sales-response";

export const getSalesRequest: Operation = {
  tags: ["Venda"],
  summary: "Listar vendas",
  description: "Essa rota vai listar 10 vendas por página",
  parameters: [
    {
      in: "query",
      name: "page",
      required: true,
      schema: {
        $ref: "#/components/schemas/GetSalesQueryParams",
      },
      example: "1",
    },
  ],
  responses: getSalesResponse,
};
