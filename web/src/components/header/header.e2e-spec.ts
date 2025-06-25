import test, { expect } from "@playwright/test";

export default function headerComponent({ baseUrl }: { baseUrl: string }) {
  test(`should be able click in 'Logo' button and navigate to home page(${baseUrl})`, async ({
    page,
  }) => {
    await page.getByLabel("Botão da logo do site para ir ao início").click();
    await page.waitForURL(baseUrl);
    await expect(page).toHaveURL(baseUrl);
  });

  test("should be change theme from dark to light and from light to dark", async ({
    page,
  }) => {
    await expect(page.locator("html")).toHaveClass("dark");
    await expect(page.getByLabel("Ícone do tema claro")).toHaveClass(
      "lucide lucide-sun absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
    );

    await page.getByLabel("Botão para alterar o tema").click();
    await expect(page.locator("html")).toHaveClass("light");
    await expect(page.getByLabel("Ícone do tema escuro")).toHaveClass(
      "lucide lucide-moon h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
    );

    await page.getByLabel("Botão para alterar o tema").click();
    await expect(page.locator("html")).toHaveClass("dark");
    await expect(page.getByLabel("Ícone do tema claro")).toHaveClass(
      "lucide lucide-sun absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
    );
  });
}
