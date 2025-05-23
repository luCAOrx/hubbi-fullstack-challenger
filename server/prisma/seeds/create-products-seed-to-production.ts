import { Product } from "@domain/entities/product/product";
import { prisma } from "@infra/http/libs/prisma-client";
import { PrismaProductRepository } from "@infra/http/repositories/prisma-product-repository";

const productsData = [
  {
    name: "Bolo de chocolate",
  },
  { name: "Arroz integral" },
  { name: "Feijão preto" },
  { name: "Açaí com granola" },
  { name: "Pão de queijo" },
  { name: "Torta de frutas" },
  { name: "Creme de leite" },
  { name: "Leite condensado" },
  { name: "Manteiga de amendoim" },
  { name: "Coco ralado" },

  { name: "Sabonete de limão" },
  { name: "Shampoo de coco" },
  { name: "Condizente para cabelo" },
  { name: "Loção de barbear" },
  { name: "Desodorante" },
  { name: "Laca de unhas" },
  { name: "Creme hidratante para pele" },
  { name: "Kit de higiene bucal" },
  { name: "Máscara para olhos" },

  { name: "Sabão líquido" },
  { name: "Detergente em pó" },
  { name: "Lavagem de louça" },
  { name: "Limpeza de superfícies" },
  { name: "Desodorizante" },
  { name: "Pano de limpar" },
  { name: "Escova de chão" },
  { name: "Máscara para armário" },

  { name: "Prato de vidro" },
  { name: "Tigela de papel" },
  { name: "Colher de madeira" },
  { name: "Fork de plástico" },
  { name: "Lâmpada de mesa" },
  { name: "Cortina de cortinagem" },
  { name: "Máquina de fazer panquecas" },

  { name: "Sofá de couro" },
  { name: "Cama de madeira" },
  { name: "Praia de sofá" },
  { name: "Armário de madeira" },
  { name: "Mesa de centro" },
  { name: "Lâmpada de mesa" },
  { name: "Cozinheiro de madeira" },
];

async function main() {
  process.stdout.write(`Start seeding ...\n`);
  for (const productData of productsData) {
    const productEntity = Product.create(
      {
        name: productData.name,
      },
      {},
    );

    const prismaProductRepository = new PrismaProductRepository();

    await prismaProductRepository.transactionCreateProductWithProductProductAndProductCounter(
      productEntity,
    );
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
