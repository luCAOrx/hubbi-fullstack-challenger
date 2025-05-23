import { type Components } from "swagger-jsdoc";

export const swaggerComponents: Components = {
  schemas: {
    CreateSaleRequestBody: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        products: {
          type: "string",
        },
      },
    },

    CreatePurchaseRequestBody: {
      type: "object",
      properties: {
        saleProductId: {
          type: "string",
        },
      },
    },

    CreatePurchaseRouteParams: {
      type: "string",
      properties: {
        saleId: {
          type: "string",
          format: "uuid",
        },
      },
    },

    GetSaleProductByIdRouteParams: {
      type: "string",
      properties: {
        saleId: {
          type: "string",
          format: "uuid",
        },
      },
    },

    GetPurchaseSaleProductByPurchaseIdQueryParams: {
      type: "number",
      properties: {
        page: {
          type: "number",
        },
      },
    },

    GetSaleProductByIdQueryParams: {
      type: "number",
      properties: {
        page: {
          type: "number",
        },
      },
    },

    GetSalesQueryParams: {
      type: "number",
      properties: {
        page: {
          type: "number",
        },
      },
    },

    GetPurchasesQueryParams: {
      type: "number",
      properties: {
        page: {
          type: "number",
        },
      },
    },

    GetPurchaseSaleProductByPurchaseIdRouteParams: {
      type: "string",
      properties: {
        purchaseId: {
          type: "string",
          format: "uuid",
        },
      },
    },

    GetProductsQueryParams: {
      type: "number",
      properties: {
        page: {
          type: "number",
        },
      },
    },

    GlobalHttpError: {
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
