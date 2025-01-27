export namespace GlobalUseCaseErrors {
  export class SaleAlreadyExistsError extends Error {
    constructor() {
      super("ThisSaleAlreadyExists");

      this.message = "Uma venda com esse nome já existe";
    }
  }
}
