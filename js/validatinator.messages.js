Validatinator.prototype.messages = {
    // Holds all default validation messages.
    validationMessages: {
        accepted: "This field must be accepted.",
        alpha: "This field only allows alpha characters.",
        alphaDash: "This field only allows alpha, dash and underscore characters.",
        alphaNum: "This field only allows alpha, dash, underscore and numerical characters.",
        between: "This field must be between {min} and {max}.",
        confirmed: "This field must be the same as {confirmedField}.",
        contains: "This field must be one of the following values, {containsArray}.",
        different: "This field must not be the same as {differentValue}.",
        digitsLength: "This field must be a numerical values and {length} characters long.",
        digitsLengthBetween: "This field must be between {minLength} and {maxLength}.",
        email: "This field only allows valid email addresses.",
        ipvFour: "This field only allows valid ipv4 addresses.",
        max: "This field must only be {max} long or a numerical value must be less than or equal to {max}.",
        min: "This field must be at least {min} long or a numerical value must be greater than or equal to {min}.",
        notIn: "This field must not be contained within the following values, {notInArray}.",
        number: "This field only allows valid numerical values.",
        required: "This field is required.",
        same: "This field must be the same value as {sameValue}.",
        url: "This field only allows valid urls."
    },
    
    /**
     *  Validatinator.addValidationErrorMessage(String methodName);
     * 
     *  Adds the validation's error message based on the method that was called.  Populates
     *  the currentForm and field being used if it needs to.  Layout will match along the lines
     *  of this: { "form": { "field": { "method": "method's error message." } } };
     *
     *  @Added: 1/10/2014
     */
    addValidationErrorMessage: function(methodName) {
        // Check to see if the form is populated within the errors property.
        if (! this.parent.errors.hasOwnProperty(this.parent.currentForm))
            this.parent.errors[this.parent.currentForm] = {};
        
        // Now that we know for sure that the form is populated into the error property we do the same for the field.
        if (! this.parent.errors[this.parent.currentForm].hasOwnProperty(this.parent.currentField))
            this.parent.errors[this.parent.currentForm][this.parent.currentField] = {};
        
        // Form and field are both added so let's add our failed validation message.
        this.parent.errors[this.parent.currentForm][this.parent.currentField][methodName] = this.validationMessages[methodName];
    },
};
