(function(window, def) {
  if (typeof module === "object" && module.exports) {
    module.exports = def();
  }

  window.Validatinator = def();
  require('./polyfills')();
})(window, function() {
  var extend = require('extend');

  /**
   * Core Validatinator class
   *
   * @class Validatinator
   * @since 0.1.0-beta
   * @param {Object} validations - Keys: form's name attribute
   * @param {Object} validations.formName - Keys: form's field name attribute
   * @param {string} validations.formName.fieldname - String containing field validations
   * @param {Object} [errorMessages]
   * @param {Object} [errorMessages.formName]
   * @param {string} [errorMessages.formName.validationName] - New Validation error message
   */
  function Validatinator(validations, errorMessages) {
    if (! (this instanceof Validatinator)) {
      throw new Error("Whoops!  Validatinator must be called with the new keyword!");
    }

    this.validationInformation = (validations !== undefined) ? this.utils.convertFieldValidationsToArray(validations) : {};
    this.errors = {};

    this.currentForm = null;
    this.currentField = null;

    this.validations.parent = this;
    this.messages.parent = this;
    this.validations.utils = this.utils;
    this.messages.utils = this.utils;

    if (errorMessages !== undefined) {
      this.messages.overwriteAndAddNewMessages(errorMessages);
    }
  }

  extend(Validatinator.prototype, {
    /**
     * Object containing all core validation methods.
     *
     * @instance
     * @memberof Validatinator
     * @mixes Validations
     * @since 0.1.0-beta
     */
    validations: require('./validations'),

    /**
     * Object containing functionality for dealing with validation
     * messages.
     *
     * @instance
     * @memberof Validatinator
     * @mixes Messages
     * @since 0.1.0-beta
     */
    messages: require('./messages'),

    /**
     * Object containing utilities used  throughout Validatinator.
     *
     * @instance
     * @memberof Validatinator
     * @mixes Utils
     * @since 0.1.0-beta
     */
    utils: require('./utils')
  });

  extend(Validatinator.prototype, {
    /**
     * Tests to see if the supplied form's values are not valid.
     *
     * @instance
     * @memberof Validatinator
     * @since 0.1.0-beta
     * @see startValidations
     * @param {string} formName - String representation of the form's name attr.
     * @returns {Boolean} True if the form fails validation, else False.
     */
    fails: function(formName) {
      return ! this.startValidations(formName);
    },

    /**
     * Tests to see if the supplied form's values are valid.
     *
     * @instance
     * @memberof Validatinator
     * @since 0.1.0-beta
     * @see startValidations
     * @param {string} formName - String representation of the form's name attr.
     * @returns {Boolean} True if the form passes validation, else False.
     */
    passes: function(formName) {
      return this.startValidations(formName);
    },

    /**
     * Tests to see if the supplied form's values are valid.
     *
     * @instance
     * @memberof Validatinator
     * @since 0.1.0-beta
     * @param {string} formName - String representation of the form's name attr.
     * @returns {Boolean} True if the form passes validation, else False.
     */
    startValidations: function(formName) {
      var currFieldValidations,
          currFieldsValue,
          currValidationMethod,
          fieldName,
          method,
          params,
          i;

      this.currentForm = formName;
      this.errors[formName] = {};

      for (fieldName in this.validationInformation[formName]) {
        this.currentField = fieldName;
        currFieldValidations = this.validationInformation[formName][fieldName];
        currFieldsValue = this.utils.getFieldsValue(this.currentForm, this.currentField);

        for (i = 0; i < currFieldValidations.length; i++) {
          params = [];

          currValidationMethod = this.getValidationMethodAndParameters(currFieldValidations[i]);
          method = currValidationMethod[0];

          // Check to see if our params actually exist, if they do, store them.
          if (currValidationMethod.length === 2) {
            params = currValidationMethod[1];
          }

          if (!this.callValidationMethod(method, params, currFieldsValue)) {
            params.shift();
            this.messages.addValidationErrorMessage(method, params);
          }
        }
      }

      return this.utils.isEmptyObject(this.errors[formName]);
    },

    /**
     * Splits apart a validation string to retrieve it's validation method
     * name along with any params it requires.
     *
     * @instance
     * @memberof Validatinator
     * @since 0.1.0-beta
     * @param {string} validationString - String containing a validation method's
     *                                    signature, along with it's params
     *                                    supplied following a colon `:`.
     * @returns {string[]} Array containing the validation method in the
     *                     first index and all other indice are the validation
     *                     method's params.
     */
    getValidationMethodAndParameters: function(validationString) {
      var params,
          validation;

      // Assume there are no params if we have no colon.
      if (! validationString.contains(":")) {
        return [validationString];
      }

      params = validationString.split(":");
      validation = params.shift();

      return [validation, this.prepareParameters(params)];
    },

    /**
     * Prepares the parameter(s) so they can be used when making the validation
     * method call.
     *
     * @instance
     * @memberof Validatinator
     * @since 0.1.0-beta
     * @param {string} params - String containing params separated by colons.
     *                          (e.g. "param1:param2:param3:param4")
     * @returns {Any[]}
     */
    prepareParameters: function(params) {
      var i = 0,
          j = 0;

      for (; i < params.length; i++) {
        if (params[i].contains(",")) {
          params[i] = params[i].split(",");

          for (; j < params[i].length; j++) {
            params[i][j] = this.utils.convertStringToBoolean(params[i][j].trim());
          }
        } else {
          params[i] = this.utils.convertStringToBoolean(params[i].trim());
        }
      }

      return params;
    },

    /**
     * Attempts to call the validation method supplied with the provided params
     * and fieldValue.
     *
     * @instance
     * @memberof Validatiantor
     * @since 0.1.0-beta
     * @param {string} method - String representation of a validation method.
     * @param {string} fieldValue - Form's field's value.
     * @param {string[]} params - Other paramteres that the field validation
     *                                require.
     * @returns {Boolean} True if the validation passed, else False.
     */
    callValidationMethod: function(method, fieldValue, params) {
      if (!(method in this.validations)) {
        throw new Error("Validation does not exist: " + method);
      }

      if (!params) {
        return this.validations[method](fieldValue);
      }

      // Add the field value to the params array so we can use
      // .apply on the validation method's signature.
      params.unshift(fieldValue);

      return this.validations[method].apply(this.validations, params);
    }
  });

  return Validatinator;
});
