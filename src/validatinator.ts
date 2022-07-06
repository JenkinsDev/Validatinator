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
interface ValidationMessages {
    [key: string]: {
        [key: string]: {
            [key: string]: string
        }
    }
}

class Validatinator {

    public validationConfig: ValidationConfig;

    constructor(validationConfig = {}) {
        this.validationConfig = { ...validationConfig };
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

        formValidationConfig.forEach((fieldSelector, validationRules) => {
            const field = form.querySelector(fieldSelector);
            const [method, ...params] = this.prepareValidationRules(validationRules);
            if (!field) {
                throw new Error(`No field found with selector: ${fieldSelector}`);
            }

            if (!HTMLFormValidations[method]) {
                throw new Error(`No validation method found with name: ${method}`);
            }
        });
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
    private prepareValidationRules(validationRules: string): string[] {
        return validationRules.split('|').map((validationMethodAndParams) => {
            const [method, params] = validationMethodAndParams.split(':');
            const paramsArray = params.split(',');
            return [method, ...paramsArray];
        });
    }
}
