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
        data: [
          {
            purchaseId: "87dda8dc-2eb3-4cda-9b86-4e4fc773c71f",
            saleName: "Doces T",
            purchase_created_at: "2025-01-30T13:02:19.038Z",
          },
          {
            purchaseId: "079a8228-c6b5-4515-9f01-7b9251cfc68a",
            saleName: "Doces T",
            purchase_created_at: "2025-01-30T13:02:19.038Z",
          },
          {
            purchaseId: "d4a1a13d-2f41-4e83-a6f8-4df6787c7754",
            saleName: "Doces T",
            purchase_created_at: "2025-01-30T13:02:19.038Z",
          },
          {
            purchaseId: "7ab67cb6-dcbc-4f8a-95a6-58b33c54418c",
            saleName: "Doces T",
            purchase_created_at: "2025-01-30T13:02:19.038Z",
          },
          {
            purchaseId: "2145f7a3-7e85-4caf-b17a-0fc7dce131c1",
            saleName: "Doces T",
            purchase_created_at: "2025-01-30T13:02:19.038Z",
          },
          {
            purchaseId: "43595dc2-a781-4d6d-bfc5-9476f42d0841",
            saleName: "Doces T",
            purchase_created_at: "2025-01-30T13:02:19.038Z",
          },
          {
            purchaseId: "960d0866-62de-41ea-a580-fd5c52c74af1",
            saleName: "Doces T",
            purchase_created_at: "2025-01-30T13:02:19.038Z",
          },
          {
            purchaseId: "aaf1a29b-2cbf-4134-a0b8-d02a083c38b9",
            saleName: "Doces T",
            purchase_created_at: "2025-01-30T13:02:19.038Z",
          },
          {
            purchaseId: "e01d17e6-2a9b-4f8b-bfad-5337e209e2cc",
            saleName: "Doces T",
            purchase_created_at: "2025-01-30T13:02:19.038Z",
          },
          {
            purchaseId: "d97d2a38-919c-4ec3-ad3c-404521de64cc",
            saleName: "Doces T",
            purchase_created_at: "2025-01-30T13:02:19.038Z",
          },
        ],
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

export const getPurchasesResponse: Responses = {
  200: httpResponseToSuccessRequest,

  400: httpBadRequestResponse,
};
