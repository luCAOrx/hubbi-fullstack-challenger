import swaggerJSDoc, { type OAS3Options } from "swagger-jsdoc";

import { swaggerComponents } from "./swagger-components";
import { swaggerPaths } from "./swagger-paths";

const swaggerOptions: OAS3Options = {
  apis: ["./routes/*.ts"],
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Desafio Full-Stack NodeJS & ReactJS",
      description: "API para gerenciar e acompanhar vendas,compras e produtos",
      contact: {
        name: "Lucas Cunha",
        email: "lucas.cunha@disroot.org",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: String(process.env.DOCUMENTATION_SERVER_URL),
        description: "API de teste",
      },
    ],
    tags: [
      {
        name: "Vendas",
        description: "Rotas para gerenciar vendas.",
      },
    ],
    paths: swaggerPaths,
    components: swaggerComponents,
  },
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
