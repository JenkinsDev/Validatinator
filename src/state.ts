import { ValidationMessages, ValidationResults } from './interfaces';


/**
 * @class
 * @classdesc Builds a ValidationState object.
 * @param {ValidationMessages} messages
 */
export class ValidationStateBuilder {

  private readonly results: ValidationResults = {};

  constructor(private readonly messages: ValidationMessages) {}

  /**
   * Adds a validation result to the validation results object.
   *
   * @param fieldSelector The selector of the field that was validated.
   * @param method The name of the validation method that was called.
   * @param result The result of the validation method.
   */
  addResult(fieldSelector: string, validationMethod: string, result: boolean) {
    this.results[fieldSelector] = this.results[fieldSelector] ?? {};
    this.results[fieldSelector][validationMethod] = result;
  }

  /**
   * Builds the `ValidationState` object from the validation results.
   *
   * @returns ValidationState
   */
  build(): ValidationState {
    return new ValidationState(this.results, this.messages);
  }
}

/**
 * @class
 * @classdesc Holds the validation results and messages for a particular point in time.
 * @param {ValidationMessages} messages
 */
export class ValidationState {

  constructor(
    private readonly results: ValidationResults,
    private readonly messages: ValidationMessages
  ) {}

  /**
   * Returns whether the `ValidationState` is valid.
   *
   * @returns boolean
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
   * @returns boolean
   */
  get invalid(): boolean {
    return !this.valid;
  }

  /**
   * Returns an array of error messages for the entire ValidationState.
   *
   * @returns string[]
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
   * @param fieldSelector string
   * @returns string[]
   */
  getFieldErrors(fieldSelector: string): string[] {
    const errors: string[] = [];

    Object.keys(this.results[fieldSelector]).forEach((validationMethod: string) => {
      if (!this.results[fieldSelector][validationMethod]) {
        errors.push(this.messages[validationMethod]);
      }
    });

    return errors;
  }
}
