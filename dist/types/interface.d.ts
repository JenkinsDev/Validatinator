interface ValidationConfig {
    [key: string]: {
        [key: string]: string;
    };
}
interface FormValidationMessages {
    [key: string]: {
        [key: string]: object;
    };
}
interface FieldValidationMessages {
    FormValidationMessages: {
        [key: string]: string;
    };
}
