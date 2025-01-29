import { type Response, type Responses } from "swagger-jsdoc";

const httpResponseToSuccessRequest: Response = {
  description: "Resposta HTTP ao listar vendas",
  content: {
    "application/json": {
      example: {
        saleOrSales: [
          {
            id: "1f714ab8-5267-4a74-9275-1bd8a3fd86f7",
            name: "Produtos de limpeza",
            status: "Pendente",
            products:
              "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
            created_at: "2025-01-29T13:00:26.562Z",
          },
          {
            id: "383ab9eb-603e-4037-9e4a-aba05a8d9764",
            name: "Doces T",
            status: "Pendente",
            products:
              "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
            created_at: "2025-01-29T13:00:26.562Z",
          },
          {
            id: "279532b4-f398-4590-815c-072132b0e709",
            name: "Doces S",
            status: "Pendente",
            products:
              "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
            created_at: "2025-01-29T13:00:26.562Z",
          },
          {
            id: "ba081555-4208-4a30-84d5-f7bafbe42cd3",
            name: "Doces R",
            status: "Pendente",
            products:
              "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
            created_at: "2025-01-29T13:00:26.562Z",
          },
          {
            id: "4fedd4e2-3689-4bbd-b536-3fbce5161ea0",
            name: "Doces Q",
            status: "Pendente",
            products:
              "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
            created_at: "2025-01-29T13:00:26.562Z",
          },
          {
            id: "8133360f-0354-4f18-b375-5f2bd23dbbd3",
            name: "Doces P",
            status: "Pendente",
            products:
              "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
            created_at: "2025-01-29T13:00:26.562Z",
          },
          {
            id: "80fafc35-4e2b-4096-a513-6fa59d03e14a",
            name: "Doces O",
            status: "Pendente",
            products:
              "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
            created_at: "2025-01-29T13:00:26.562Z",
          },
          {
            id: "fd593b91-c377-4a81-9552-b0694f91e2b0",
            name: "Doces N",
            status: "Pendente",
            products:
              "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
            created_at: "2025-01-29T13:00:26.562Z",
          },
          {
            id: "c5c6ec1d-27bf-4618-9106-ca67b2277c44",
            name: "Doces M",
            status: "Pendente",
            products:
              "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
            created_at: "2025-01-29T13:00:26.562Z",
          },
          {
            id: "e62ba49d-55d9-48fc-9565-ed9cd9877605",
            name: "Doces L",
            status: "Pendente",
            products:
              "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f,1831c265-4d88-4184-bd8b-82b87c6458f7,4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
            created_at: "2025-01-29T13:00:26.562Z",
          },
        ],
      },
    },
  },
};

const httpBadRequestResponse: Response = {
  description:
    "Respostas HTTP para listar vendas sem o parametro de consulta 'page' ",
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

export const getSalesResponse: Responses = {
  200: httpResponseToSuccessRequest,

  400: httpBadRequestResponse,
};
