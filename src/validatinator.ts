import { ValidationConfig } from './interfaces';
import { DEFAULT_MESSAGES } from  './messages';
import { ValidationStateBuilder, ValidationState } from './state';
import { HTMLFormValidations } from './validations';


export class Validatinator {

  public config: ValidationConfig;

  constructor(config: ValidationConfig) {
    this.config = { ...config };
  }

  async valid(formSelector: string) {
    return (await this.validate(formSelector)).valid;
  }

  async invalid(formSelector: string) {
    return (await this.validate(formSelector)).invalid;
  }

  async validate(formSelector: string): Promise<ValidationState> {
    const formValidationConfig = this.config[formSelector];
    if (!formValidationConfig) throw new Error(`No validation config found for form: ${formSelector}`);

    const form = document.querySelector(formSelector);
    if (!form) throw new Error(`No form found with selector: ${formSelector}`);

    const stateBuilder = new ValidationStateBuilder(DEFAULT_MESSAGES);

    Object.keys(formValidationConfig).forEach((fieldSelector: string) => {
      const field = form.querySelector(fieldSelector);
      if (!field) throw new Error(`No field found with selector: ${fieldSelector}`);

      const unparsedValidationRules = formValidationConfig[fieldSelector];
      const parsedRules = this.prepareValidationRules(unparsedValidationRules);
      parsedRules.forEach(([method, ...params]) => {
        const methodCallable = (HTMLFormValidations as any)[method];
        if (!methodCallable) throw new Error(`No validation method found with name: ${method}`);

        const result = methodCallable(form, field, ...params);
        stateBuilder.addResult(fieldSelector, method, result);
      });
    });

    return stateBuilder.build();
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
