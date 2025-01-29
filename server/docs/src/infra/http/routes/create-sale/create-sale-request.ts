import { type Operation } from "swagger-jsdoc";

import { createSaleResponse } from "./create-sale-response";

export const createSaleRequest: Operation = {
  tags: ["Venda"],
  summary: "Cria uma nova venda",
  description:
    "Essa rota vai retornar um criar uma nova venda ou retornar um erro",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/SaleRequestBody",
        },
        example: {
          name: "Produtos de limpeza",
          status: "Pendente",
          products:
            "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
        },
      },
    },
  },
  responses: createSaleResponse,
};
