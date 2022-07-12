import { FormValidationConfigs, FieldValidationConfigs, ValidationMessages } from "./interfaces.js";
import { ValidationStateBuilder, ValidationState } from "./state.js";
import { HTMLFormValidations } from "./validations.js";
import { prepareValidationRules } from "./utility.js";

export default class Validatinator {

  constructor(
    public readonly config: FormValidationConfigs,
    public readonly messageOverrides: ValidationMessages = {}
  ) {}

  async validate(formSelector: string): Promise<ValidationState> {
    const formFieldConfigs = this.getFormConfig(formSelector);
    if (!formFieldConfigs) throw new Error(`No validation config found for form: ${formSelector}`);

    const form = document.querySelector(formSelector);
    if (!form) throw new Error(`No form found with selector: ${formSelector}`);

    const stateBuilder = new ValidationStateBuilder(formFieldConfigs, this.messageOverrides);

    Object.keys(formFieldConfigs).forEach((fieldSelector: string) => {
      const field = form.querySelector(fieldSelector);
      if (!field) throw new Error(`No field found with selector: ${fieldSelector}`);

      const unpreparedValidationRules = formFieldConfigs[fieldSelector];
      prepareValidationRules(unpreparedValidationRules).forEach(([method, ...params]) => {
        const methodCallable = (HTMLFormValidations as any)[method];
        if (!methodCallable) throw new Error(`No validation method found with name: ${method}`);

        const result = methodCallable(form, field, ...params);
        stateBuilder.addResult(fieldSelector, method, result);
      });
    });

    return stateBuilder.build();
  }

  getFormConfig(formSelector: string): FieldValidationConfigs {
    return this.config[formSelector];
  }
}
