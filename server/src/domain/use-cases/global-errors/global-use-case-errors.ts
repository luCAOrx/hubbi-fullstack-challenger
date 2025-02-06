export namespace GlobalUseCaseErrors {
  export class SaleNotFoundError extends Error {
    constructor() {
      super("SaleNotFoundError");

      this.message = "Venda não encontrada";
    }
  }
}
