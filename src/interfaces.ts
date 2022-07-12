export interface FormValidationConfigs {
  [key: string]: FieldValidationConfigs
}

export interface FieldValidationConfigs {
  [key: string]: string
}

export interface ValidationMessages {
  [key: string]: string
}

export interface ValidationResults {
  [key: string]: {
    [key: string]: boolean
  }
}
