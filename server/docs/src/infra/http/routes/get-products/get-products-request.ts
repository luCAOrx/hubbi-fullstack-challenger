import { type Operation } from "swagger-jsdoc";

import { getProductsResponse } from "./get-products-response";

export const getProductsRequest: Operation = {
  tags: ["Produto"],
  summary: "Listar produtos",
  description: "Essa rota vai listar todos produtos",
  parameters: [
    {
      in: "query",
      name: "page",
      required: true,
      schema: {
        $ref: "#/components/schemas/GetProductsQueryParams",
      },
      example: "1",
    },
  ],
  responses: getProductsResponse,
};
