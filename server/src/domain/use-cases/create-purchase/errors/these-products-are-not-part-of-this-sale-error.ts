export namespace CreatePurchaseUseCaseErrors {
  export class TheseProductsAreNotPartOfThisSaleError extends Error {
    constructor() {
      super("TheseProductsAreNotPartOfThisSaleError");

      this.message = "Esse(s) produto(s) não faz(em) parte dessa venda";
    }
  }
}
