import test, { expect } from "@playwright/test";

export default function createSaleFormComponent() {
  test("should be able check if all elements from CreateSaleForm component are visible", async ({
    page,
  }) => {
    await page.getByTitle("Botão para cadastrar venda").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByTitle("Título do formulário")).toContainText(
      "Nova venda",
    );

    await expect(page.getByText("Close", { exact: true })).toBeVisible();

    await expect(page.getByTitle("Descrição do formulário")).toContainText(
      "Cadastrar uma nova venda",
    );
    await expect(page.getByTitle("Título da entrada nome")).toContainText(
      "Nome",
    );
    await expect(page.getByPlaceholder("Produtos de limpeza")).toBeVisible();
    await expect(page.getByTitle("Título da entrada produtos")).toContainText(
      "Produtos",
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

  test("should be able click in 'Create sale' button, leave input 'Nome' empty and check if display 'O nome do produto deve ter mais que 6 characters.' error message bellow product name input", async ({
    page,
  }) => {
    await page.getByTitle("Botão para cadastrar venda").click();

    await page.getByPlaceholder("Produtos de limpeza").fill("");

    const productsCheckboxes = await page.getByRole("checkbox").all();

    for (const productCheckbox of productsCheckboxes) {
      await productCheckbox.click();
    }

    await page.getByText("Cadastrar", { exact: true }).click();

    await expect(
      page.getByText("O nome do produto deve ter mais que 6 characters.", {
        exact: true,
      }),
    ).toContainText("O nome do produto deve ter mais que 6 characters.");

    await expect(page.getByTitle("Título da entrada nome")).toHaveClass(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-500",
    );

    await expect(
      page.getByText("O nome do produto deve ter mais que 6 characters.", {
        exact: true,
      }),
    ).toHaveClass("text-[0.8rem] font-medium text-red-500");
  });

  test("should be able click in 'Create sale' button, fill input 'Nome' with 5 characters and check if display 'O nome do produto deve ter mais que 6 characters.' error message bellow product name input", async ({
    page,
  }) => {
    await page.getByTitle("Botão para cadastrar venda").click();

    await page.getByPlaceholder("Produtos de limpeza").fill("Teste");

    const productsCheckbox = await page.getByRole("checkbox").all();

    await productsCheckbox[0].click();
    await productsCheckbox[2].click();
    await productsCheckbox[4].click();
    await productsCheckbox[5].click();

    await page.getByText("Cadastrar", { exact: true }).click();

    await expect(
      page.getByText("O nome do produto deve ter mais que 6 characters.", {
        exact: true,
      }),
    ).toContainText("O nome do produto deve ter mais que 6 characters.");

    await expect(page.getByTitle("Título da entrada nome")).toHaveClass(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-500",
    );

    await expect(
      page.getByText("O nome do produto deve ter mais que 6 characters.", {
        exact: true,
      }),
    ).toHaveClass("text-[0.8rem] font-medium text-red-500");
  });

  test("should be able click in 'Create sale' button, fill input 'Nome' with 151 characters and check if display 'O nome do produto deve ter menos que 150 characters.' error message bellow product name input", async ({
    page,
  }) => {
    await page.getByTitle("Botão para cadastrar venda").click();

    await page.getByPlaceholder("Produtos de limpeza").fill("T".repeat(151));

    const productsCheckbox = await page.getByRole("checkbox").all();

    await productsCheckbox[0].click();
    await productsCheckbox[2].click();
    await productsCheckbox[4].click();
    await productsCheckbox[5].click();

    await page.getByText("Cadastrar", { exact: true }).click();

    await expect(
      page.getByText("O nome do produto deve ter menos que 150 characters.", {
        exact: true,
      }),
    ).toContainText("O nome do produto deve ter menos que 150 characters.");

    await expect(page.getByTitle("Título da entrada nome")).toHaveClass(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-500",
    );

    await expect(
      page.getByText("O nome do produto deve ter menos que 150 characters.", {
        exact: true,
      }),
    ).toHaveClass("text-[0.8rem] font-medium text-red-500");
  });

  test("should be able click in 'Create sale' button, not click in any products checkbox and check if display 'Você deve selecionar pelo menos um item.' error message bellow product checkbox container", async ({
    page,
  }) => {
    await page.getByTitle("Botão para cadastrar venda").click();

    await page.getByPlaceholder("Produtos de limpeza").fill("Test One");

    await page.getByText("Cadastrar", { exact: true }).click();

    await expect(
      page.getByText("Você deve selecionar pelo menos um item.", {
        exact: true,
      }),
    ).toContainText("Você deve selecionar pelo menos um item.");

    await expect(page.getByTitle("Título da entrada produtos")).toHaveClass(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-500",
    );

    await expect(
      page.getByText("Você deve selecionar pelo menos um item.", {
        exact: true,
      }),
    ).toHaveClass("text-[0.8rem] font-medium text-red-500");
  });

  test("should be able check if subtitle have text 'Total de 0 vendas', if text 'Não há nenhuma venda no momento.' are visible in the end from list, if text 'Uma lista de suas vendas.' are not visible in the end from list, if table body are not visible, if pagination component are not visible before click in 'Create sale' button, fill form 26x, check if 'Cadastrar' button are disabled and have a spin icon in place from text, if text 'Você realizou a venda com sucesso!' are visible after register a sale", async ({
    page,
  }) => {
    test.setTimeout(120000);

    await expect(
      page.getByTitle("Descrição do total de 0 vendas"),
    ).toContainText("Total de 0 vendas");

    await expect(
      page.getByText("Não há nenhuma venda no momento.", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByText("Uma lista de suas vendas.", { exact: true }),
    ).not.toBeVisible();

    await expect(page.getByLabel("Corpo da tabela")).not.toBeVisible();

    await expect(page.getByLabel("Paginação")).not.toBeVisible();

    for (let index = 0; index < 26; index++) {
      const letter = String.fromCharCode(65 + index);

      await page.getByTitle("Botão para cadastrar venda").click();

      await page
        .getByPlaceholder("Produtos de limpeza")
        .fill(`Test Product ${letter}`);

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
        page.getByText("Você realizou a venda com sucesso!", { exact: true }),
      ).toBeVisible();
    }
  });

  test("should be able click in 'Create sale' button, fill form with an product that already exists and check if display 'Uma venda com esse nome já existe' error message bellow product name input", async ({
    page,
  }) => {
    await page.getByTitle("Botão para cadastrar venda").click();

    await page.getByPlaceholder("Produtos de limpeza").fill("Test Product A");

    const productsCheckbox = await page.getByRole("checkbox").all();

    await productsCheckbox[0].click();
    await productsCheckbox[2].click();
    await productsCheckbox[4].click();
    await productsCheckbox[5].click();

    await page.getByText("Cadastrar", { exact: true }).click();

    await expect(
      page.getByText("Uma venda com esse nome já existe", { exact: true }),
    ).toContainText("Uma venda com esse nome já existe");

    await expect(page.getByTitle("Título da entrada nome")).toHaveClass(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-500",
    );

    await expect(
      page.getByText("Uma venda com esse nome já existe", { exact: true }),
    ).toHaveClass("text-[0.8rem] font-medium text-red-500");
  });
}
