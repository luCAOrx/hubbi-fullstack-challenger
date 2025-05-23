import { type Response, type Responses } from "swagger-jsdoc";

const httpResponseToSuccessRequest: Response = {
  description: "Resposta HTTP ao listar produtos",
  content: {
    "application/json": {
      example: {
        page: 1,
        perPage: 10,
        pages: 5,
        totalProducts: 41,
        data: [
          {
            id: "e801cb7a-c717-4236-9417-abf6d7b84ed4",
            name: "Cozinheiro de madeira",
          },
          {
            id: "17ca19c0-9d3a-4c52-b66a-4d5218b41616",
            name: "Lâmpada de mesa",
          },
          {
            id: "39064bfb-f819-4e8a-ad38-8ad10ed81799",
            name: "Mesa de centro",
          },
          {
            id: "5f55f9e8-8404-4c10-beee-dd2a0f2a36fa",
            name: "Armário de madeira",
          },
          { id: "450e8a75-f20e-45e7-8251-43967f9b1cf9", name: "Praia de sofá" },
          {
            id: "0b24bd8b-a2f1-4190-aecf-66e877616f51",
            name: "Cama de madeira",
          },
          { id: "1505098e-7325-46c8-9ded-c26dfff7698f", name: "Sofá de couro" },
          {
            id: "3fb70a98-786e-4f23-96c7-18a06e393e77",
            name: "Máquina de fazer panquecas",
          },
          {
            id: "b7e3cc2e-c09b-4a5d-945d-33f007f64265",
            name: "Cortina de cortinagem",
          },
          {
            id: "223fce3b-1cdc-4d2d-9e93-3f14a1150c35",
            name: "Pratilheira de vidro",
          },
        ],
      },
    },
  },
};

const httpBadRequestResponse: Response = {
  description:
    "Respostas HTTP para listar produtos sem o parametro de consulta 'page' ",
  content: {
    "application/json": {
      examples: {
        theQueryParametersShouldBeProvidedInTheRequestBody: {
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

export const getProductsResponse: Responses = {
  200: httpResponseToSuccessRequest,

  400: httpBadRequestResponse,
};
