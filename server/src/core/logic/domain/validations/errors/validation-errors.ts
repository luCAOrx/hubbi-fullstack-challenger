interface ValidationErrorsProps {
  propertyName: string;
  greaterThan?: number;
  lessThan?: number;
}

export namespace ValidationErrors {
  export class ValidationShouldNotBeEmptyError extends Error {
    constructor({ propertyName }: ValidationErrorsProps) {
      super(
        `[ValidationErrors]: The field ${propertyName} should not be empty`,
      );

      this.message = `The field ${propertyName} should not be empty`;
    }
  }

  export class ValidationShouldBeValidValidationError extends Error {
    constructor({ propertyName }: ValidationErrorsProps) {
      super(
        `[ValidationErrors]: The field ${propertyName} should be valid ${propertyName}`,
      );

      this.message = `The field ${propertyName} should be valid ${propertyName}`;
    }
  }

  export class ValidationShouldOnlyAcceptLettersError extends Error {
    constructor({ propertyName }: ValidationErrorsProps) {
      super(
        `[ValidationErrors]: The field ${propertyName} should only accept letters`,
      );

      this.message = `The field ${propertyName} should only accept letters`;
    }
  }

  export class ValidationShouldBeGreaterThanError extends Error {
    constructor({ propertyName, greaterThan }: ValidationErrorsProps) {
      super(
        `[ValidationErrors]: The field ${propertyName} should be greater than ${Number(
          greaterThan,
        )} characters`,
      );

      this.message = `The field ${propertyName} should be greater than ${Number(
        greaterThan,
      )} characters`;
    }
  }

  export class ValidationShouldBeLessThanError extends Error {
    constructor({ propertyName, lessThan }: ValidationErrorsProps) {
      super(
        `[ValidationErrors]: The field ${propertyName} should be less than ${Number(
          lessThan,
        )} characters`,
      );

      this.message = `The field ${propertyName} should be less than ${Number(
        lessThan,
      )} characters`;
    }
  }
}
