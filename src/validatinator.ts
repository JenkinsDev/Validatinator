import HTMLFormValidations from './validations';

// { 
//   "form-css-selector": {
//     "field-css-selector": "required|min:5|max:10"
//   },
//   "form-css-selector-2": {
//      ...
//   }
// }
interface ValidationConfig {
  [key: string]: {
    [key: string]: string
  }
}

// {
//   "form-css-selector": {
//     "field-css-selector": {
//       "required": "This field is required.",
//       "min": "This field must be at least 5 characters long. Received ${field.value.length}"
//     }
//   }
// }
interface FormValidationMessages {
  [key: string]: {
    [key: string]: object
  }
}

interface FieldValidationMessages {
  FormValidationMessages: {
    [key: string]: string
  }
}

class Validatinator {

  public config: ValidationConfig;

  constructor(validations: ValidationConfig, messages = {}) {
    this.config = validations;
  }

  async succeeds(formSelector: string) {
    return await this.validate(formSelector);
  }

  async fails(formSelector: string) {
    return !(await this.validate(formSelector));
  }

  async validate(formSelector: string) {
    const formValidationConfig = this.validationConfig[formSelector] || {};
    const form = document.querySelector(formSelector);
    if (!form) {
      throw new Error(`No form found with selector: ${formSelector}`);
    }

    let valid = false;
    formValidationConfig.forEach((fieldSelector, validationRules) => {
      const field = form.querySelector(fieldSelector);
      const [method, ...params] = this.prepareValidationRules(validationRules);
      if (!field) {
        throw new Error(`No field found with selector: ${fieldSelector}`);
      }

      if (!HTMLFormValidations[method]) {
        throw new Error(`No validation method found with name: ${method}`);
      }

      valid = HTMLFormValidations[method](form, field, ...params) && valid;
    });

    return valid;
  }

  /**
   * Parses a validationRules string, and returns a prepared validation rules
   * array.
   *
   * "accepted|min:5|max:10" =>
   * [
   *   "accepted",
   *   ["min", "5"],
   *   ["max", "10"]
   * ]
   *
   * @param validationRules string
   */
  private prepareValidationRules(validationRules: string): string[]?[] {
    return validationRules.split('|').map((validationMethodAndParams) => {
      const [method, params] = validationMethodAndParams.split(':');
      const paramsArray = params.split(',');
      return [method, ...paramsArray];
    });
  }
}
