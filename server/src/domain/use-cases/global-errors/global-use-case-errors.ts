export namespace GlobalUseCaseErrors {
  export class NameAlreadyExistsError extends Error {
    constructor() {
      super("ThisNameAlreadyExists");

      this.message = "Esse nome já existe";
    }
  }
}
