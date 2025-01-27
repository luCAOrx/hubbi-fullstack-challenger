import { ValidationErrors } from "./errors/validation-errors";

interface ProductsValidationProps {
  propertyValue: { public_id: string; name: string }[];
  propertyName: string;
}

export abstract class ProductsValidation {
  static valid({
    propertyValue,
    propertyName,
  }: ProductsValidationProps): { public_id: string; name: string }[] {
    if (propertyValue.length === 0)
      throw new ValidationErrors.ValidationShouldNotBeEmptyError({
        propertyName,
      });

    return propertyValue;
  }
}
