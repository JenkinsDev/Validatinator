/**
 * Copyright (c) 2013-2015 David Jenkins
 * See the file license.txt for copying permission.
 */

function Validatinator(validationInformation, validationErrorMessages) {
    if (! (this instanceof Validatinator)) {
        throw new Error("Whoops!  Validatinator must be called with the new keyword!");
    }

    // Users may want to add validation information later on so we will allow them to create an instance of Validatinator without passing
    // any validation information.
    this.validationInformation = (validationInformation !== undefined) ? this.utils.convertFieldValidationsToArray(validationInformation) : {};
    this.errors = {};

    // Current form & field we are validating against.
    this.currentForm;
    this.currentField;

    // Give our validations prototype object the properties needed to access the parent and utils methods.
    this.validations.parent = this;
    this.messages.parent = this;
    this.validations.utils = this.utils;
    this.messages.utils = this.utils;

    // Overwrite and create new validationErrorMessages if the user provided any.
    if (validationErrorMessages !== undefined) {
        this.messages.overwriteAndAddNewMessages(validationErrorMessages);
    }
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
        // startValidations will always return true if we pass so let's go ahead and
        // flip that response.
        return ! this.startValidations(formName);
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
        return this.startValidations(formName);
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
            i;

        this.currentForm = formName;
        // Since we are doing a fresh validation let's make sure our errors are all fresh as well!
        this.errors = {};

        for (var fieldName in this.validationInformation[formName]) {
            this.currentField = fieldName;
            currentFieldsValidations = this.validationInformation[formName][fieldName];
            currentFieldsValue = this.utils.getFieldsValue(this.currentForm, this.currentField);

            // We need to set i here because it doesn't reset to zero by default and it is more idomatic to do it here.
            for (i = 0; i < currentFieldsValidations.length; i++) {
                var method,
                    parameters = [];

                currentValidationMethodAndParameters = this.getValidationMethodAndParameters(currentFieldsValidations[i]);
                method = currentValidationMethodAndParameters[0];

                // Here we check to see if our parameters actually exist and if it does then store it.
                if (currentValidationMethodAndParameters.length === 2) {
                    parameters = currentValidationMethodAndParameters[1];
                }

                if (! this.callValidationMethodWithParameters(method, parameters, currentFieldsValue)) {
                    parameters.shift();
                    this.messages.addValidationErrorMessage(method, parameters);
                }
            }
        }

        // If there are no errors populated in the errors property then we passed.
        return this.utils.isEmptyObject(this.errors);
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
        var validationParameters,
            validationMethod;

        // If our validationString doesn't have any colons then we will assume
        // that the validation does not have any parameters and there is nothing furthur
        // we need to do.
        if (! validationString.contains(":")) {
            return [validationString];
        }

        validationParameters = validationString.split(":");
        // Remove the first element off the array as that is always going to be the validation
        // method, we are only worried about the parameters at this time.
        validationMethod = validationParameters.shift();

        // Add the the validation method back onto the front of a new array after we prepare the
        // parameters.
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
                // Trim any whitespace and convert falsy or truthy values to their boolean representations
                validationParameters[i] = this.utils.convertStringToBoolean(validationParameters[i].trim());
            }
        }

        return validationParameters;
    },

    /**
     *  Validatinator.callValidationMethodWithParameters(String method, Array parameters, Object fieldValue);
     *
     *  Attempts to call the validation method supplied with the provided parameters if
     *  any parameters exist, if they don't then just call the validation method with
     *  the current validating field's value.
     *
     *  @Added: 1/9/2014
     */
    callValidationMethodWithParameters: function(method, parameters, fieldValue) {
        // We will be using this variable to prepend the fieldValue variable to the parameters variable.  We
        // do this so we can use the .apply Function method.
        if (! (method in this["validations"])) {
            throw new Error("Validation does not exist: " + method);
        }

        if (! parameters) {
            return this["validations"][method](fieldValue);
        }

        // We do this so we can use the .apply Function method below.  All parameters for each method call will be based
        // on the parameters array.
        parameters.unshift(fieldValue);

        // this.validations makes sure the scope that is used during the validation call is within the validations scope and
        // first value of the parameters array is actually the field's value.  We have to do this as .apply will distribute
        // out the parameters array as different parameters for each index.  So ["value", ["5", "10"]] passed to between would be
        // between(value, [5, 10]);
        return this["validations"][method].apply(this.validations, parameters);
    }
};


// Add the Validatinator "function" to the window object.
if (typeof window === "object" && typeof window.document === "object")
    window.Validatinator = Validatinator;
