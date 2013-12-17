function Validatinator(validationInformation) {

    /****************************************/
    /*            Core Properties           */
    /****************************************/
    
    // Users may want to add validation information later on so we will allow them to create an instance of Validatinator without passing
    // any validation information.
    this.validationInformation = (validationInformation !== undefined) ? this.utils.convertFieldValidationsToArray(validationInformation) : {};
    this.errors = {};


    /****************************************/
    /*             Core Methods             */
    /****************************************/
    
    this.fails = function() {
        
    }

    this.passes = function() {

    }

    this.testValidations = function() {

    }
}