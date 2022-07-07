import { ValidationConfig } from './interfaces';
export declare class Validatinator {
    config: ValidationConfig;
    constructor(validations: ValidationConfig);
    succeeds(formSelector: string): Promise<boolean>;
    fails(formSelector: string): Promise<boolean>;
    validate(formSelector: string): Promise<boolean>;
    private prepareValidationRules;
}
