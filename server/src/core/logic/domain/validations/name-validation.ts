import { ValidationErrors } from "./errors/validation-errors";

interface NameValidationProps {
  propertyValue: string;
  propertyName: string;
  greaterThan?: number;
  lessThan?: number;
}

export abstract class NameValidation {
  static valid({
    propertyValue,
    propertyName,
    greaterThan,
    lessThan,
  }: NameValidationProps): string {
    const regexLetters = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/;

    if (
      propertyValue.length === 0 ||
      propertyValue === null ||
      propertyValue === undefined
    )
      throw new ValidationErrors.ValidationShouldNotBeEmptyError({
        propertyName,
      });

    if (!propertyValue.match(regexLetters)) {
      throw new ValidationErrors.ValidationShouldOnlyAcceptLettersError({
        propertyName,
      });
    }

    if (propertyValue.length > Number(lessThan))
      throw new ValidationErrors.ValidationShouldBeLessThanError({
        propertyName,
        lessThan,
      });

    if (propertyValue.length < Number(greaterThan))
      throw new ValidationErrors.ValidationShouldBeGreaterThanError({
        propertyName,
        greaterThan,
      });

    return propertyValue;
  }
}
