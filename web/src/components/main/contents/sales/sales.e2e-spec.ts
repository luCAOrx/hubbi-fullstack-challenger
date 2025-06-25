import test, { expect } from "@playwright/test";

export default function salesComponent() {
  test("should be able check if subtitle have text 'Total de 26 vendas', check on eache page in table body if all cells from column 'Nome' have regex '/^Test Product [A-Za-z]/', if all cells from column 'Status' have text 'Pendente', if all cells from column 'Status' have icon with class 'lucide lucide-circle-alert', if all cells from column 'Criado em' have regex '/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/', if all cells from column 'Ações' have text 'Cadastrar compra', if text 'Uma lista de suas vendas.' are visible in end from list, if text 'Não há nenhuma venda no momento.' are not visible in end from list and check if pagination component are visible, if have 3 page number buttons", async ({
    page,
  }) => {
    test.setTimeout(120000);

    do {
      await expect(
        page.getByText(/^Total de ([1-9][0-9]{0,5}|1000000) vendas/, {
          exact: true,
        }),
      ).toContainText(/^Total de ([1-9][0-9]{0,5}|1000000) vendas/);

      const saleNames = await page
        .getByText(/^Test Product [A-Za-z]/, { exact: true })
        .all();

      for (const saleName of saleNames) {
        const saleNameElement = await saleName.textContent();

        expect(saleNameElement).toMatch(/^Test Product [A-Za-z]/);
      }

      const pendentTexts = await page
        .getByText("Pendente", { exact: true })
        .all();

      for (const pendentText of pendentTexts) {
        const pendetTextElement = await pendentText.textContent();

        expect(pendetTextElement).toBe("Pendente");
      }

      const pendentIcons = await page
        .locator("svg.lucide.lucide-circle-alert")
        .all();

      for (const pendentIcon of pendentIcons) {
        expect(pendentIcon).toHaveClass("lucide lucide-circle-alert");
      }

      const salesCreatedAt = await page
        .getByLabel("Data da criação da venda")
        .all();

      for (const saleCreatedAt of salesCreatedAt) {
        const saleCreatedAtElement = await saleCreatedAt.textContent();

        expect(saleCreatedAtElement).toMatch(
          /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
        );
      }

      const createPurchaseButtons = await page
        .getByText("Cadastrar compra", {
          exact: true,
        })
        .all();

      for (const createPurchaseButton of createPurchaseButtons) {
        const createPurchaseButtonElement =
          await createPurchaseButton.textContent();

        expect(createPurchaseButtonElement).toBe("Cadastrar compra");
      }

      await expect(
        page.getByText("Uma lista de suas vendas.", { exact: true }),
      ).toBeVisible();

      await expect(
        page.getByText("Não há nenhuma venda no momento.", { exact: true }),
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
