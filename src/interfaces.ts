/**
 * Configuration interface for defining validations at the form level.
 *
 * Example:
 *
 * ```
 * {
 *   "#form-id": {
 *     "input:first-child": "required|min:3"
 *   }
 * }
 * ```
 */
export interface FormValidationConfigs {
  [key: string]: FieldValidationConfigs
}

/**
 * Configuration interface for defining validations at the field level.
 *
 * Example:
 *
 * ```
 * {
 *   "#field-id": "required|min:3"
 * }
 * ```
 */
export interface FieldValidationConfigs {
  [key: string]: string
}

/**
 * Configuration interface for defining validation messages.
 *
 * Example:
 *
 * ```
 * {
 *  "required": "This field is required",
 *  "min": "This field must be at least ${0} characters long",
 *  "in": "This field must be one of the following: ${...}",
 *  ...
 * }
 * ```
 */
export interface ValidationMessages {
  [key: string]: string
}

/**
 * Interface for the raw validation results.
 *
 * This is the low-level results consumed by the `ValidationState` class.
 */
export interface ValidationResults {
  [key: string]: {
    [key: string]: boolean
  }
}
