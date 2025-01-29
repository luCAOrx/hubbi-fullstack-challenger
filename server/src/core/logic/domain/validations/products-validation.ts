import { ValidationErrors } from "./errors/validation-errors";

interface ProductsValidationProps {
  propertyValue: string;
  propertyName: string;
}

export abstract class ProductsValidation {
  static valid({
    propertyValue,
    propertyName,
  }: ProductsValidationProps): string {
    if (propertyValue.length === 0)
      throw new ValidationErrors.ValidationShouldNotBeEmptyError({
        propertyName,
      });

    return propertyValue;
  }
}
