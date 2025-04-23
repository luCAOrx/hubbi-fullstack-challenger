import { type Response, type Responses } from "swagger-jsdoc";

const httpResponseToCreatedResource: Response = {
  description: "Resposta HTTP para uma nova compra criada",
  content: {
    "application/json": {
      example: {
        id: "34998f10-2613-4220-b20d-a31fafae211e",
        saleId: "212508dd-8b45-4a5a-8e6f-ee976e85f87a",
        created_at: "2025-04-22T10:12:52.063Z",
      },
    },
  },
};

const httpResponseToClientError: Response = {
  description: "Resposta HTTP para erro ao criar uma compra",
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

        theFieldProductsShouldNotBeEmpty: {
          summary: "O campo produtos não deve estar vazio",
          value: {
            statusCode: 400,
            message: "The field products should not be empty",
            error: "Bad request",
          },
        },

        thePropertiesShouldBeProvidedInTheRequestBody: {
          summary:
            "As propriedades devem ser fornecidas no corpo de solicitação",
          value: {
            statusCode: 400,
            message:
              "The property products should be provided in the request body",
            error: "Bad request",
          },
        },
      },
    },
  },
};

export const createPurchaseResponse: Responses = {
  201: httpResponseToCreatedResource,

  400: httpResponseToClientError,
};
