import HTMLFormValidations from './validations';
import DEFAULT_MESSAGES from  './messages';
import {
  ValidationConfig,
  FormValidationMessages,
  FieldValidationMessages
} from './interfaces';


export class Validatinator {

  public config: ValidationConfig;

  constructor(validations: ValidationConfig) {
    this.config = { ...validations };
  }

  async succeeds(formSelector: string) {
    return await this.validate(formSelector);
  }

  async fails(formSelector: string) {
    return !(await this.validate(formSelector));
  }

  async validate(formSelector: string): Promise<boolean> {
    const formValidationConfig = this.config[formSelector];
    if (!formValidationConfig) throw new Error(`No validation config found for form: ${formSelector}`);

    const form = document.querySelector(formSelector);
    if (!form) throw new Error(`No form found with selector: ${formSelector}`);

    Object.keys(formValidationConfig).forEach((fieldSelector: string) => {
      const field = form.querySelector(fieldSelector);
      if (!field) throw new Error(`No field found with selector: ${fieldSelector}`);

      const unparsedValidationRules = formValidationConfig[fieldSelector];
      const parsedRules = this.prepareValidationRules(unparsedValidationRules);
      parsedRules.forEach(([method, ...params]) => {
        const methodCallable = (HTMLFormValidations as any)[method];
        if (!methodCallable) throw new Error(`No validation method found with name: ${method}`);
        methodCallable(form, field, ...params);
      });
    });

    return true;
  }

  /**
   * Parses a validationRules string, and returns a prepared validation rules
   * array.
   *
   * "accepted|min:5|max:10" =>
   * [
   *   ["accepted"],
   *   ["min", "5"],
   *   ["max", "10"]
   * ]
   *
   * @param validationRules string
   */
  private prepareValidationRules(validationRulesStr: string): string[][] {
    const validationRules = validationRulesStr.split('|');

    return validationRules.map((methodAndParams: string) => {
      const [method, params] = methodAndParams.split(':');
      const paramsArray = params?.split(',') ?? [];
      return [method, ...paramsArray];
    });
  }
}
