/**
 * Copyright (c) 2013-2016 David Jenkins <david.nicholas.jenkins@gmail.com> (validatinator)
 * See license.txt for license information.
 *
 * Simple, yet effective, vanilla JavaScript form validation plugin. Validatinator is based off of one of PHP's most famous framework, Laravel.  Using Validatinator is as easy as instantiating a Validatinator object, calling the passes or fails methods and if there are failed validations then grabbing those validations from the errors property on the main object.
 *
 * Latest Update: 1.3.2 (6/7/2016)
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * @mixin
 */
var Messages = {
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
   * Overrides or adds new validation error messages.
   *
   * @since 0.1.0-beta
   * @param {Object} newErrorMessages - Keys: validation method names
   * @param {String} newErrorMessages.validationMethodName - Validation error message
   */
  overwriteAndAddNewMessages: function overwriteAndAddNewMessages(newErrorMessages) {
    var errorMessage;

    for (errorMessage in newErrorMessages) {
      this.validationMessages[errorMessage] = newErrorMessages[errorMessage];
    }
  },

  /**
   * Adds the validation's error message based on the method that was called.
   *
   * @since 0.1.0-beta
   */
  addValidationErrorMessage: function addValidationErrorMessage(methodName, parametersArray) {
    var currentForm = this.parent.currentForm,
        currentField = this.parent.currentField,
        validationMessage = this.getValidationErrorMessage(methodName);

    if (!this.parent.errors.hasOwnProperty(currentForm)) {
      this.parent.errors[currentForm] = {};
    }

    if (!this.parent.errors[currentForm].hasOwnProperty(currentField)) {
      this.parent.errors[currentForm][currentField] = {};
    }

    if (parametersArray.length > 0) {
      validationMessage = this.replaceCurlyBracesWithValues(validationMessage, parametersArray);
    }

    // Form and field are both added so let's add our failed validation message.
    this.parent.errors[currentForm][currentField][methodName] = validationMessage;
  },

  /**
   * Attempts to retrieve an error message from the supplied methodName.  This
   * this method will first check to see if there is a form and field specific
   * custom error message, if not then it'll get the top-level validation message.
   *
   * @since 0.1.0-beta
   * @returns {String} Error Message
   */
  getValidationErrorMessage: function getValidationErrorMessage(methodName) {
    var currentForm = this.parent.currentForm,
        currentField = this.parent.currentField,
        validationMessage;

    try {
      validationMessage = this.validationMessages[currentForm][currentField][methodName];
    } catch (e) {}

    if (!validationMessage) {
      validationMessage = this.validationMessages[methodName];
    }

    return validationMessage;
  },

  /**
   * Replaces the curly brackets within the validation error message with
   * the corresponding values.
   *
   * @since 0.1.0-beta
   * @returns {String}
   */
  replaceCurlyBracesWithValues: function replaceCurlyBracesWithValues(validationMessage, parametersArray) {
    var i, paramVal, valToReplace;

    for (i = 0; i < parametersArray.length; i++) {
      paramVal = parametersArray[i];
      valToReplace = "{$" + i + "}";

      // If the index in the parameterArray doesn't exist or if the validation
      // doesn't contain the {$i} value then continue to the next index.
      if (!validationMessage.contains(valToReplace) && paramVal === null && paramVal === undefined) {
        continue;
      }

      // If the value is not an array then we will go ahead and just
      // replace the string with the value.  Also note: regex is bad mojo!
      // Try to use anything that is not a regex before reverting to one.
      if (!this.utils.isValueAnArray(parametersArray[i])) {
        validationMessage = validationMessage.split(valToReplace).join(paramVal);
      } else {
        validationMessage = validationMessage.split(valToReplace).join(this.utils.convertArrayValuesToEnglishString(paramVal));
      }
    }

    return validationMessage;
  }
};

module.exports = Messages;

},{}],2:[function(require,module,exports){
'use strict';

module.exports = function () {
  if (!String.prototype.contains) {
    String.prototype.contains = function (str, startIndex) {
      return -1 !== String.prototype.indexOf.call(this, str, startIndex);
    };
  }

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      if (this === undefined || this === null) {
        throw new TypeError('"this" is null or not defined');
      }

      // Hack to convert object.length to a UInt32
      var length = this.length >>> 0;

      fromIndex = +fromIndex || 0;

      if (Math.abs(fromIndex) === Infinity) {
        fromIndex = 0;
      }

      if (fromIndex < 0) {
        fromIndex += length;
        if (fromIndex < 0) {
          fromIndex = 0;
        }
      }

      for (; fromIndex < length; fromIndex++) {
        if (this[fromIndex] === searchElement) {
          return fromIndex;
        }
      }

      return -1;
    };
  }
};

},{}],3:[function(require,module,exports){
"use strict";

/**
 * @mixin
 */
var Utils = {
  /**
   * Loops through each form and field and converts the field's string of
   * validations to an array of field validations.
   *
   *
   * <pre>
   *   e.g:
   *   convertFieldValidationsToArray({
   *     "aForm": {
   *       "bField": "required|min:5|max:10"
   *     }
   *   }) =>
   *   {
   *     "aForm": {
   *       "bField": ["required", "min:5", "max:10"]
   *     }
   *   }
   * </pre>
   *
   * @param {Object} validationInfo
   * @returns {Object} Updated validationInfo object
   */
  convertFieldValidationsToArray: function convertFieldValidationsToArray(validationInfo) {
    for (var form in validationInfo) {
      for (var field in validationInfo[form]) {
        var validation = validationInfo[form][field];

        if (validation.contains("|")) {
          validationInfo[form][field] = validation.split("|");
        } else {
          validationInfo[form][field] = [validation];
        }
      }
    }

    return validationInfo;
  },

  /**
   * Converts string representations of the boolean values to their actual boolean
   * value.
   *
   * @param {string} strRepr - String representation of a boolean value,
   *                           "false" or "true"
   * @returns {Any} If the string "false" or "true" were supplied then it returns
   *                a boolean.  Else it returns the supplied value
   */
  convertStringToBoolean: function convertStringToBoolean(strRepr) {
    if (typeof strRepr !== "string") {
      return strRepr;
    }

    if (strRepr.toLowerCase() === "false") {
      return false;
    } else if (strRepr.toLowerCase() === "true") {
      return true;
    }

    return strRepr;
  },

  /**
   * Loops through each of the supplied array's values and concatenates them into
   * an English string.
   *
   * @param {Any[]} arrayOfValues
   * @returns {string}
   */
  convertArrayValuesToEnglishString: function convertArrayValuesToEnglishString(arrayOfValues) {
    var i,
        currentLength,
        finishedString = '';

    for (i = 0; i < arrayOfValues.length; i++) {
      currentLength = i + 1;

      if (currentLength === arrayOfValues.length) {
        finishedString += ' and ' + arrayOfValues[i];
      } else if (i === 0) {
        finishedString += arrayOfValues[i];
      } else {
        finishedString += ', ' + arrayOfValues[i];
      }
    }

    return finishedString;
  },

  /**
   * Tests to see if the value provided is falsy in it's nature; i.e: undefined,
   * null or false. If strict mode is true then 0 equates to false.
   *
   * @param {Any} value - Value to check
   * @param {Boolean} strict - If not supplied, defaults to true
   * @returns {Boolean} True if the value if falsy in nature, otherwise false
   */
  isValueFalsyInNature: function isValueFalsyInNature(value, strict) {
    if (strict === undefined || strict === null) {
      strict = true;
    }

    if (value === undefined || value === null || value === "") {
      return true;
    }

    // If strict mode is set to true then 0 will be the same as false.
    return strict ? !value : value === false;
  },

  /**
   * Checks to see if the supplied value is an array.
   *
   * @param {Any} value - Value to check
   * @returns {Boolean}
   */
  isValueAnArray: function isValueAnArray(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  },

  /**
   * Check to see if the supplied value is an empty object.
   *
   * @param {Object} obj - Value to check
   * @returns {Boolean}
   */
  isEmptyObject: function isEmptyObject(obj) {
    var name;

    for (name in obj) {
      return false;
    }

    return true;
  },

  /**
   * Retrieves a field's value based off of the field's name attribute.  Field must
   * be a child of the form supplied by the form name attribute.
   *
   * @param {string} form - Form's name attribute.
   * @param {string} field - Field's name attribute.
   */
  getFieldsValue: function getFieldsValue(form, field) {
    var fieldsArray, fieldValue, fieldEle, i;

    fieldsArray = document.getElementsByName(field);

    for (i = 0; i < fieldsArray.length; i++) {
      fieldEle = fieldsArray[i];

      if (fieldEle.form.name === form) {
        if ((fieldEle.type == 'radio' || fieldEle.type == 'checkbox') && !fieldValue) {
          if (fieldEle.checked) {
            fieldValue = fieldEle.value;
            break;
          } else {
            fieldValue = "";
            continue;
          }
        } else {
          fieldValue = fieldEle.value;
        }

        break;
      }
    }

    // If no field value was stored then we will assume that the field couldn't be found.  An empty string is
    // not considered a "non-stored field value."
    if (!fieldValue && fieldValue !== "") throw new Error("Couldn't find the field element " + field + " for the form " + form + ".");

    return fieldValue;
  }
};

module.exports = Utils;

},{}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (window, def) {
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === "object" && module.exports) {
    module.exports = def();
  }

  window.Validatinator = def();
  require('./polyfills')();
})(window, function () {
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
    if (!(this instanceof Validatinator)) {
      throw new Error("Whoops!  Validatinator must be called with the new keyword!");
    }

    this.validationInformation = validations !== undefined ? this.utils.convertFieldValidationsToArray(validations) : {};
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
    fails: function fails(formName) {
      return !this.startValidations(formName);
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
    passes: function passes(formName) {
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
    startValidations: function startValidations(formName) {
      var currFieldValidations, currFieldsValue, currValidationMethod, fieldName, method, params, i;

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
    getValidationMethodAndParameters: function getValidationMethodAndParameters(validationString) {
      var params, validation;

      // Assume there are no params if we have no colon.
      if (!validationString.contains(":")) {
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
    prepareParameters: function prepareParameters(params) {
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
    callValidationMethod: function callValidationMethod(method, fieldValue, params) {
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

},{"./messages":1,"./polyfills":2,"./utils":3,"./validations":5,"extend":6}],5:[function(require,module,exports){
"use strict";

/**
 * All validations return true if the check passed, else false.
 *
 * @mixin
 */
var Validations = {
  /**
   * Checks to make sure the current field's attribute is set to true.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  accepted: function accepted(fieldValue) {
    return document.getElementsByName(this.parent.currentField)[0].checked;
  },

  /**
   * Checks to make sure the field's value only contains alpha characters.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  alpha: function alpha(fieldValue) {
    var alphaReg = /^[a-zA-Z]+$/;

    if (this.utils.isValueFalsyInNature(fieldValue)) {
      return false;
    }

    return alphaReg.test(fieldValue);
  },

  /**
   * Checks to make sure the field's value only contains alpha, underscore
   * and hyphen characters.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  alphaDash: function alphaDash(fieldValue) {
    var alphaDashReg = /^[a-zA-Z-_]+$/;

    if (this.utils.isValueFalsyInNature(fieldValue)) {
      return false;
    }

    return alphaDashReg.test(fieldValue);
  },

  /**
   * Checks to make sure our field's value only contains alpha, underscore,
   * hyphen and numerical characters.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  alphaNum: function alphaNum(fieldValue) {
    var alphaNumReg = /^[a-zA-Z-_0-9]+$/;

    if (this.utils.isValueFalsyInNature(fieldValue)) {
      return false;
    }

    return alphaNumReg.test(fieldValue);
  },

  /**
   * Checks to make sure the field's value is between the min
   * and max values.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  between: function between(fieldValue, minMax) {
    var min = Number(minMax[0]),
        max = Number(minMax[1]);

    if (isNaN(min) || isNaN(max)) {
      throw new Error("min and max must both be numbers in the `between` validation.");
    }

    return min <= fieldValue && fieldValue <= max;
  },

  /**
   * Checks to make sure the field's value has a length that is between the
   * the min and max values.  The value to be checked will be casted to a String.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  betweenLength: function betweenLength(fieldValue, minMax) {
    var min = Number(minMax[0]),
        max = Number(minMax[1]),
        fieldValueLength = String(fieldValue).length;

    if (isNaN(min) || isNaN(max)) {
      throw new Error("min and max must both be numbers in the `betweenLength` validation.");
    }

    return min <= fieldValueLength && fieldValueLength <= max;
  },

  /**
   * Checks to make sure the field's value is contained within the
   * supplied array.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  contains: function contains(fieldValue, containsArray) {
    return containsArray.indexOf(fieldValue) !== -1;
  },

  /**
   * Checks to make sure the field's value is a date and that it
   * comes before the supplied date.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  dateBefore: function dateBefore(fieldValue, suppliedDate) {
    return Date.parse(fieldValue) < Date.parse(suppliedDate);
  },

  /**
   * Check to make sure the field's value is a date and that it
   * comes after the date supplied.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  dateAfter: function dateAfter(fieldValue, suppliedDate) {
    return Date.parse(fieldValue) > Date.parse(suppliedDate);
  },

  /**
   * Checks to make sure the field's value is different from the
   * supplied value.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  different: function different(fieldValue, differentFieldName, strict) {
    return !this.same(fieldValue, differentFieldName, strict);
  },

  /**
   * Checks to make sure the field's value is only numerical and that
   * the length of the value is exactly the length supplied.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  digitsLength: function digitsLength(fieldValue, length) {
    var fieldValueLength = String(fieldValue).length,
        length = Number(length);

    if (isNaN(length)) {
      throw new Error("Length must be of numerical type in the `digitsLength` validation.");
    }

    if (!this.number(fieldValue)) {
      return false;
    }

    return fieldValueLength === length;
  },

  /**
   * Checks to make sure the field's value is only numerical and that
   * the length of the value is between the min and max lengths supplied.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  digitsLengthBetween: function digitsLengthBetween(fieldValue, minMaxLength) {
    var minLength = Number(minMaxLength[0]),
        maxLength = Number(minMaxLength[1]),
        fieldValueLength = String(fieldValue).length;

    if (isNaN(minLength) || isNaN(maxLength)) {
      throw new Error("The min length and max length must both be numerical types in the `digitsLengthBetween` validation.");
    }

    if (!this.number(fieldValue)) {
      return false;
    }

    return minLength <= fieldValueLength && fieldValueLength <= maxLength;
  },

  /**
   * Checks to make sure the field's value is a valid email address format.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  email: function email(fieldValue) {
    var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,10})+$/;
    return emailReg.test(fieldValue);
  },

  /**
   * Checks to make sure the field's value supplied is a valid ipv4 address,
   * based on the RFC specs.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  ipvFour: function ipvFour(fieldValue) {
    var ipSegments, ipSegment, ind;

    ipSegments = fieldValue.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);

    if (ipSegments === null) {
      return false;
    }

    ipSegments = ipSegments.slice(1);

    for (ind in ipSegments) {
      ipSegment = Number(ipSegments[ind]);

      if (!(ipSegment >= 0 && ipSegment <= 255)) {
        return false;
      }
    }

    return true;
  },

  /**
   * Checks to make sure the field's value is less than or equal to the
   * max value supplied.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  max: function max(fieldValue, _max) {
    _max = Number(_max);

    if (isNaN(_max)) {
      throw new Error("max must be of numerical value in the `max` validation.");
    }

    return this.between(fieldValue, [-Infinity, _max]);
  },

  /**
   * Checks to make sure the field's value has a length that is less than
   * or equal to the max length.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  maxLength: function maxLength(fieldValue, max) {
    max = Number(max);

    if (isNaN(max)) {
      throw new Error("max must be a numerical value in the `max` validation.");
    }

    return this.betweenLength(fieldValue, [-Infinity, max]);
  },

  /**
   * Checks to make sure the field's value is less than or equal to the
   * min value supplied.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  min: function min(fieldValue, _min) {
    _min = Number(_min);

    if (isNaN(_min)) {
      throw new Error("min must be of numerical value in the `min` validation.");
    }

    return this.between(fieldValue, [_min, Infinity]);
  },

  /**
   * Checks to make sure the field's value has a length that is less than
   * or equal to the min length.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  minLength: function minLength(fieldValue, min) {
    min = Number(min);

    if (isNaN(min)) {
      throw new Error("min must be a numerical value in the `minLength` validation.");
    }

    return this.betweenLength(fieldValue, [min, Infinity]);
  },

  /**
   * Checks to make sure the field's value is not contained within the
   * the supplied array of values.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  notIn: function notIn(fieldValue, containsArray) {
    return !this.contains(fieldValue, containsArray);
  },

  /**
   * Checks to make sure the field's value is a valid Number.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  number: function number(fieldValue) {
    if (fieldValue === null || fieldValue === undefined) {
      return false;
    }

    return !isNaN(Number(fieldValue));
  },

  /**
   * Checks to make sure the field's value exists.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  required: function required(fieldValue) {
    // If the value isn't falsy in nature then required should
    // be true.
    return !this.utils.isValueFalsyInNature(fieldValue, false);
  },

  /**
   * Protected method that is used to help keep the requiredIf and requiredIfNot
   * code DRY.
   *
   * @protected
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  _required_if: function _required_if(fieldValue, testedFieldsName, valueToTestAgainst, not) {
    var testedFieldsValue = this.utils.getFieldsValue(this.parent.currentForm, testedFieldsName);

    if (not && testedFieldsValue !== valueToTestAgainst || !not && testedFieldsValue === valueToTestAgainst) {
      return this.required(fieldValue);
    }

    return true;
  },

  /**
   * Checks to make sure the field's value is not falsy if the
   * field passed as the first parameter of the validation string
   * has a value that is equal to the value supplied in the
   * second parameter of the validation string.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  requiredIf: function requiredIf(fieldValue, testedFieldsName, valueToTestAgainst) {
    return this._required_if(fieldValue, testedFieldsName, valueToTestAgainst, false);
  },

  /**
   * Checks to make sure the field's value is not falsy if the
   * field passed as the first parameter of the validation string
   * does not have a value that is equal to the value supplied in the
   * second parameter of the validation string. This is the opposite of
   * {@link requiredIf}.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  requiredIfNot: function requiredIfNot(fieldValue, testedFieldsName, valueToTestAgainst) {
    return this._required_if(fieldValue, testedFieldsName, valueToTestAgainst, true);
  },

  /**
   * Checks to make sure the field's value is equal to the field value
   * provided.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  same: function same(fieldValue, sameFieldName, strict) {
    var sameFieldValue = this.utils.getFieldsValue(this.parent.currentForm, sameFieldName);

    if (strict === undefined || strict === null) {
      strict = true;
    }

    // We cast our field values to strings so all values are of the same data type and we
    // can make use of the toLowerCase method.
    fieldValue = String(fieldValue);
    sameFieldValue = String(sameFieldValue);

    if (strict) {
      return fieldValue === sameFieldValue;
    }

    return fieldValue.toLowerCase() === sameFieldValue.toLowerCase();
  },

  /**
   * Checks to make sure the field's value is in correct URL format.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  url: function url(fieldValue) {
    var urlReg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlReg.test(fieldValue);
  }
};

module.exports = Validations;

},{}],6:[function(require,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {/**/}

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0],
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


},{}]},{},[4]);
