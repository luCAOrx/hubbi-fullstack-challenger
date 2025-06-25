import test, { expect } from "@playwright/test";

export default function createPurchaseFormComponent() {
  test("should be able check if all elements from CreatePurchaseForm component are visible", async ({
    page,
  }) => {
    const createPurchaseButtons = await page
      .getByTitle("Botão para cadastrar compra")
      .all();

    await createPurchaseButtons[0].click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByTitle("Título do formulário")).toContainText(
      /^Nova compra da venda: [A-Za-záàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ]/,
    );

    await expect(page.getByText("Close", { exact: true })).toBeVisible();

    await expect(page.getByTitle("Descrição do formulário")).toContainText(
      "Cadastrar uma nova compra",
    );
    await expect(page.getByTitle("Título da entrada produtos")).toContainText(
      "Selecione o(s) produto(s) que deseja",
    );
    await expect(page.getByLabel("Área de rolagem dos produtos")).toBeVisible();

    const productElements = await page
      .getByLabel("Título da caixa de seleção do campo produtos")
      .all();

    expect(productElements).toHaveLength(10);
    expect(productElements).not.toHaveLength(11);

    for (const productElement of productElements) {
      const productNameElement = await productElement.textContent();

      expect(productNameElement).toMatch(/^[A-Za-záàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ]/);
    }

    const productsScrollArea = page.getByLabel("Área de rolagem dos produtos");

    await productElements[9].scrollIntoViewIfNeeded();

    const isVisibleLoadingIcon = productsScrollArea
      .locator("svg.animate-spin")
      .isVisible();

    if (isVisibleLoadingIcon) {
      expect(isVisibleLoadingIcon).toBeTruthy();
    }
    await expect(page.getByText("Cancelar", { exact: true })).toContainText(
      "Cancelar",
    );
    await expect(page.getByText("Cadastrar", { exact: true })).toContainText(
      "Cadastrar",
    );
  });

  test("should be able click in 'Create purchase' button, not click in any products checkbox and check if display 'Você deve selecionar pelo menos um item.' error message bellow product scroll area container", async ({
    page,
  }) => {
    const createPurchaseButtons = await page
      .getByTitle("Botão para cadastrar compra")
      .all();

    await createPurchaseButtons[0].click();

    await page.getByText("Cadastrar", { exact: true }).click();

    await expect(
      page.getByText("Você deve selecionar pelo menos um item.", {
        exact: true,
      }),
    ).toContainText("Você deve selecionar pelo menos um item.");

    await expect(
      page.getByText("Você deve selecionar pelo menos um item.", {
        exact: true,
      }),
    ).toHaveClass("text-[0.8rem] font-medium text-red-500");
  });

  test("should be able go to tab 'Compras' and check if subtitle have text 'Total de 0 compras', if text 'Não há nenhuma compra no momento.' are visible in the end from list, if text 'Uma lista de suas compras.' are not visible in the end from list, if table body are not visible, if pagination component are not visible before click in 'Create purchase' button, fill form 26x, check if 'Cadastrar' button are disabled and have a spin icon in place from text, check if purchased sale has tagged with status 'Finalizada' in sales tab each time that sale were purchased and check if pagination component are visible in each page", async ({
    page,
  }) => {
    test.setTimeout(120000);

    await page.getByRole("tab").getByText("Compras").click();

    await expect(page.getByTitle("Titulo da aba compras")).toContainText(
      "Compras",
    );

    await expect(
      page.getByTitle("Descrição do total de 0 compras"),
    ).toContainText("Total de 0 compras");

    await expect(
      page.getByText("Não há nenhuma compra no momento.", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByText("Uma lista de suas compras.", { exact: true }),
    ).not.toBeVisible();

    await expect(page.getByLabel("Corpo da tabela")).not.toBeVisible();

    await expect(page.getByLabel("Paginação")).not.toBeVisible();

    await page.getByRole("tab").getByText("Vendas").click();

    do {
      const createPurchaseButtons = await page
        .getByTitle("Botão para cadastrar compra")
        .all();

      for (const createPurchaseButton of createPurchaseButtons) {
        await createPurchaseButton.click();

        await expect(page.getByRole("checkbox")).toHaveCount(10, {
          timeout: 5000,
        });

        for (let index = 0; index < 10; index++) {
          const productCheckbox = page
            .getByRole("checkbox", { exact: true })
            .nth(index);

          await productCheckbox.click();
        }

        const registerButton = page.getByLabel("Botão para cadastrar", {
          exact: true,
        });

        await registerButton.click();

        expect(
          page
            .locator(
              "button > div > svg.lucide.lucide-loader-circle.animate-spin",
            )
            .isVisible(),
        ).toBeTruthy();

        expect(registerButton.isDisabled()).toBeTruthy();

        await expect(
          page.getByText("Você realizou a compra com sucesso!", {
            exact: true,
          }),
        ).toBeVisible();
      }

      const finishedTexts = await page
        .getByText("Finalizada", { exact: true })
        .all();

      for (const finishedText of finishedTexts) {
        const finishedTextElement = await finishedText.textContent();

        expect(finishedTextElement).toBe("Finalizada");
      }

      const finishedIcons = await page
        .locator("svg.lucide.lucide-circle-check-big")
        .all();

      for (const finishedIcon of finishedIcons) {
        expect(finishedIcon).toHaveClass("lucide lucide-circle-check-big");
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
