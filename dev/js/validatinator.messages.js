/**
 * Copyright (c) 2013-2015 David Jenkins
 * See the file license.txt for copying permission.
 */

Validatinator.prototype.messages = {
    // Holds all default validation messages.
    validationMessages: {
        accepted: "This field must be accepted.",
        alpha: "This field only allows alpha characters.",
        alphaDash: "This field only allows alpha, dash and underscore characters.",
        alphaNum: "This field only allows alpha, dash, underscore and numerical characters.",
        between: "This field must be between {$0}",
        betweenLength: "This field must be between {$0} characters long.",
        confirmed: "This field must be the same as {$0}.",
        contains: "This field must be one of the following values, {$0}.",
        dateBefore: "This field must be a date before {$0}.",
        dateAfter: "This field must be a date after {$0}.",
        different: "This field must not be the same as {$0}.",
        digitsLength: "This field must be a numerical value and {$0} characters long.",
        digitsLengthBetween: "This field must be a numerical value and between {$0} characters long.",
        email: "This field only allows valid email addresses.",
        ipvFour: "This field only allows valid ipv4 addresses.",
        max: "This field must be equal to or less than {$0}.",
        maxLength: "This field must be {$0} or less characters long.",
        min: "This field must be equal to or more than {$0}.",
        minLength: "This field must be {$0} or more characters long.",
        notIn: "This field must not be contained within the following values, {$0}.",
        number: "This field only allows valid numerical values.",
        required: "This field is required.",
        requiredIf: "This field is required if the value of {$0} equals {$1}.",
        requiredIfNot: "This field is required if the value of {$0} does not equal {$1}.",
        same: "This field must be the same value as {$0}.",
        url: "This field only allows valid urls."
    },

    /**
     *  Validatinator.messages.overwriteAndAddNewMessages(Object newValidationErrorMessages);
     *
     *  Overrides or adds new validation error messages based on the user supplied data.
     *
     *  @Added: 1/18/2014
     */
    overwriteAndAddNewMessages: function(newValidationErrorMessages) {
        var errorMessage;

        for (errorMessage in newValidationErrorMessages) {
            this.validationMessages[errorMessage] = newValidationErrorMessages[errorMessage];
        }
    },

    /**
     *  Validatinator.messages.addCurrentFormAndField();
     *
     *  Populates the currentForm and field being used if it needs to.
     *
     *  @Added: 1/15/2014
     */
    addCurrentFormAndField: function() {
        // Check to see if the form is populated within the errors property.
        if (! this.parent.errors.hasOwnProperty(this.parent.currentForm)) {
            this.parent.errors[this.parent.currentForm] = {};
        }

        // Now that we know for sure that the form is populated into the error property we do the same for the field.
        if (! this.parent.errors[this.parent.currentForm].hasOwnProperty(this.parent.currentField)) {
            this.parent.errors[this.parent.currentForm][this.parent.currentField] = {};
        }
    },

    /**
     *  Validatinator.messages.addValidationErrorMessage(String methodName, Array parametersArray);
     *
     *  Adds the validation's error message based on the method that was called. Layout will match along the lines
     *  of this: { "form": { "field": { "method": "method's error message." } } };
     *
     *  @Added: 1/10/2014
     */
    addValidationErrorMessage: function(methodName, parametersArray) {
        var currentForm = this.parent.currentForm,
            currentField = this.parent.currentField,
            validationMessage = this.getValidationErrorMessage(methodName);

        this.addCurrentFormAndField();

        if (parametersArray.length > 0) {
            validationMessage = this.replaceCurlyBracesWithValues(validationMessage, parametersArray);
        }

        // Form and field are both added so let's add our failed validation message.
        this.parent.errors[currentForm][currentField][methodName] = validationMessage;
    },

    /**
     *  Validatinator.messages.getValidationErrorMessage(methodName);
     *
     *  Attempts to retrieve an error message for the supplied methodName.  This method will first check to see if there is a
     *  form and field specific custom error message set and if it isn't then we check the top-level validation message.
     *
     *  @Added: 5/21/2015
     */
    getValidationErrorMessage: function(methodName) {
        var currentForm = this.parent.currentForm,
            currentField = this.parent.currentField,
            validationMessage;

        try {
            validationMessage = this.validationMessages[currentForm][currentField][methodName];
        }
        catch(e) { }
        // We will just deal with it below because not every "undefined" in the try will actually
        // cause the catch to run.

        if (! validationMessage) {
            validationMessage = this.validationMessages[methodName];
        }

        return validationMessage;
    },

    /**
     *  Validatinator.messages.replaceCurlyBracesWithValues(String validationMessage, Array curlBraceParameters, Array parametersArray);
     *
     *  Replaces the curly brackets within the validationMessage with the corresponding values.
     *
     *  @Added: 1/15/2014
     */
    replaceCurlyBracesWithValues: function(validationMessage, parametersArray) {
        var i = 0,
            currentParameterValue,
            currentValueToReplace;

        for (; i < parametersArray.length; i++) {
            currentParameterValue = parametersArray[i];
            currentValueToReplace = "{$" + i + "}";

            // If the index in the parameterArray doesn't exist or if the validation doesn't contain the {$i} value then continue to the next index.
            if (! validationMessage.contains(currentValueToReplace) && (currentParameterValue === null && currentParameterValue === undefined)) {
                continue;
            }

            // If the value is not an array then we will go ahead and just replace the string with the value.  Also note: regex
            // is bad mojo!  Try to use anything that is not a regex before reverting to one.
            if (! this.utils.isValueAnArray(parametersArray[i])) {
                validationMessage = validationMessage.split(currentValueToReplace).join(currentParameterValue);
            }
            else {
                validationMessage = validationMessage.split(currentValueToReplace).join(this.utils.convertArrayValuesToEnglishString(currentParameterValue));
            }
        }

        return validationMessage;
    }
};
