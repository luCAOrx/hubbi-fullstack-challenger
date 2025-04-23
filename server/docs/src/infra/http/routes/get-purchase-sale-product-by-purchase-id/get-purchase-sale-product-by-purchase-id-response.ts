import { type Response, type Responses } from "swagger-jsdoc";

const httpResponseToSuccessRequest: Response = {
  description:
    "Resposta HTTP ao buscar um produto da compra de uma determinada venda",
  content: {
    "application/json": {
      example: {
        data: [
          {
            purchaseSaleProductId: "6f36f6ad-0924-4260-b656-831f242a94d6",
            productName: "Açaí com granola",
            saleName: "Doces A",
          },
          {
            purchaseSaleProductId: "809f4147-5e12-4256-8974-95069be620d1",
            productName: "Pão de queijo",
            saleName: "Doces A",
          },
          {
            purchaseSaleProductId: "7ab0df4f-d7f9-43d1-b39b-278e22071aa8",
            productName: "Torta de frutas",
            saleName: "Doces A",
          },
        ],
      },
    },
  },
};

const httpResponseToClientError: Response = {
  description: "Resposta HTTP para erro ao buscar uma compra",
  content: {
    "application/json": {
      examples: {
        purchaseNotFoundError: {
          summary: "Compra não encontrada",
          value: {
            statusCode: 400,
            message: "Compra não encontrada",
            error: "Bad request",
          },
        },
      },
    },
  },
};

export const getPurchaseSaleProductByPurchaseIdResponse: Responses = {
  200: httpResponseToSuccessRequest,

  400: httpResponseToClientError,
};
