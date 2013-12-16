var Validatinator = {
    /***********************************************/
    /*                  Properties                 */
    /***********************************************/
    errors: {},
    validationInformation: {},

    /***********************************************/
    /*                   Methods                   */
    /***********************************************/
    
    /**
     *  Validatinator.make({});
     *
     *  Here we create the actual Validatinator object that the user will use to validate forms.
     */
    make: function(validationInformation) {
        this.validationInformation = validationInformation;
        return this;
    },

    /**
     *  Validatinator.fails();
     *
     *  This is where the meat of the validation happens.  After the user creates their object with
     *  Validatinator.make({}) they will call this function to see if the validation fails or not.
     */
    fails: function() {
        
    },
}