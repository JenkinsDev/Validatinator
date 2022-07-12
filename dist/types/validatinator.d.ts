import { FormValidationConfigs, FieldValidationConfigs, ValidationMessages } from "./interfaces.js";
import { ValidationState } from "./state.js";
export declare class Validatinator {
    readonly config: FormValidationConfigs;
    readonly messageOverrides: ValidationMessages;
    constructor(config: FormValidationConfigs, messageOverrides?: ValidationMessages);
    validate(formSelector: string): Promise<ValidationState>;
    getFormConfig(formSelector: string): FieldValidationConfigs;
}
