function Validatinator(validationInformation) {   
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
}

Validatinator.prototype = {
    /**
     *  Validatinator.fails(String formName);
     * 
     *  Starts the testing phase for each of the form field's validation methods,
     *  if any of them fails then we return true here and the user can expect the 
     *  errors object will have populated information.
     * 
     *  @Added: 12/23/2013
     */
    fails: function(formName) {
        // Start up the validation process.
        this.getValidationArray(formName);
    },

    /**
     *  Validatinator.passes(String formName);
     * 
     *  Starts the testing phase for each of the form field's validation methods,
     *  if any of them fail then we return false here and the user can expect the 
     *  errors object will have populated information.
     * 
     *  @Added: 12/23/2013
     */
    passes: function(formName) {
        // Start up the validation process.
        this.getValidationArray(formName);
    },

    /**
     *  Validatinator.startValidations(String formName);
     *
     *  Start the process of getting the each field that we will be validating for
     *  and retrieving the actual valdations we will be performing on that field.
     *
     *  @Added: 1/4/2014
     */
    startValidations: function(formName) {
        var currentFieldsValidations,
            currentFieldsValue,
            currentValidationMethodAndParameters,
            i = 0;
        this.currentForm = formName;

        for (fieldName in this.validationInformation[formName]) {
            currentFieldsValidations = this.validationInformation[formName][fieldName];
            this.currentField = fieldName;
            
            for (; i < currentFieldsValidations.length; i++) {
                currentValidationMethodAndParameters = this.getValidationMethodAndParameters(currentFieldsValidations[i]);
                currentFieldsValue = this.getCurrentFieldsValue();
                
            }
        }
    },
    
    /**
     *  Validatinator.getValidationMethodAndParameters(String validationString);
     * 
     *  Take the current validationString and retreive the validation method and
     *  it's prepared parameters.  Makes a call to prepareParameters to get the
     *  parameters in a good enough state for the validation method calls.
     * 
     *  @Added: 1/8/2014
     */
    getValidationMethodAndParameters: function(validationString) {
        var validationArray,
            validationParameters,
            validationMethod,
            i = 1;
        
        // If our validationString doesn't have any colons then we will assume
        // that the validation does not have any parameters and there is nothing furthur
        // we need to do.        
        if (! validationString.contains(":"))
            return [validationString];
            
        validationParameters = validationString.split(":");
        // Remove the first element off the array as that is always going to be the validation
        // method, we are only worried about the parameters at this time.
        validationMethod = validationParameters.shift();
        
        // Add the the validation method back onto the front of the array.
        return [validationMethod, this.prepareParameters(validationParameters)];
    },


    /**
     *  Validatinator.prepareParameters(Array validationParameters)
     *
     *  Preps the parameters so they can be used when making the validation calls.
     *
     *  @Added: 1/5/2014
     */
    prepareParameters: function(validationParameters) {
        var i = 0,
            j = 0;

        // We need to loop through each of the "extra parameters" and furthur split the `parameters` if need be.
        for (; i < validationParameters.length; i++) {
            // Check to see if we have third level "parameters" that will be transformed into an array for specific
            // validation methods.  i.e:  not_in:foo,bar,baz.
            if (validationParameters[i].contains(",")) {
                validationParameters[i] = validationParameters[i].split(",");
                
                // Since there was third level "parameters" we will go ahead and loop through each of the elements and
                // trim away any whitespace and convert falsey or truthy values to their boolean representations.
                for (; j < validationParameters[i].length; j++) {
                    validationParameters[i][j] = this.utils.convertStringToBoolean(validationParameters[i][j].trim());
                }
            } else {
                // Trim any whitespace and convert falsey or truthy values to their boolean representations
                validationParameters[i] = this.utils.convertStringToBoolean(validationParameters[i].trim());
            }
        }

        return validationParameters;
    },
    
    /**
     *  Validatinator.getCurrentFieldsValue();
     * 
     *  Attempts to get the current validating field's value from the dom.  If the field cannot be found then
     *  we will simply throw an Error stating as such.
     * 
     *  @Added: 1/8/2014
     */
    getCurrentFieldsValue: function()  {
        var fieldsArray,
            fieldValue;

        // Instead of trusting that the first element returned is the actual field, we will go ahead
        // and test if the field is truly within the form that we are validating against.
        fieldsArray = document.getElementsByName(this.currentField);

        for (i=0; i<fieldsArray.length; i++) {
            fieldElement = fieldsArray[i];

            // We are running a simple test to see if the current field in the returned array is part of
            // our validating field or not.  If it is then grab it's value and break out of this test loop.
            if (fieldElement.form.name === this.currentForm) {
                fieldValue = fieldElement.value;
                break;
            }
        }
 
        // If no field value was stored then we will assume that the field couldn't be found.  An empty string is
        // not considered a "non-stored field value."
        if (!fieldValue && fieldValue !== "")
            throw new Error("Couldn't find the field element, " + this.currentField + ", for the form, " + this.currentForm + ".");
            
        return fieldValue;
    },

    /**
     *  Validatinator.testValidationArray();
     *
     *  Loops through each individual validation and attempts
     *  to call the validation if the validation method exists.
     *
     *  @Added: 12/16/2013
     */
    testValidationArray: function(fieldValidationArray) {
        var form,
            fieldValue,
            fieldElementsArray,
            fieldElement,
            i;




        
        // Now that we are inside the actual validation array, let's loop through each validation.
        for (j=0; j<fieldValidationArray.length; j++) {
            // We need to check to see if the validation actually exists; if it doesn't then we need to throw an error.
            if (! (fieldValidationArray[i] in this["validations"]))
                throw new Error("Validation does not exist: " + fieldValidationArray[i]);
            
            // Validation exists, let's call it (Yes it's a bit of a weird method).
            this["validations"][fieldValidationArray[i]](fieldValue);
        }
    },
};


// Add the Validatinator "function" to the window object.
if (typeof window === "object" && typeof window.document === "object")
    window.Validatinator = Validatinator;
