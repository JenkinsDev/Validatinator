function Validatinator(validationInformation) {

    /****************************************/
    /*            Core Properties           */
    /****************************************/
    
    // Users may want to add validation information later on so we will allow them to create an instance of Validatinator without passing
    // any validation information.
    this.validationInformation = (validationInformation !== undefined) ? this.utils.convertFieldValidationsToArray(validationInformation) : {};
    this.errors = {};
    this.currentValidatingForm;
    this.currentValidatingField;


    /****************************************/
    /*             Core Methods             */
    /****************************************/
    
    this.fails = function() {
        
    }

    this.passes = function() {

    }

    this.getValidationArray = function(formName) {
        var fieldName;
        this.currentValidatingForm = formName;

        for (fieldName in this.validationInformation[formName]) {
            this.currentValidatingField = fieldName;
            this.testValidations(this.validationInformation[formName][fieldName]);
        }
    },

    /**
     *  Validatinator.testValidations();
     *
     *  Loops through each field that needs to be validated, then each individual validation for that field and attempts
     *  to call the validation if the validation method exists.
     *
     *  @Added: 12/16/2013
     */
    this.testValidationArray = function(fieldValidationArray) {
        var i;
        
        // Now that we are inside the actual validation array, let's loop through each validation.
        for (i=0; i<fieldValidationArray.length; i++) {
            // We need to check to see if the validation actually exists; if it doesn't then we need to throw an error.
            if (fieldValidationArray[i] in this["validations"])
                this["validations"][fieldValidationArray[i]](formName, fieldName);
            else
                throw new Error("Validation does not exist: " + fieldValidationArray[i]);
        }
    }
}

/**
 *  Add Validatinator to the window object.
 */
if (typeof window === "object" && typeof window.document === "object")
    window.Validatinator = Validatinator;
