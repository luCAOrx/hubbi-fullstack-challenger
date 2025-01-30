import { deepStrictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { ValidationErrors } from "src/core/logic/domain/validations/errors/validation-errors";

import { Purchase } from "./purchase";

describe("Purchase entity", () => {
  it("should be able to create a new purchase", () => {
    const purchase = Purchase.create({
      saleId: "1e455b91-8a84-48b0-8336-d28aa92053f4",
      products: "1,2,3",
    });

    deepStrictEqual(purchase.id, purchase.id);
    deepStrictEqual(purchase.props, {
      saleId: "1e455b91-8a84-48b0-8336-d28aa92053f4",
      products: "1,2,3",
    });
  });

  it("should not be able to create a new purchase with field products empty", () => {
    throws(
      () =>
        Purchase.create({
          saleId: "1e455b91-8a84-48b0-8336-d28aa92053f4",
          products: "",
        }),
      ValidationErrors.ValidationShouldNotBeEmptyError,
    );
  });
});
