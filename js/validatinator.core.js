/**
 * new Validatinator();
 *
 * Validatinator core `function` or `constructor`.
 */

var Validatinator = {
    /***********************************************/
    /*                  Properties                 */
    /***********************************************/
    errors: [],
    validationInformation: {},

    /***********************************************/
    /*                   Methods                   */
    /***********************************************/
    make: function(validationInformation) {
        this.validationInformation = validationInformation;
        return this;
    },

    fails: function() {

    }
}