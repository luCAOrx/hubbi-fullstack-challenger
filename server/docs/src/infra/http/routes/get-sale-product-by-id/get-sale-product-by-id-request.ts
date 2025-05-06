import { type Operation } from "swagger-jsdoc";

import { getSaleProductByIdResponse } from "./get-sale-product-by-id-response";

export const getSaleProductByIdRequest: Operation = {
  tags: ["Venda"],
  summary: "Buscar produto ou produtos de uma determinada venda",
  description:
    "Essa rota vai buscar um ou mais produtos de uma determinada venda",
  parameters: [
    {
      in: "path",
      name: "saleId",
      required: true,
      schema: {
        $ref: "#/components/schemas/GetSaleProductByIdRouteParams",
      },
      example: "a0b2feb6-3d2b-4810-9841-054fc6e16fb4",
    },
    {
      in: "query",
      name: "page",
      required: true,
      schema: {
        $ref: "#/components/schemas/GetSaleProductByIdQueryParams",
      },
      example: "1",
    },
  ],
  responses: getSaleProductByIdResponse,
};
