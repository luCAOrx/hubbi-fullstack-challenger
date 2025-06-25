import test, { expect } from "@playwright/test";

export default function purchaseDetailsCardButtonComponent() {
  test("should be able click in each 'Ver detalhes' button from each page and check if dialog component is visible,if card title have text 'Detalhes da compra',if card description have regex like '/^Detalhes da compra da venda: Test Product [A-Za-z]/',if scroll area component have title 'Foi comprado o(s) produto(s):',if products purchase have regex '/^[A-Za-záàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ]/',if display loading icon when scroll to 10th product and click in close button", async ({
    page,
  }) => {
    test.setTimeout(120000);

    await page.getByRole("tab").getByText("Compras").click();

    do {
      const seeDetailsButtons = await page
        .getByText("Ver detalhes", { exact: true })
        .all();

      for (const seeDetailButton of seeDetailsButtons) {
        await seeDetailButton.click();

        await expect(
          page.getByText("Detalhes da compra", { exact: true }),
        ).toContainText("Detalhes da compra");

        await expect(
          page.getByText(
            /^Detalhes da compra da venda: Test Product [A-Za-z]/,
            {
              exact: true,
            },
          ),
        ).toContainText(/^Detalhes da compra da venda: Test Product [A-Za-z]/);

        await expect(
          page.getByText("Foi comprado o(s) produto(s):", { exact: true }),
        ).toContainText("Foi comprado o(s) produto(s):");

        const purchaseProductNames = await page
          .getByLabel("Nome do produto comprado")
          .all();

        for (const purchaseProductName of purchaseProductNames) {
          const purchaseProductNameText =
            await purchaseProductName.textContent();

          expect(purchaseProductNameText).toMatch(
            /^[A-Za-záàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ]/,
          );
        }

        const purchaseProductsScrollArea = page.getByLabel(
          "Área de rolagem dos produtos",
        );

        await purchaseProductNames[9].scrollIntoViewIfNeeded();

        const isVisibleLoadingIcon = purchaseProductsScrollArea
          .locator("svg.animate-spin")
          .isVisible();

        if (isVisibleLoadingIcon) {
          expect(isVisibleLoadingIcon).toBeTruthy();
        }

        await page.getByText("Fechar", { exact: true }).click();
      }

      const paginationNextButton = page.getByLabel("Ir para à próxima página");

      if (await paginationNextButton.isVisible()) {
        await paginationNextButton.click();
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(500);
        continue;
      }

      break;
    } while (true);
  });
}
