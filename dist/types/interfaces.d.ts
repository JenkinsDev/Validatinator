export interface ValidationConfig {
    [key: string]: {
        [key: string]: string;
    };
}
export interface FormValidationMessages {
    [key: string]: {
        [key: string]: object;
    };
}
export interface FieldValidationMessages {
    FormValidationMessages: {
        [key: string]: string;
    };
}
