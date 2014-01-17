/**
 * Copyright (c) 2013-2014 David Jenkins
 * See the file license.txt for copying permission.
 */

Validatinator.prototype.messages = {
    // Holds all default validation messages.
    validationMessages: {
        accepted: "This field must be accepted.",
        alpha: "This field only allows alpha characters.",
        alphaDash: "This field only allows alpha, dash and underscore characters.",
        alphaNum: "This field only allows alpha, dash, underscore and numerical characters.",
        between: "This field must be between {$0}.",
        confirmed: "This field must be the same as {$0}.",
        contains: "This field must be one of the following values, {$0}.",
        different: "This field must not be the same as {$0}.",
        digitsLength: "This field must be a numerical values and {$0} characters long.",
        digitsLengthBetween: "This field must be a numerical value and between {$0} characters long.",
        email: "This field only allows valid email addresses.",
        ipvFour: "This field only allows valid ipv4 addresses.",
        max: "This field must only be {$0} long or a numerical value must be less than or equal to {$0}.",
        min: "This field must be at least {$0} long or a numerical value must be greater than or equal to {$0}.",
        notIn: "This field must not be contained within the following values, {$0}.",
        number: "This field only allows valid numerical values.",
        required: "This field is required.",
        same: "This field must be the same value as {$0}.",
        url: "This field only allows valid urls."
    },
    
    /**
     *  Validatinator.addCurrentFormAndField();
     * 
     *  Populates the currentForm and field being used if it needs to.
     * 
     *  @Added: 1/15/2014
     */
    addCurrentFormAndField: function() {
        // Check to see if the form is populated within the errors property.
        if (! this.parent.errors.hasOwnProperty(this.parent.currentForm))
            this.parent.errors[this.parent.currentForm] = {};
        
        // Now that we know for sure that the form is populated into the error property we do the same for the field.
        if (! this.parent.errors[this.parent.currentForm].hasOwnProperty(this.parent.currentField))
            this.parent.errors[this.parent.currentForm][this.parent.currentField] = {};
    },
    
    /**
     *  Validatinator.addValidationErrorMessage(String methodName);
     * 
     *  Adds the validation's error message based on the method that was called. Layout will match along the lines
     *  of this: { "form": { "field": { "method": "method's error message." } } };
     *
     *  @Added: 1/10/2014
     */
    addValidationErrorMessage: function(methodName, parametersArray) {
        var validationMessage,
            curlyBraceStrings,
            valueReplaceRegex = /{(.*?)}/g;
        
        // Go ahead and add our currentForm and currentField to the errors object so we know it's there.
        this.addCurrentFormAndField();
        
        validationMessage = this.validationMessages[methodName];
        curlyBraceParameters = validationMessage.match(valueReplaceRegex);
        
        if (curlyBraceParameters)
            validationMessage = this.replaceCurlyBracesWithValues(validationMessage, curlyBraceParameters, parametersArray);
        
        // Form and field are both added so let's add our failed validation message.
        this.parent.errors[this.parent.currentForm][this.parent.currentField][methodName] = validationMessage;
    },
    
    /**
     *  Validatinator.replaceCurlyBracesWithValues(String validationMessage, Array curlBraceParameters, Array parametersArray);
     *  
     *  Replaces the curly brackets within the validationMessage with the corresponding values.
     * 
     *  @Added: 1/15/2014
     */
    replaceCurlyBracesWithValues: function(validationMessage, curlyBraceParameters, parametersArray) {
        var i = 0,
            currentParameterValue,
            currentValueToReplace;
        
        // The first value in the parametersArray seems to always be an empty string, let's fix that here.
        if (parametersArray[0] === "")
            parametersArray.shift();
        
        for (; i < curlyBraceParameters.length; i++) {
            currentParameterValue = parametersArray[i];
            currentValueToReplace = "{$" + i + "}";
            
            // If the index in the parameterArray doesn't exist or if the validation doesn't contain the {$i} value then continue to the next index.
            if (! validationMessage.contains(currentValueToReplace) && (currentParameterValue === null && currentParameterValue === undefined))
                continue;
            
            // If the value is not an array then we will go ahead and just replace the string with the value.  Also note: regex
            // is bad mojo!  Try to use anything that is not a regex before reverting to one.
            if (! this.utils.isValueAnArray(parametersArray[i]))
                validationMessage = validationMessage.split(currentValueToReplace).join(currentParameterValue);
            else
                validationMessage = validationMessage.split(currentValueToReplace).join(this.utils.convertArrayValuesToEnglishString(currentParameterValue));
        }
        
        return validationMessage;
    }
};
