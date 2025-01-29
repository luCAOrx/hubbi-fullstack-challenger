export namespace GlobalUseCaseErrors {
  export class SaleAlreadyExistsError extends Error {
    constructor() {
      super("ASaleWithThatNameAlreadyExists");

      this.message = "Uma venda com esse nome já existe";
    }
  }
}
