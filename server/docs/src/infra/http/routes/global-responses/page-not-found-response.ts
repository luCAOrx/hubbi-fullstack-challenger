import { Responses, type Response } from "swagger-jsdoc";

const httpResponseToPageNotFound: Response = {
  description: "Resposta HTTP para página não encontrada",
  content: {
    "application/json": {
      example: {
        statusCode: 404,
        message: "Page not found",
        error: "Not Found",
      },
    },
  },
};

export const pageNotFoundResponse: Responses = {
  400: httpResponseToPageNotFound,
};
