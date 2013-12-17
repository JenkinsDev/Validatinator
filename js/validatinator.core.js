function Validatinator(validationInformation) {
    /****************************************/
    /*            Core Properties           */
    /****************************************/
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