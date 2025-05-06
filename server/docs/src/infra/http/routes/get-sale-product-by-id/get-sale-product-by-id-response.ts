import { type Response, type Responses } from "swagger-jsdoc";

const httpResponseToSuccessRequest: Response = {
  description:
    "Resposta HTTP ao buscar um ou mais produtos de uma determinada venda",
  content: {
    "application/json": {
      example: {
        page: 1,
        data: [
          {
            saleProductId: "0f012517-a0de-4c31-b4d4-ca0baaa6059d",
            productName: "Bolo de chocolate",
          },
          {
            saleProductId: "0fef66c9-4d53-4428-a26d-dcd4940575f3",
            productName: "Arroz integral",
          },
          {
            saleProductId: "ed6cb5ba-0773-4bff-a292-1de641fe40a5",
            productName: "Feijão preto",
          },
          {
            saleProductId: "1bac4372-6dcf-4ed4-8345-a969585a1f43",
            productName: "Açaí com granola",
          },
          {
            saleProductId: "9fe49be1-1a3e-4b6c-b0e8-d716f5d238e6",
            productName: "Pão de queijo",
          },
          {
            saleProductId: "e3aaf57f-6149-485c-b358-0e7ff86c5ad4",
            productName: "Torta de frutas",
          },
          {
            saleProductId: "ea04f1c1-d7c0-40dd-83a7-fa98ae5ddabf",
            productName: "Creme de leite",
          },
          {
            saleProductId: "bd9fdac3-2eb3-4da3-a1e6-503d392ef1d1",
            productName: "Leite condensado",
          },
          {
            saleProductId: "cb82f779-e1d9-4939-a9d0-a477da3bc4ce",
            productName: "Manteiga de amendoim",
          },
          {
            saleProductId: "61810662-1517-46ca-b6e4-a869c6029291",
            productName: "Coco ralado",
          },
        ],
      },
    },
  },
};

const httpResponseToClientError: Response = {
  description: "Resposta HTTP para erro ao buscar um produto da venda",
  content: {
    "application/json": {
      examples: {
        saleNotFoundError: {
          summary: "Venda não encontrada",
          value: {
            statusCode: 400,
            message: "Venda não encontrada",
            error: "Bad request",
          },
        },

        theQueryParametersShouldBeProvidedInTheQueryParams: {
          summary:
            "Os parâmetros de busca devem ser fornecidos no parâmetro de busca da requisição",
          value: {
            statusCode: 400,
            message:
              "The query parameters: page must be provided in the query parameters of the request",
            error: "Bad request",
          },
        },
      },
    },
  },
};

export const getSaleProductByIdResponse: Responses = {
  200: httpResponseToSuccessRequest,

  400: httpResponseToClientError,
};
