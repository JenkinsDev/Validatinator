import { ValidationMessages, ValidationResults } from './interfaces';
export declare class ValidationStateBuilder {
    private readonly messages;
    private readonly results;
    constructor(messages: ValidationMessages);
    addResult(fieldSelector: string, validationMethod: string, result: boolean): void;
    build(): ValidationState;
}
export declare class ValidationState {
    private readonly results;
    private readonly messages;
    constructor(results: ValidationResults, messages: ValidationMessages);
    get valid(): boolean;
    get invalid(): boolean;
    getAllErrors(): string[];
    getFieldErrors(fieldSelector: string): string[];
}
