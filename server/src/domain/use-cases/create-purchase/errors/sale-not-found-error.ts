export namespace CreatePurchaseUseCaseErrors {
  export class SaleNotFoundError extends Error {
    constructor() {
      super("SaleNotFoundError");

      this.message = "Venda não encontrada";
    }
  }
}
