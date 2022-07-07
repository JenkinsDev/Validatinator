import { ValidationConfig } from './interfaces';
import { ValidationState } from './state';
export declare class Validatinator {
    config: ValidationConfig;
    constructor(config: ValidationConfig);
    valid(formSelector: string): Promise<boolean>;
    invalid(formSelector: string): Promise<boolean>;
    validate(formSelector: string): Promise<ValidationState>;
    private prepareValidationRules;
}
