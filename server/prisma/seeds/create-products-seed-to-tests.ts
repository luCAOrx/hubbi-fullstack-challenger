import { Product } from "@domain/entities/product/product";
import { prisma } from "@infra/http/libs/prisma-client";
import { PrismaProductRepository } from "@infra/http/repositories/prisma-product-repository";
import { Prisma } from "@prisma/client";

const productsData: Prisma.ProductCreateInput[] = [
  {
    id: "036de3a9-4b89-4578-b72a-6a99efb8c634",
    name: "Bolo de chocolate",
  },
  {
    id: "2632524b-72ee-4650-8741-a93d97f325b8",
    name: "Arroz integral",
  },
  { id: "584d84c6-673a-4e09-9513-9e47adcbd30a", name: "Feijão preto" },
  {
    id: "25255125-a94f-47cf-85d9-e7717badb661",
    name: "Açaí com granola",
  },
  { id: "0c81db75-3c03-4220-8fdc-76d532e4b1b2", name: "Pão de queijo" },
  {
    id: "cc5a9e1b-c5ab-450d-b9bd-1be0899f36a5",
    name: "Torta de frutas",
  },
  {
    id: "ddf9a0e3-e839-43b3-ac29-4ac212615097",
    name: "Creme de leite",
  },
  {
    id: "fb4db0ae-08e9-44c1-a809-9ad54d1930dc",
    name: "Leite condensado",
  },
  {
    id: "da45c44b-69f8-4314-be15-43a1bc3d8aab",
    name: "Manteiga de amendoim",
  },
  { id: "8e3a1846-c413-4371-9697-65e1dd5a83b6", name: "Coco ralado" },
  {
    id: "8d9c2baf-c762-4654-b28a-19cb9ebb3ed8",
    name: "Sabonete de limão",
  },
  {
    id: "1468a93e-a786-4417-9d1f-4c33ecec2c9b",
    name: "Shampoo de coco",
  },
  {
    id: "4cf9673c-eb2d-4f24-98b7-f5e7f1c0efd0",
    name: "Condizente para cabelo",
  },
  {
    id: "d6a74dab-828e-424c-a582-4ddc14a74406",
    name: "Loção de barbear",
  },
  { id: "76739c72-5956-4fb0-b8b5-42c4f6882a71", name: "Desodorante" },
  { id: "5895b86e-e54d-4326-aba6-4ead8873428a", name: "Laca de unhas" },
  {
    id: "48419db1-d749-43ea-801a-944478272612",
    name: "Creme hidratante para pele",
  },
  {
    id: "f93ccd61-3395-436b-9862-426b5cd242d9",
    name: "Kit de higiene bucal",
  },
  {
    id: "b4a1df0d-c0d7-4d5e-b07e-f28bcafc4ba1",
    name: "Máscara para olhos",
  },
  { id: "9f285452-c3a3-478c-a0b6-675731c1f412", name: "Sabão líquido" },
  {
    id: "c13992d2-a04b-44ae-8f70-fad28e78f55d",
    name: "Detergente em pó",
  },
  {
    id: "d2ef3c85-a5ed-4fcb-bc50-22e04e3dd43f",
    name: "Lavagem de louça",
  },
  {
    id: "88a4f876-ae8c-40e6-8d5e-6bfd48617188",
    name: "Limpeza de superfícies",
  },
  { id: "56956a9f-3f1d-4eed-95fe-9260c69923ec", name: "Desodorizante" },
  {
    id: "1831c265-4d88-4184-bd8b-82b87c6458f7",
    name: "Pano de limpar",
  },
  {
    id: "4ceeeda9-e10e-4453-9874-e70fb27bb1b8",
    name: "Escova de chão",
  },
  {
    id: "e494c3c3-7d7c-425d-a8c1-1adf63697e29",
    name: "Máscara para armário",
  },
  {
    id: "6c71d1bd-9ac7-4c0d-a29b-3ed1a74b8e1f",
    name: "Prato de vidro",
  },
  {
    id: "bf8ab390-a09b-480f-b9b9-74922015ce1c",
    name: "Tigela de papel",
  },
  {
    id: "0effae7e-43f1-45de-b300-790771dea47a",
    name: "Colher de madeira",
  },
  {
    id: "bfecec03-9cb5-4789-b599-c51c87aefed8",
    name: "Fork de plástico",
  },
  {
    id: "223fce3b-1cdc-4d2d-9e93-3f14a1150c35",
    name: "Pratilheira de vidro",
  },
  {
    id: "b7e3cc2e-c09b-4a5d-945d-33f007f64265",
    name: "Cortina de cortinagem",
  },
  {
    id: "3fb70a98-786e-4f23-96c7-18a06e393e77",
    name: "Máquina de fazer panquecas",
  },
  { id: "1505098e-7325-46c8-9ded-c26dfff7698f", name: "Sofá de couro" },
  {
    id: "0b24bd8b-a2f1-4190-aecf-66e877616f51",
    name: "Cama de madeira",
  },
  { id: "450e8a75-f20e-45e7-8251-43967f9b1cf9", name: "Praia de sofá" },
  {
    id: "5f55f9e8-8404-4c10-beee-dd2a0f2a36fa",
    name: "Armário de madeira",
  },
  {
    id: "39064bfb-f819-4e8a-ad38-8ad10ed81799",
    name: "Mesa de centro",
  },
  {
    id: "17ca19c0-9d3a-4c52-b66a-4d5218b41616",
    name: "Lâmpada de mesa",
  },
  {
    id: "e801cb7a-c717-4236-9417-abf6d7b84ed4",
    name: "Cozinheiro de madeira",
  },
];
async function main() {
  process.stdout.write(`Start seeding ...`);
  for (const productData of productsData) {
    const productEntity = Product.create(
      {
        name: productData.name,
      },
      { _id: productData.id },
    );

    const prismaProductRepository = new PrismaProductRepository();

    const product =
      await prismaProductRepository.transactionCreateProductWithProductProductAndProductCounter(
        productEntity,
      );
    process.stdout.write(`Created product with id: ${product.id}`);
  }
  process.stdout.write(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    process.stdout.write(error);
    await prisma.$disconnect();
    process.exit(1);
  });
