function Validatinator(validationInformation) {

    /****************************************/
    /*            Core Properties           */
    /****************************************/
    
    // Users may want to add validation information later on so we will allow them to create an instance of Validatinator without passing
    // any validation information.
    this.validationInformation = (validationInformation !== undefined) ? this.utils.convertFieldValidationsToArray(validationInformation) : {};
    this.errors = {};


    /****************************************/
    /*             Core Methods             */
    /****************************************/
    
    this.fails = function() {
        
    }

    this.passes = function() {

    }

    this.testValidations = function() {
        var fieldValidationArray;

        // Loop through the top level forms.
        for (formName in validationInformation) {
            // Loop through each, individual, field that has validation tests attached to it.
            for (fieldName in validationInformation[formName]) {
                fieldValidationArray = validationInformation[formName][fieldName];

                // Now that we are inside the actual validation array, let's loop through each validation.
                for (validation in fieldValidationArray) {
                    // We need to check to see if the validation actually exists; if it doesn't then we need to throw an error.
                    if (fieldValidationArray[validation] in this.validations)
                        this["validations"][fieldValidationArray[validation]](formName, fieldName);
                    else
                        throw new Error("Validation does not exist");
                }
            }
        }
    }
}

/**
 *  Add Validatinator to the window object.
 */
if (typeof window === "object" && typeof window.document === "object")
    window.Validatinator = Validatinator;