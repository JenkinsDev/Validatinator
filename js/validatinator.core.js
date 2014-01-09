function Validatinator(validationInformation) {

    /****************************************/
    /*            Core Properties           */
    /****************************************/
    
    // Users may want to add validation information later on so we will allow them to create an instance of Validatinator without passing
    // any validation information.
    this.validationInformation = (validationInformation !== undefined) ? this.utils.convertFieldValidationsToArray(validationInformation) : {};
    this.errors = {};
    // Current form & field we are validating against.
    this.currentForm;
    this.currentField;

    // Give our validations prototype object the properties needed to access the parent and utils methods.
    this.validations.parent = this;
    this.validations.utils = this.utils;


    /****************************************/
    /*             Core Methods             */
    /****************************************/
    
    this.fails = function(formName) {
        // Start up the validation process.
        this.getValidationArray(formName);
    };

    this.passes = function(formName) {
        // Start up the validation process.
        this.getValidationArray(formName);
    };

    /**
     *  Validatinator.startValidations();
     *
     *  Start the process of getting the each field that we will be validating for
     *  and retrieving the actual valdations we will be performing on that field.
     *
     *  @Added: 1/4/2014
     */
    this.startValidations = function(formName) {
        this.currentForm = formName;

        // Go through each of the fields we will be validating against.
        for (fieldName in this.validationInformation[formName]) {
            var currentFieldValidations = this.validationInformation[formName][fieldName];
            this.currentField = fieldName;
        }
    };


    /**
     *  Validatinator.prepareParameters(validationParameters)
     *
     *  Preps the parameters so they can be used when making the validation calls.
     *
     *  @Added: 1/5/2014
     */
    this.prepareParameters = function(validationParameters) {
        var i,
            j;

        // We need to loop through each of the "extra parameters" and furthur split the `parameters`
        // even more.
        for (i=0; i<validationParameters.length; i++) {
            // Check to see if we have third level "parameters" that will be transformed into an array for specific
            // validation methods.  i.e:  not_in:foo,bar,baz.
            if (validationParameters[i].contains(",")) {
                validationParameters[i] = validationParameters[i].split(",");
                
                // Since there was third level "parameters" we will go ahead and loop through each of the elements and
                // trim away any whitespace and convert falsey or truthy values to their boolean representations.
                for (j=0; j<validationParameters[i].length; j++) {
                    validationParameters[i][j] = this.utils.convertStringToBoolean(validationParameters[i][j].trim());
                }
            } else {
                // Trim any whitespace and convert falsey or truthy values to their boolean representations
                validationParameters[i] = this.utils.convertStringToBoolean(validationParameters[i].trim());
            }
        }

        return validationParameters;
    };

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
    };
}

/**
 *  Add Validatinator to the window object.
 */
if (typeof window === "object" && typeof window.document === "object")
    window.Validatinator = Validatinator;
