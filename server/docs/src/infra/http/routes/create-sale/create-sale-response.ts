import { type Response, type Responses } from "swagger-jsdoc";

const httpResponseToCreatedResource: Response = {
  description: "Resposta HTTP para uma nova venda criada",
  content: {
    "application/json": {
      example: {
        id: "8ee75a99-87c3-4023-9b3a-f456c85d12af",
        name: "Produtos de limpeza",
        status: "Pendente",
        products:
          "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
        created_at: "2025-04-22T10:14:33.687Z",
      },
    },
  },
};

const httpResponseToClientError: Response = {
  description: "Resposta HTTP para erro ao criar uma venda",
  content: {
    "application/json": {
      examples: {
        aSaleWithThatNameAlreadyExists: {
          summary: "Uma venda com esse nome já existe",
          value: {
            statusCode: 400,
            message: "Uma venda com esse nome já existe",
            error: "Bad request",
          },
        },

        theFieldNameShouldNotBeEmpty: {
          summary: "O campo nome não deve estar vazio",
          value: {
            statusCode: 400,
            message: "The field name should not be empty",
            error: "Bad request",
          },
        },

        theFieldNameShouldBeGreaterThan6Characters: {
          summary: "O campo nome deve ser maior que 6 caracteres",
          value: {
            statusCode: 400,
            message: "The field name should be greater than 6 characters",
            error: "Bad request",
          },
        },

        theFieldNameShouldBeLessThan150Characters: {
          summary: "O campo nome deve ser menor que 150 caracteres",
          value: {
            statusCode: 400,
            message: "The field name should be less than 150 characters",
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
              "The properties: name, status and products, should be provided in the request body",
            error: "Bad request",
          },
        },
      },
    },
  },
};

export const createSaleResponse: Responses = {
  201: httpResponseToCreatedResource,

  400: httpResponseToClientError,
};
