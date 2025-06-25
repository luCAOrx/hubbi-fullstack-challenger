import test, { expect } from "@playwright/test";

export default function purchasesComponent() {
  test("should be able go to tab 'Compras' and check in table body from purchases tab if sales were purchased, if description from title have regex '/^Total de ([1-9][0-9]{0,5}|1000000) compras/', if cell 'Nome do produto' have a regex '/^Test Product [A-Za-z]/', if cell 'Criado em' have a regex '/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/', if button from cell 'Ações' have a text like 'Ver detalhes', if have a text in end from list like 'Uma lista de suas compras.', if not have a text in end from list like 'Não há nenhuma compra no momento.' and check if pagination component are visible in each page", async ({
    page,
  }) => {
    test.setTimeout(120000);

    await page.getByRole("tab").getByText("Compras").click();

    await expect(
      page.getByText(/^Total de ([1-9][0-9]{0,5}|1000000) compras/, {
        exact: true,
      }),
    ).toContainText(/^Total de ([1-9][0-9]{0,5}|1000000) compras/);

    do {
      const productNames = await page
        .getByText(/^Test Product [A-Za-z]/, { exact: true })
        .all();

      for (const productName of productNames) {
        const productNameElement = await productName.textContent();

        expect(productNameElement).toMatch(/^Test Product [A-Za-z]/);
      }

      const createPurchaseDates = await page
        .getByLabel("Data da criação da compra")
        .all();

      for (const createPurchaseDate of createPurchaseDates) {
        const createPurchaseDateElement =
          await createPurchaseDate.textContent();

        expect(createPurchaseDateElement).toMatch(
          /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
        );
      }

      const purchaseDetailButtons = await page
        .getByText("Ver detalhes", {
          exact: true,
        })
        .all();

      for (const purchaseDetailButton of purchaseDetailButtons) {
        const purchaseDetailButtonElement =
          await purchaseDetailButton.textContent();

        expect(purchaseDetailButtonElement).toBe("Ver detalhes");
      }

      await expect(
        page.getByText("Uma lista de suas compras.", { exact: true }),
      ).toBeVisible();

      await expect(
        page.getByText("Não há nenhuma compra no momento.", { exact: true }),
      ).not.toBeVisible();

      await expect(page.getByLabel("Paginação")).toBeVisible();

      const pageNumberButtons = await page
        .getByLabel("Informa a quantidade de páginas e a página atual")
        .all();

      expect(pageNumberButtons).toHaveLength(3);

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
