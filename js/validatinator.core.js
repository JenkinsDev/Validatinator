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

    // Give our validations prototype object the properties needed to access the parent and utils methods.
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
            this.testValidationArray(this.validationInformation[formName][fieldName]);
        }
    }

    /**
     *  Validatinator.testValidationArray();
     *
     *  Loops through each individual validation and attempts
     *  to call the validation if the validation method exists.
     *
     *  @Added: 12/16/2013
     */
    this.testValidationArray = function(fieldValidationArray) {
        var form,
            fieldValue,
            fieldElementsArray,
            fieldElement,
            i;

        form = document.getElementsByName(this.currentValidatingForm)[0];
        // Instead of getting the first element in the returned array we will loop
        // through each of the returned items and check to make sure the input we will
        // be validating against is truly within the form we are currently validating.
        fieldElementsArray = document.getElementsByName(this.currentValidatingField);

        for (i=0; i<fieldElementsArray.length; i++) {
            fieldElement = fieldElementsArray[i];

            // Making sure the element is truly within the form we are validating against.
            if (fieldElement.form.name === this.currentValidatingForm) {
                fieldValue = fieldElement.value;
                break;
            }
        }

        // If no field value was stored then we will assume that the field couldn't be found.
        if (!fieldValue)
            throw new Error("Couldn't find the field element: " + this.currentValidatingField);
        
        // Now that we are inside the actual validation array, let's loop through each validation.
        for (j=0; j<fieldValidationArray.length; j++) {
            // We need to check to see if the validation actually exists; if it doesn't then we need to throw an error.
            if (! (fieldValidationArray[i] in this["validations"]))
                throw new Error("Validation does not exist: " + fieldValidationArray[i]);
            
            // Validation exists, let's call it (Yes it's a bit of a weird method).
            this["validations"][fieldValidationArray[i]](fieldValue);
        }
    }
}

/**
 *  Add Validatinator to the window object.
 */
if (typeof window === "object" && typeof window.document === "object")
    window.Validatinator = Validatinator;
