export default class ValidationState {

  constructor(formConfig: ValidationConfig, messages: FieldValidationMessages) {
    this.formConfig = formConfig;
    this.messages = messages;
  }
}
