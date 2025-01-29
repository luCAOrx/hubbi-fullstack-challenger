import { randomUUID } from "node:crypto";

import { prisma } from "@infra/http/libs/prisma-client";
import { Prisma } from "@prisma/client";

// Define the products data
const productsData: Prisma.ProductCreateInput[] = [
  // Food products
  {
    id: randomUUID(),
    name: "Bolo de chocolate",
  },
  { id: randomUUID(), name: "Arroz integral" },
  { id: randomUUID(), name: "Feijão preto" },
  { id: randomUUID(), name: "Açaí com granola" },
  { id: randomUUID(), name: "Pão de queijo" },
  { id: randomUUID(), name: "Torta de frutas" },
  { id: randomUUID(), name: "Creme de leite" },
  { id: randomUUID(), name: "Leite condensado" },
  { id: randomUUID(), name: "Manteiga de amendoim" },
  { id: randomUUID(), name: "Coco ralado" },

  // Toiletries products
  { id: randomUUID(), name: "Sabonete de limão" },
  { id: randomUUID(), name: "Shampoo de coco" },
  { id: randomUUID(), name: "Condizente para cabelo" },
  { id: randomUUID(), name: "Loção de barbear" },
  { id: randomUUID(), name: "Desodorante" },
  { id: randomUUID(), name: "Laca de unhas" },
  { id: randomUUID(), name: "Creme hidratante para pele" },
  { id: randomUUID(), name: "Kit de higiene bucal" },
  { id: randomUUID(), name: "Máscara para olhos" },

  // Cleaning products
  { id: randomUUID(), name: "Sabão líquido" },
  { id: randomUUID(), name: "Detergente em pó" },
  { id: randomUUID(), name: "Lavagem de louça" },
  { id: randomUUID(), name: "Limpeza de superfícies" },
  { id: randomUUID(), name: "Desodorizante" },
  { id: randomUUID(), name: "Pano de limpar" },
  { id: randomUUID(), name: "Escova de chão" },
  { id: randomUUID(), name: "Máscara para armário" },

  // Household utensils
  { id: randomUUID(), name: "Prato de vidro" },
  { id: randomUUID(), name: "Tigela de papel" },
  { id: randomUUID(), name: "Colher de madeira" },
  { id: randomUUID(), name: "Fork de plástico" },
  { id: randomUUID(), name: "Lâmpada de mesa" },
  { id: randomUUID(), name: "Cortina de cortinagem" },
  { id: randomUUID(), name: "Máquina de fazer panquecas" },

  // Furniture
  { id: randomUUID(), name: "Sofá de couro" },
  { id: randomUUID(), name: "Cama de madeira" },
  { id: randomUUID(), name: "Praia de sofá" },
  { id: randomUUID(), name: "Armário de madeira" },
  { id: randomUUID(), name: "Mesa de centro" },
  { id: randomUUID(), name: "Lâmpada de mesa" },
  { id: randomUUID(), name: "Cozinheiro de madeira" },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const productData of productsData) {
    const product = await prisma.product.create({
      data: productData,
    });
    console.log(`Created product with id: ${product.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
