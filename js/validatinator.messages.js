Validatinator.prototype.messages = {
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
        if (! this.errors.hasOwnProperty(this.currentForm))
            this.errors[this.currentForm] = {};
        
        // Now that we know for sure that the form is populated into the error property we do the same for the field.
        if (! this.errors[this.currentForm].hasOwnProperty(this.currentField))
            this.errors[this.currentForm][this.currentField] = {};
        
        // Form and field are both added so let's add our failed validation message.
        this.errors[this.currentForm][this.currentField][methodName] = this.validationMessages[methodName];
    },
};
