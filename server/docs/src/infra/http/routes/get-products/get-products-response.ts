import { type Response, type Responses } from "swagger-jsdoc";

const httpResponseToSuccessRequest: Response = {
  description: "Resposta HTTP ao listar produtos",
  content: {
    "application/json": {
      example: {
        productOrProducts: [
          {
            id: "d242f0f2-92e2-45df-b45f-661b985140c7",
            name: "Bolo de chocolate",
            created_at: "2025-02-01T11:11:13.148Z",
          },
          {
            id: "f38dd603-e450-4372-8bec-4a8ca02bdeca",
            name: "Arroz integral",
            created_at: "2025-02-01T11:11:13.166Z",
          },
          {
            id: "164679fb-81c1-4f58-a1d1-e295294d3aab",
            name: "Feijão preto",
            created_at: "2025-02-01T11:11:13.174Z",
          },
          {
            id: "d85c0cd7-f1bf-40ac-8065-3696d86e274d",
            name: "Açaí com granola",
            created_at: "2025-02-01T11:11:13.182Z",
          },
          {
            id: "f4fba40c-87a9-4beb-91ef-31300c6688c4",
            name: "Pão de queijo",
            created_at: "2025-02-01T11:11:13.190Z",
          },
          {
            id: "0ed4fd4a-cd67-47b8-bec2-0d4700435e3f",
            name: "Torta de frutas",
            created_at: "2025-02-01T11:11:13.200Z",
          },
          {
            id: "6ee7b44d-236d-4857-8578-c194f27cb272",
            name: "Creme de leite",
            created_at: "2025-02-01T11:11:13.207Z",
          },
          {
            id: "0c37bcf8-c839-42d2-a5f8-b578abc06775",
            name: "Leite condensado",
            created_at: "2025-02-01T11:11:13.216Z",
          },
          {
            id: "69f57d37-e310-494f-8c8a-969853063d3b",
            name: "Manteiga de amendoim",
            created_at: "2025-02-01T11:11:13.227Z",
          },
          {
            id: "a23a280f-9816-41a2-97fc-10d332f5500f",
            name: "Coco ralado",
            created_at: "2025-02-01T11:11:13.233Z",
          },
          {
            id: "bcd3cc64-c5c6-41b7-81dd-925a9ceb2e9a",
            name: "Sabonete de limão",
            created_at: "2025-02-01T11:11:13.240Z",
          },
          {
            id: "1157c816-5951-4c8b-8457-acfb6411e3fe",
            name: "Shampoo de coco",
            created_at: "2025-02-01T11:11:13.249Z",
          },
          {
            id: "406d3be0-cad7-488c-83a3-2c1e157fa1bb",
            name: "Condizente para cabelo",
            created_at: "2025-02-01T11:11:13.257Z",
          },
          {
            id: "7a55ceb5-442c-4ea3-8742-b94536c35469",
            name: "Loção de barbear",
            created_at: "2025-02-01T11:11:13.266Z",
          },
          {
            id: "d036d8dc-d89e-4100-bf7d-42a1fa43637a",
            name: "Desodorante",
            created_at: "2025-02-01T11:11:13.274Z",
          },
          {
            id: "bc34f73a-8261-4c77-ba45-2aa5bffe368b",
            name: "Laca de unhas",
            created_at: "2025-02-01T11:11:13.282Z",
          },
          {
            id: "bf888434-6186-4f05-b007-08dad3345d49",
            name: "Creme hidratante para pele",
            created_at: "2025-02-01T11:11:13.290Z",
          },
          {
            id: "413382af-99ed-4fdf-9ea1-470244e2a0e9",
            name: "Kit de higiene bucal",
            created_at: "2025-02-01T11:11:13.299Z",
          },
          {
            id: "9fe98459-f1c4-4b5a-b131-fc395fdf634b",
            name: "Máscara para olhos",
            created_at: "2025-02-01T11:11:13.307Z",
          },
          {
            id: "c0d33ae5-4226-495c-9430-b6f2cf4cba17",
            name: "Sabão líquido",
            created_at: "2025-02-01T11:11:13.315Z",
          },
          {
            id: "ecf6bb32-2306-41fd-bb6a-2ef4c9062030",
            name: "Detergente em pó",
            created_at: "2025-02-01T11:11:13.324Z",
          },
          {
            id: "6def0d60-3135-4827-93bc-cf69bc43c1f0",
            name: "Lavagem de louça",
            created_at: "2025-02-01T11:11:13.332Z",
          },
          {
            id: "c502fff4-56a7-4a10-97f3-1e043fe8aa8b",
            name: "Limpeza de superfícies",
            created_at: "2025-02-01T11:11:13.341Z",
          },
          {
            id: "4686627e-6db4-4cd8-967f-498710a83be0",
            name: "Desodorizante",
            created_at: "2025-02-01T11:11:13.349Z",
          },
          {
            id: "c4d1c771-d12e-45b9-916d-7ef10970b2b3",
            name: "Pano de limpar",
            created_at: "2025-02-01T11:11:13.357Z",
          },
          {
            id: "21f8ba4c-b136-4805-961f-c95b7c92ac5a",
            name: "Escova de chão",
            created_at: "2025-02-01T11:11:13.365Z",
          },
          {
            id: "2f06156f-dea4-44d5-94f0-263c78e7a95a",
            name: "Máscara para armário",
            created_at: "2025-02-01T11:11:13.374Z",
          },
          {
            id: "cfd65260-b923-4d2c-9578-7514dd767c40",
            name: "Prato de vidro",
            created_at: "2025-02-01T11:11:13.382Z",
          },
          {
            id: "bb7e3b8b-facb-4749-a690-ffd815b0c1ff",
            name: "Tigela de papel",
            created_at: "2025-02-01T11:11:13.390Z",
          },
          {
            id: "0a83d8a3-a614-4e8a-90ac-b214f487f20c",
            name: "Colher de madeira",
            created_at: "2025-02-01T11:11:13.399Z",
          },
          {
            id: "551e3b49-ff27-441b-b58e-60652913857d",
            name: "Fork de plástico",
            created_at: "2025-02-01T11:11:13.407Z",
          },
          {
            id: "9e82f441-d3f6-4c9e-bfe8-4b829ae927b4",
            name: "Lâmpada de mesa",
            created_at: "2025-02-01T11:11:13.415Z",
          },
          {
            id: "c3bddc26-0fd7-4a0e-bd38-bec7aced8317",
            name: "Cortina de cortinagem",
            created_at: "2025-02-01T11:11:13.424Z",
          },
          {
            id: "326269fc-d1b6-4075-87ba-4c5b9a7f679e",
            name: "Máquina de fazer panquecas",
            created_at: "2025-02-01T11:11:13.432Z",
          },
          {
            id: "967f902f-f829-4de2-8c43-cc6eac564390",
            name: "Sofá de couro",
            created_at: "2025-02-01T11:11:13.440Z",
          },
          {
            id: "330f01b6-cc4d-47c3-a470-466426d56bbe",
            name: "Cama de madeira",
            created_at: "2025-02-01T11:11:13.449Z",
          },
          {
            id: "93566943-060c-47fd-9691-a58aca418333",
            name: "Praia de sofá",
            created_at: "2025-02-01T11:11:13.457Z",
          },
          {
            id: "9d1c962b-2fe2-4912-b050-4ff0351c7f52",
            name: "Armário de madeira",
            created_at: "2025-02-01T11:11:13.465Z",
          },
          {
            id: "6430f0bc-bff2-47f2-b8de-1f2e9ab546d3",
            name: "Mesa de centro",
            created_at: "2025-02-01T11:11:13.474Z",
          },
          {
            id: "555a57ff-3188-4092-8f49-04bd94f0a014",
            name: "Lâmpada de mesa",
            created_at: "2025-02-01T11:11:13.482Z",
          },
          {
            id: "34eb5094-9644-4fd3-977f-d7430c824dee",
            name: "Cozinheiro de madeira",
            created_at: "2025-02-01T11:11:13.490Z",
          },
        ],
      },
    },
  },
};

const httpBadRequestResponse: Response = {
  description: "Respostas HTTP para listar produtos",
  content: {
    "application/json": {
      examples: {
        errorWhenListingProducts: {
          summary: "Erro ao listar produtos",
          value: {
            statusCode: 400,
            message: "Erro ao listar produtos",
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
