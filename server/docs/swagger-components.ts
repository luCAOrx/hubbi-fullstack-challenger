import { type Components } from "swagger-jsdoc";

export const swaggerComponents: Components = {
  schemas: {
    Sale: {
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        name: {
          type: "string",
        },
        status: {
          type: "string",
          format: "Pendente || Finalizada",
        },
        products: {
          type: "string",
        },
        created_at: {
          type: "string",
          format: "date",
        },
      },
    },

    SaleRequestBody: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        status: {
          type: "string",
          format: "Pendente || Finalizada",
        },
        products: {
          type: "string",
        },
      },
    },

    PurchaseRequestBody: {
      type: "object",
      properties: {
        products: {
          type: "string",
        },
      },
    },

    PurchaseRouteParams: {
      type: "string",
      properties: {
        saleId: {
          type: "string",
          format: "uuid",
        },
      },
    },

    SaleRouteQueryParams: {
      type: "number",
      properties: {
        page: {
          type: "number",
        },
      },
    },

    SaleHttpError: {
      type: "object",
      properties: {
        statusCode: {
          type: "number",
        },
        message: {
          type: "string",
        },
        error: {
          type: "string",
        },
      },
    },
  },
};
