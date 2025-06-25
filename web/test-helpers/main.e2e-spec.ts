import headerComponent from "@/components/header/header.e2e-spec";
import purchaseDetailsCardButtonComponent from "@/components/main/contents/purchases/purchase-details-card-button.e2e-spec";
import purchasesComponent from "@/components/main/contents/purchases/purchases.e2e-spec";
import createPurchaseFormComponent from "@/components/main/contents/sales/form/create-purchase-form.e2e-spec";
import createSaleFormComponent from "@/components/main/contents/sales/form/create-sale-form.e2e-spec";
import salesComponent from "@/components/main/contents/sales/sales.e2e-spec";
import test from "@playwright/test";

const baseUrl = "http://localhost:3001";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test.describe("Header component", () => headerComponent({ baseUrl }));
test.describe("Create sale form", () => createSaleFormComponent());
test.describe("Sales tab", () => salesComponent());
test.describe("Create purchase form", () => createPurchaseFormComponent());
test.describe("Purchases tab", () => purchasesComponent());
test.describe("Purchase details card button", () =>
  purchaseDetailsCardButtonComponent());
