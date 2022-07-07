export interface ValidationConfig {
    [key: string]: FormValidationConfig;
}
export interface FormValidationConfig {
    [key: string]: string;
}
export interface ValidationMessages {
    [key: string]: string;
}
export interface ValidationResults {
    [key: string]: {
        [key: string]: boolean;
    };
}
