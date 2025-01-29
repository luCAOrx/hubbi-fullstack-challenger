import { type Operation } from "swagger-jsdoc";

import { pageNotFoundResponse } from "./page-not-found-response";

export const pageNotFoundRequest: Operation = {
  tags: ["Erros Globais"],
  summary: "Busca por uma rota inexistente",
  description: "Essa rota vai retornar um HTTP status 404",
  responses: pageNotFoundResponse,
};
