import { FieldValidationConfigs, ValidationMessages, ValidationResults } from "./interfaces.js";
export declare class ValidationStateBuilder {
    readonly formFieldConfigs: FieldValidationConfigs;
    readonly messages: ValidationMessages;
    readonly results: ValidationResults;
    constructor(formFieldConfigs: FieldValidationConfigs, messages?: ValidationMessages);
    addResult(fieldSelector: string, validationMethod: string, result: boolean): ValidationStateBuilder;
    build(): ValidationState;
}
export declare class ValidationState {
    readonly formFieldConfigs: FieldValidationConfigs;
    readonly results: ValidationResults;
    readonly messages: ValidationMessages;
    constructor(formFieldConfigs: FieldValidationConfigs, results: ValidationResults, messages: ValidationMessages);
    get valid(): boolean;
    get invalid(): boolean;
    getAllErrors(): string[];
    getFieldErrors(fieldSelector: string): string[];
}
