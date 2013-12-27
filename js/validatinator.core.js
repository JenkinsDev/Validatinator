function Validatinator(validationInformation) {

    /****************************************/
    /*            Core Properties           */
    /****************************************/
    
    // Users may want to add validation information later on so we will allow them to create an instance of Validatinator without passing
    // any validation information.
    this.validationInformation = (typeof validationInformation !== undefined) ? this.utils.convertFieldValidationsToArray(validationInformation) : {};
    this.errors = {};
    this.currentValidatingForm;
    this.currentValidatingField;
    // We will give each of our sub classes a parent property so they can easily, interchangebly, call each other's methods.
    this.utils.parent = this;
    this.validations.parent = this;
    this.validations.utils = this.utils;


    /****************************************/
    /*             Core Methods             */
    /****************************************/
    
    this.fails = function(formName) {
        // Start up the validation process.
        this.getValidationArray(formName);
    }

    this.passes = function(formName) {
        // Start up the validation process.
        this.getValidationArray(formName);
    }

    /**
     *  Validatinator.getValidationArray();
     *
     *  Loops through each field that the form contains and passes their validation arrays to
     *  testValidationArray();
     *
     *  @Added: 12/17/2013
     */
    this.getValidationArray = function(formName) {
        var fieldName;
        this.currentValidatingForm = formName;

        for (fieldName in this.validationInformation[formName]) {
            this.currentValidatingField = fieldName;
            this.testValidations(this.validationInformation[formName][fieldName]);
        }
    }

    /**
     *  Validatinator.testValidations();
     *
     *  Loops through each individual validation and attempts
     *  to call the validation if the validation method exists.
     *
     *  @Added: 12/16/2013
     */
    this.testValidationArray = function(fieldValidationArray) {
        var form,
            fieldValue,
            i;

        form = document.getElementsByName(this.currentValidatingForm)[0];
        fieldValue = form.getElementsByName(this.currentValidatingField)[0].value;
        
        // Now that we are inside the actual validation array, let's loop through each validation.
        for (i=0; i<fieldValidationArray.length; i++) {
            // We need to check to see if the validation actually exists; if it doesn't then we need to throw an error.
            if (! (fieldValidationArray[i] in this["validations"]))
                throw new Error("Validation does not exist: " + fieldValidationArray[i]);
            
            // If the validation does exist then call it.
            this["validations"][fieldValidationArray[i]](fieldValue);
        }
    }
}

/**
 *  Add Validatinator to the window object.
 */
if (typeof window === "object" && typeof window.document === "object")
    window.Validatinator = Validatinator;
