import { type Operation } from "swagger-jsdoc";

import { getPurchaseSaleProductByPurchaseIdResponse } from "./get-purchase-sale-product-by-purchase-id-response";

export const getPurhcaseSaleProductByPurchaseIdRequest: Operation = {
  tags: ["Compra"],
  summary: "Buscar produto ou produtos comprados de uma determinada compra",
  description:
    "Essa rota vai buscar um ou mais produtos comprados de uma determinada compra",
  parameters: [
    {
      in: "path",
      name: "purchaseId",
      required: true,
      schema: {
        $ref: "#/components/schemas/GetPurchaseSaleProductByPurchaseIdRouteParams",
      },
      example: "a0b2feb6-3d2b-4810-9841-054fc6e16fb4",
    },
  ],
  responses: getPurchaseSaleProductByPurchaseIdResponse,
};
