import { type Response, type Responses } from "swagger-jsdoc";

const httpResponseToSuccessRequest: Response = {
  description:
    "Resposta HTTP ao buscar produto ou produtos de uma determinada compra",
  content: {
    "application/json": {
      example: {
        data: [
          {
            purchaseSaleProductId: "2be8515f-72e5-446e-90fa-b3715fbaaf39",
            productName: "Bolo de chocolate",
            saleName: "Doces A",
          },
          {
            purchaseSaleProductId: "9f57e86a-3d36-4b03-877a-d4ac6bae90f9",
            productName: "Arroz integral",
            saleName: "Doces A",
          },
          {
            purchaseSaleProductId: "6b22d845-f125-42a3-9750-1a4d2c729238",
            productName: "Feijão preto",
            saleName: "Doces A",
          },
          {
            purchaseSaleProductId: "19f57237-656e-4b8c-b9fc-9abacf11aa2e",
            productName: "Açaí com granola",
            saleName: "Doces A",
          },
          {
            purchaseSaleProductId: "1729efa0-0e6e-4fdb-a5d1-2b2670f8d1d1",
            productName: "Pão de queijo",
            saleName: "Doces A",
          },
          {
            purchaseSaleProductId: "743a96b7-186a-490a-8988-5805982b052a",
            productName: "Torta de frutas",
            saleName: "Doces A",
          },
          {
            purchaseSaleProductId: "6f4b8f7f-10c0-4666-a6be-566163405ee2",
            productName: "Creme de leite",
            saleName: "Doces A",
          },
          {
            purchaseSaleProductId: "8d52440f-a9c8-4e54-8961-cb9cfafda165",
            productName: "Leite condensado",
            saleName: "Doces A",
          },
          {
            purchaseSaleProductId: "e0dd2513-83e8-4ac9-9f2d-572240c5628c",
            productName: "Manteiga de amendoim",
            saleName: "Doces A",
          },
          {
            purchaseSaleProductId: "c03fa51c-5b3e-42af-a9fa-58bae2edcda0",
            productName: "Coco ralado",
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
