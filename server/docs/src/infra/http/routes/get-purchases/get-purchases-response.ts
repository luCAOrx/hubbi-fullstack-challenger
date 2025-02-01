import { type Response, type Responses } from "swagger-jsdoc";

const httpResponseToSuccessRequest: Response = {
  description: "Resposta HTTP ao listar compras",
  content: {
    "application/json": {
      example: {
        page: 1,
        perPage: 10,
        pages: 0,
        totalPurchases: 0,
        data: [],
      },
    },
  },
};

const httpBadRequestResponse: Response = {
  description:
    "Respostas HTTP para listar compras sem o parametro de consulta 'page' ",
  content: {
    "application/json": {
      examples: {
        theQueryParametersShouldBeProvidedInTheRequestBody: {
          summary:
            "The query parameters should be provided in the query params",
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

export const getPurchasesResponse: Responses = {
  200: httpResponseToSuccessRequest,

  400: httpBadRequestResponse,
};
