import { type Operation } from "swagger-jsdoc";

import { createPurchaseResponse } from "./create-purchase-response";

export const createPurchaseRequest: Operation = {
  tags: ["Compra"],
  summary: "Cria uma nova compra",
  description:
    "Essa rota vai retornar um criar uma nova compra ou retornar um erro",
  parameters: [
    {
      in: "path",
      name: "saleId",
      required: true,
      schema: {
        $ref: "#/components/schemas/CreatePurchaseRouteParams",
      },
      example: "04deb5b7-8fe0-4885-9dac-ac2683d89e75",
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/CreatePurchaseRequestBody",
        },
        example: {
          saleProductId:
            "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
        },
      },
    },
  },
  responses: createPurchaseResponse,
};
