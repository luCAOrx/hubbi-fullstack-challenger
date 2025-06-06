import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import { GetPurchaseSaleProductByPurchaseIdToHttpResponse } from "@infra/http/view-models/get-purchase-sale-product-by-purchase-id-view-model";
import { MakeRequestFactory } from "@test-helpers/factories/make-request-factory";
import { purchaseId } from "@test-helpers/main.e2e-spec";

export function getPurchaseSaleProductByPurchaseId(): void {
  describe("Get purchase sale product by purchaseId controller", () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    it("should be able get purchase sale product by purchaseId", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-purchase-sale-product-by-purchase-id/${purchaseId[0]}?page=1`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const { data }: GetPurchaseSaleProductByPurchaseIdToHttpResponse =
          (await response.json()) as GetPurchaseSaleProductByPurchaseIdToHttpResponse;

        deepStrictEqual(response.status, 200);

        deepStrictEqual(data[0].saleName, "Doces A");
        deepStrictEqual(data[1].saleName, "Doces A");
        deepStrictEqual(data[2].saleName, "Doces A");
        deepStrictEqual(data[3].saleName, "Doces A");
        deepStrictEqual(data[4].saleName, "Doces A");
        deepStrictEqual(data[5].saleName, "Doces A");
        deepStrictEqual(data[6].saleName, "Doces A");
        deepStrictEqual(data[7].saleName, "Doces A");
        deepStrictEqual(data[8].saleName, "Doces A");
        deepStrictEqual(data[9].saleName, "Doces A");
        deepStrictEqual(data[0].productName, "Bolo de chocolate");
        deepStrictEqual(data[1].productName, "Arroz integral");
        deepStrictEqual(data[2].productName, "Feijão preto");
        deepStrictEqual(data[3].productName, "Açaí com granola");
        deepStrictEqual(data[4].productName, "Pão de queijo");
        deepStrictEqual(data[5].productName, "Torta de frutas");
        deepStrictEqual(data[6].productName, "Creme de leite");
        deepStrictEqual(data[7].productName, "Leite condensado");
        deepStrictEqual(data[8].productName, "Manteiga de amendoim");
        deepStrictEqual(data[9].productName, "Coco ralado");

        deepStrictEqual(data.length, 10);
      });
    });

    it("should be able jump to next page on get purchase sale product by purchaseId list", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-purchase-sale-product-by-purchase-id/${purchaseId[0]}?page=2`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const { data }: GetPurchaseSaleProductByPurchaseIdToHttpResponse =
          (await response.json()) as GetPurchaseSaleProductByPurchaseIdToHttpResponse;

        deepStrictEqual(response.status, 200);

        deepStrictEqual(data[0].saleName, "Doces A");
        deepStrictEqual(data[1].saleName, "Doces A");
        deepStrictEqual(data[2].saleName, "Doces A");
        deepStrictEqual(data[3].saleName, "Doces A");
        deepStrictEqual(data[4].saleName, "Doces A");
        deepStrictEqual(data[5].saleName, "Doces A");
        deepStrictEqual(data[6].saleName, "Doces A");
        deepStrictEqual(data[7].saleName, "Doces A");
        deepStrictEqual(data[8].saleName, "Doces A");
        deepStrictEqual(data[9].saleName, "Doces A");
        deepStrictEqual(data[0].productName, "Sabonete de limão");
        deepStrictEqual(data[1].productName, "Shampoo de coco");
        deepStrictEqual(data[2].productName, "Condizente para cabelo");
        deepStrictEqual(data[3].productName, "Loção de barbear");
        deepStrictEqual(data[4].productName, "Desodorante");
        deepStrictEqual(data[5].productName, "Laca de unhas");
        deepStrictEqual(data[6].productName, "Creme hidratante para pele");
        deepStrictEqual(data[7].productName, "Kit de higiene bucal");
        deepStrictEqual(data[8].productName, "Máscara para olhos");
        deepStrictEqual(data[9].productName, "Sabão líquido");

        deepStrictEqual(data.length, 10);
      });
    });

    it("should not be able get purchase sale product with purchase inexistent", async () => {
      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/get-purchase-sale-product-by-purchase-id/1234?page=1`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const purchaseSaleProductResponse = await response.json();

        deepStrictEqual(response.status, 400);
        deepStrictEqual(purchaseSaleProductResponse, {
          statusCode: 400,
          message: "Compra não encontrada",
          error: "Bad request",
        });
      });
    });
  });
}
