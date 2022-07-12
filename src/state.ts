import { FieldValidationConfigs, ValidationMessages, ValidationResults } from "./interfaces.js";
import { DEFAULT_MESSAGES } from "./constants.js";
import { prepareValidationRules, prepareErrorMessage } from "./utility.js";

/**
 * @class
 * @classdesc Builds a ValidationState object.
 * @param {ValidationMessages} messages
 */
export class ValidationStateBuilder {

  public readonly results: ValidationResults = {};

  constructor(
    public readonly formFieldConfigs: FieldValidationConfigs,
    public readonly messages: ValidationMessages = {}
  ) {
    if (Object.keys(messages).length === 0) {
      this.messages = DEFAULT_MESSAGES;
    } else {
      this.messages = Object.assign({}, DEFAULT_MESSAGES, messages);
    }
  }

  /**
   * Adds a validation result to the validation results object.
   *
   * @param fieldSelector - The selector of the field that was validated.
   * @param method - The name of the validation method that was called.
   * @param result - The result of the validation method.
   */
  addResult(fieldSelector: string, validationMethod: string, result: boolean): ValidationStateBuilder {
    this.results[fieldSelector] = this.results[fieldSelector] ?? {};
    this.results[fieldSelector][validationMethod] = result;
    return this;
  }

  /**
   * Builds the `ValidationState` object from the validation results.
   *
   * @returns ValidationState
   */
  build(): ValidationState {
    return new ValidationState(this.formFieldConfigs, this.results, this.messages);
  }
}

/**
 * @class
 * @classdesc Holds the validation results and messages for a particular point in time.
 * @param {ValidationMessages} messages
 */
export class ValidationState {

  constructor(
    public readonly formFieldConfigs: FieldValidationConfigs,
    public readonly results: ValidationResults,
    public readonly messages: ValidationMessages
  ) {}

  /**
   * Returns whether the `ValidationState` is valid.
   *
   * @returns boolean indicating whether the `ValidationState` is valid.
   */
  get valid(): boolean {
    let valid = true;

    for (const field in this.results) {
      valid = valid && Object.values(this.results[field]).every(state => state === true);
    }

    return valid;
  }

  /**
   * Returns whether the `ValidationState` is invalid.
   *
   * @returns boolean indicating whether the `ValidationState` is invalid.
   */
  get invalid(): boolean {
    return !this.valid;
  }

  /**
   * Returns an array of error messages for the entire ValidationState.
   *
   * @returns An array of error messages.
   */
  getAllErrors(): string[] {
    const fields = Object.keys(this.results);

    let errors: string[] = [];
    fields.forEach((fieldSelector: string) => {
      errors = errors.concat(this.getFieldErrors(fieldSelector));
    });

    return errors;
  }

  /**
   * Returns an array of error messages for a given field.
   *
   * @param fieldSelector - The selector of the field to get the errors for.
   * @returns An array of error messages.
   */
  getFieldErrors(fieldSelector: string): string[] {
    const errors: string[] = [];

    const fieldValidationRules = prepareValidationRules(this.formFieldConfigs[fieldSelector]);

    Object.keys(this.results[fieldSelector]).forEach((validationMethod: string) => {
      if (!this.results[fieldSelector][validationMethod]) {
        const [_, ...validationParams] = fieldValidationRules.filter(([method]) => method === validationMethod)[0] ?? [];

        const errorMessage = this.messages[validationMethod];
        errors.push(prepareErrorMessage(errorMessage, ...validationParams));
      }
    });

    return errors;
  }
}
