export namespace GlobalUseCaseErrors {
  export class SaleNotFoundError extends Error {
    constructor() {
      super("SaleNotFoundError");

      this.message = "Venda não encontrada";
    }
  }

  export class PurchaseNotFoundError extends Error {
    constructor() {
      super("PurchaseNotFoundError");

      this.message = "Compra não encontrada";
    }
  }
}
