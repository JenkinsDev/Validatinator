// { 
//   "form-css-selector": {
//     "field-css-selector": "required|min:5|max:10"
//   },
//   "form-css-selector-2": {
//      ...
//   }
// }
export interface ValidationConfig {
  [key: string]: {
    [key: string]: string
  }
}

// {
//   "form-css-selector": {
//     "field-css-selector": {
//       "required": "This field is required.",
//       "min": "This field must be at least 5 characters long. Received ${field.value.length}"
//     }
//   }
// }
export interface FormValidationMessages {
  [key: string]: {
    [key: string]: object
  }
}

export interface FieldValidationMessages {
  FormValidationMessages: {
    [key: string]: string
  }
}
