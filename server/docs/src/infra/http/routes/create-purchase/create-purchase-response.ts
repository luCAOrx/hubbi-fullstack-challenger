import { type Response, type Responses } from "swagger-jsdoc";

const httpResponseToCreatedResource: Response = {
  description: "Resposta HTTP para uma nova compra criada",
  content: {
    "application/json": {
      example: {
        purchase: {
          id: "172d0289-6d10-4114-a506-a29d49e20ee7",
          saleId: "584d84c6-673a-4e09-9513-9e47adcbd30a",
          products:
            "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
          created_at: "2025-01-29T04:16:53.128Z",
        },
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
