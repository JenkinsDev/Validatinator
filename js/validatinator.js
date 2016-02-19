(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
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

},{}],2:[function(require,module,exports){
module.exports = function() {
  if (!String.prototype.contains) {
    String.prototype.contains = function(str, startIndex) {
      return -1 !== String.prototype.indexOf.call(this, str, startIndex);
    };
  }

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
      if (this === undefined || this === null) {
        throw new TypeError( '"this" is null or not defined' );
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
}

},{}],3:[function(require,module,exports){
module.exports = {
  /**
  *  Validatinator.utils.convertFieldValidationsToArray(Object validationInformation);
  *
  *  Convert string field validations to array field validations.
  *  "required|min:5|max:10" => ["required", "min:5", "max:10"];
  *
  *  @Added: 12/16/2013
  */
  convertFieldValidationsToArray: function(validationInformation) {
    var fieldValidation,
        formName,
        fieldName;

    for (formName in validationInformation) {
      for (fieldName in validationInformation[formName]) {
        fieldValidation = validationInformation[formName][fieldName];

        // Go ahead and create a nicely formated array of each field validation;
        // if there is only a single field validation then
        // we will use an array literal to create our array ourselves.
        validationInformation[formName][fieldName] = (fieldValidation.contains("|")) ? fieldValidation.split("|") : [fieldValidation];
      }
    }

    return validationInformation;
  },

  /**
  *  Validatinator.utils.convertStringToBoolean(String stringRepresentation);
  *
  *  Converts string representations of the boolean values to their actual boolean
  *  values.  "true" => true, "false" => false.
  *
  *  @Added: 1/5/2014
  */
  convertStringToBoolean: function(stringRepresentation) {
    if (typeof stringRepresentation !== "string") {
      return stringRepresentation;
    }

    if (stringRepresentation.toLowerCase() === "false") {
      return false;
    }
    else if (stringRepresentation.toLowerCase() === "true") {
      return true;
    }

    return stringRepresentation;
  },

  /**
  *  Validatinator.utils.convertArrayValuesToEnglishString(Array arrayOfValues);
  *
  *  We loop through each of the array's values and concat it to an English string
  *  containing AND between the second to last and last element.
  *
  *  @Added: 1/17/2014
  */
  convertArrayValuesToEnglishString: function(arrayOfValues) {
    var i = 0,
        currentLength,
        finishedString = '';

    for (; i < arrayOfValues.length; i++) {
      currentLength = i + 1;

      if (currentLength === arrayOfValues.length) {
        finishedString += ' and ' + arrayOfValues[i];
      }
      else if (i === 0) {
        finishedString += arrayOfValues[i];
      }
      else {
        finishedString += ', ' + arrayOfValues[i];
      }
    }

    return finishedString;
  },

  /**
  *  Validatinator.utils.isValueFalsyInNature(Object value, Boolean strict);
  *
  *  Tests to see if the value provided is falsy in it's nature; i.e: undefined, null or false.
  *  If strict mode is set to true or no boolean is passed in for strict then 0 equates to false,
  *  else 0 equates to true.
  *
  *  @Added: 12/23/2013
  */
  isValueFalsyInNature: function(value, strict) {
    // Check to see if a value was passed to strict, if not then strict mode will be set to True by default.
    if (strict === undefined || strict === null) {
      strict = true;
    }

    // If value is undefined or null then it is automatically marked as falsy in nature and therefore we return true.
    if (value === undefined || value === null || value === "") {
      return true;
    }

    // If strict mode is set to true then 0 will be the same as false.
    return (strict) ? !value : value === false;
  },

  /**
  *  Validatinator.utils.isValueAnArray(Object value);
  *
  *  Checks to see if the value is an array, this will work for new Array(); and array
  *  literals.
  *
  *  @Added: 1/17/2014
  */
  isValueAnArray: function(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  },

  /**
  *  Validatinator.utils.isEmptyObject(Object obj);
  *
  *  Tests to see if an object is empty or not. Credit to jQuery.
  *
  *  @Added: 12/23/2013
  */
  isEmptyObject: function(obj) {
    var name;

    for (name in obj) {
      return false;
    }

    return true;
  },

  /**
  *  Validatinator.utils.getFieldValue(String form, String field);
  *
  *  Gets a field's value based off of the field's name attribute, but first we test
  *  to make sure that field's form name attribute is that of our currently validating field.
  *
  *  @Added: 1/17/2014
  */
  getFieldsValue: function(form, field) {
    var fieldsArray,
        fieldValue,
        fieldElement,
        i = 0;

    // Instead of trusting that the first element returned is the actual field, we will go ahead
    // and test if the field is truly within the form that we are validating against.
    fieldsArray = document.getElementsByName(field);

    for (; i<fieldsArray.length; i++) {
      fieldElement = fieldsArray[i];

      // We are running a simple test to see if the current field in the returned array is part of
      // our validating field or not.  If it is then grab it's value and break out of this test loop.
      if (fieldElement.form.name === form) {
        if ((fieldElement.type == 'radio' || fieldElement.type == 'checkbox') && !fieldValue) {
          if (fieldElement.checked) {
            fieldValue = fieldElement.value;
            break;
          } else {
            fieldValue = "";
            continue;
          }
        } else {
          fieldValue = fieldElement.value;
        }
        break;
      }
    }

    // If no field value was stored then we will assume that the field couldn't be found.  An empty string is
    // not considered a "non-stored field value."
    if (! fieldValue && fieldValue !== "")
    throw new Error("Couldn't find the field element " + field + " for the form " + form + ".");

    return fieldValue;
  }
};

},{}],4:[function(require,module,exports){
(function(window, def) {
  if (typeof module === "object" && module.exports) {
    module.exports = def();
  }

  window.Validatinator = def();
  require('./polyfills')();
})(window, function() {
  var extend = require('extend');

  function Validatinator(validationInformation, validationErrorMessages) {
    if (! (this instanceof Validatinator)) {
      throw new Error("Whoops!  Validatinator must be called with the new keyword!");
    }

    this.validationInformation = (validationInformation !== undefined) ? this.utils.convertFieldValidationsToArray(validationInformation) : {};
    this.errors = {};

    this.currentForm = null;
    this.currentField = null;

    this.validations.parent = this;
    this.messages.parent = this;
    this.validations.utils = this.utils;
    this.messages.utils = this.utils;

    if (validationErrorMessages !== undefined) {
      this.messages.overwriteAndAddNewMessages(validationErrorMessages);
    }
  }

  extend(Validatinator.prototype, {
    validations: require('./validations'),
    messages: require('./messages'),
    utils: require('./utils')
  });

  extend(Validatinator.prototype, {
    /**
    *  Validatinator.fails(String formName);
    *
    *  Starts the testing phase for each of the form field's validation methods,
    *  if any of them fails then we return true here and the user can expect the
    *  errors object will have populated information.
    *
    *  @Added: 12/23/2013
    */
    fails: function(formName) {
      // startValidations will always return true if we pass so let's go ahead and
      // flip that response.
      return ! this.startValidations(formName);
    },

    /**
    *  Validatinator.passes(String formName);
    *
    *  Starts the testing phase for each of the form field's validation methods,
    *  if any of them fail then we return false here and the user can expect the
    *  errors object will have populated information.
    *
    *  @Added: 12/23/2013
    */
    passes: function(formName) {
      return this.startValidations(formName);
    },

    /**
    *  Validatinator.startValidations(String formName);
    *
    *  Start the process of getting the each field that we will be validating for
    *  and retrieving the actual valdations we will be performing on that field.
    *
    *  @Added: 1/4/2014
    */
    startValidations: function(formName) {
      var currentFieldsValidations,
          currentFieldsValue,
          currentValidationMethodAndParameters,
          i;

      this.currentForm = formName;
      // Since we are doing a fresh validation let's make sure our errors are all fresh as well!
      this.errors = {};

      for (var fieldName in this.validationInformation[formName]) {
        this.currentField = fieldName;
        currentFieldsValidations = this.validationInformation[formName][fieldName];
        currentFieldsValue = this.utils.getFieldsValue(this.currentForm, this.currentField);

        for (i = 0; i < currentFieldsValidations.length; i++) {
          var method,
          parameters = [];

          currentValidationMethodAndParameters = this.getValidationMethodAndParameters(currentFieldsValidations[i]);
          method = currentValidationMethodAndParameters[0];

          // Check to see if our parameters actually exist, if they do, store them.
          if (currentValidationMethodAndParameters.length === 2) {
            parameters = currentValidationMethodAndParameters[1];
          }

          if (! this.callValidationMethodWithParameters(method, parameters, currentFieldsValue)) {
            parameters.shift();
            this.messages.addValidationErrorMessage(method, parameters);
          }
        }
      }

      return this.utils.isEmptyObject(this.errors);
    },

    /**
    *  Validatinator.getValidationMethodAndParameters(String validationString);
    *
    *  Take the current validationString and retreive the validation method and
    *  it's prepared parameters.  Makes a call to prepareParameters to get the
    *  parameters in a good enough state for the validation method calls.
    *
    *  @Added: 1/8/2014
    */
    getValidationMethodAndParameters: function(validationString) {
      var validationParameters,
          validationMethod;

      // If our validationString doesn't have any colons then we will assume
      // that the validation does not have any parameters and there is nothing furthur
      // we need to do.
      if (! validationString.contains(":")) {
        return [validationString];
      }

      validationParameters = validationString.split(":");
      // Remove the first element off the array as that is always going to be the validation
      // method, we are only worried about the parameters at this time.
      validationMethod = validationParameters.shift();

      // Add the the validation method back onto the front of a new array after we prepare the
      // parameters.
      return [validationMethod, this.prepareParameters(validationParameters)];
    },


    /**
    *  Validatinator.prepareParameters(Array validationParameters)
    *
    *  Preps the parameters so they can be used when making the validation calls.
    *
    *  @Added: 1/5/2014
    */
    prepareParameters: function(validationParameters) {
      var i = 0,
          j = 0;

      // We need to loop through each of the "extra parameters" and furthur split the `parameters` if need be.
      for (; i < validationParameters.length; i++) {
        // Check to see if we have third level "parameters" that will be transformed into an array for specific
        // validation methods.  i.e:  not_in:foo,bar,baz.
        if (validationParameters[i].contains(",")) {
          validationParameters[i] = validationParameters[i].split(",");

          // Since there was third level "parameters" we will go ahead and loop through each of the elements and
          // trim away any whitespace and convert falsey or truthy values to their boolean representations.
          for (; j < validationParameters[i].length; j++) {
            validationParameters[i][j] = this.utils.convertStringToBoolean(validationParameters[i][j].trim());
          }
        } else {
          // Trim any whitespace and convert falsy or truthy values to their boolean representations
          validationParameters[i] = this.utils.convertStringToBoolean(validationParameters[i].trim());
        }
      }

      return validationParameters;
    },

    /**
    *  Validatinator.callValidationMethodWithParameters(String method, Array parameters, Object fieldValue);
    *
    *  Attempts to call the validation method supplied with the provided parameters if
    *  any parameters exist, if they don't then just call the validation method with
    *  the current validating field's value.
    *
    *  @Added: 1/9/2014
    */
    callValidationMethodWithParameters: function(method, parameters, fieldValue) {
      // We will be using this variable to prepend the fieldValue variable to the parameters variable.  We
      // do this so we can use the .apply Function method.
      if (! (method in this["validations"])) {
        throw new Error("Validation does not exist: " + method);
      }

      if (! parameters) {
        return this["validations"][method](fieldValue);
      }

      // We do this so we can use the .apply Function method below.  All parameters for each method call will be based
      // on the parameters array.
      parameters.unshift(fieldValue);

      // this.validations makes sure the scope that is used during the validation call is within the validations scope and
      // first value of the parameters array is actually the field's value.  We have to do this as .apply will distribute
      // out the parameters array as different parameters for each index.  So ["value", ["5", "10"]] passed to between would be
      // between(value, [5, 10]);
      return this["validations"][method].apply(this.validations, parameters);
    }
  });

  return Validatinator;
});

},{"./messages":1,"./polyfills":2,"./utils":3,"./validations":5,"extend":6}],5:[function(require,module,exports){
module.exports = {
  /**
  *  Validatinator.validations.accepted(String/Number fieldValue);
  *
  *  Check to make sure the field value is of an accepted type.
  *  Accepted Types: true and 1.
  *
  *  @Added: 12/23/2013
  *  @Modified: 4/4/2014
  */
  accepted: function(fieldValue) {
    // Instead of using the field's value we want to see if the field is checked or not, simple!
    // If you notice in the core file we store the field's name attribute in the currentField property,
    // hence why we need to go through this extra step to actually retrieve the current field's DOM Object.
    return document.getElementsByName(this.parent.currentField)[0].checked;
  },

  /**
  *  Validatinator.validations.alpha(String/Number fieldValue);
  *
  *  Check to make sure the field's value is only of alpha characters.
  *
  *  @Added: 12/24/2013
  */
  alpha: function(fieldValue) {
    var alphaReg = /^[a-zA-Z]+$/;

    // We won't check to see if the value is a string because our regex will
    // handle that for us.
    if (this.utils.isValueFalsyInNature(fieldValue)) {
      return false;
    }

    return alphaReg.test(fieldValue);
  },

  /**
  *  Validatinator.validations.alphaDash(String/Number fieldValue);
  *
  *  Check to make sure the field's value is only of alpha, underscore and hyphen characters.
  *
  *  @Added: 12/24/2013
  */
  alphaDash: function(fieldValue) {
    var alphaDashReg = /^[a-zA-Z-_]+$/;

    if (this.utils.isValueFalsyInNature(fieldValue)) {
      return false;
    }

    return alphaDashReg.test(fieldValue);
  },

  /**
  *  Validatinator.validations.alphaNum(String/Number fieldValue);
  *
  *  Checks to make sure our field's value only contains alpha, underscore, hyphen and numerical
  *  characters.
  *
  *  @Added: 12/25/2013 *CHRISTMAS DAY!*
  */
  alphaNum: function(fieldValue) {
    var alphaNumReg = /^[a-zA-Z-_0-9]+$/;

    if (this.utils.isValueFalsyInNature(fieldValue)) {
      return false;
    }

    return alphaNumReg.test(fieldValue);
  },

  /**
  *  Validatinator.validations.between(String/Number fieldValue, Array minMax));
  *
  *  Checks to make sure the field value supplied is between the minimum value and maximum
  *  value.
  *
  *  @Added: 12/25/2013 *CHRISTMAS DAY!*
  */
  between: function(fieldValue, minMax) {
    var min = Number(minMax[0]),
        max = Number(minMax[1]);

    if (isNaN(min) || isNaN(max)) {
      throw new Error("min and max must both be numbers in the `between` validation.");
    }

    return (min <= fieldValue && fieldValue <= max);
  },

  /**
  *  Validatinator.validations.betweenLength(String/Number fieldValue, Array minMax);
  *
  *  Checks to make sure the field value supplied has a length that is between the min and max
  *  values supplied.  The fieldValue will be type casted to a String as a safe measure, but this
  *  can yield unexpected results so be wary of passing in objects, arrays and boolean values.
  *
  *  @Added: 1/20/2014
  */
  betweenLength: function(fieldValue, minMax) {
    var min = Number(minMax[0]),
        max = Number(minMax[1]),
        fieldValueLength = String(fieldValue).length;

    if (isNaN(min) || isNaN(max)) {
      throw new Error("min and max must both be numbers in the `betweenLength` validation.");
    }

    return (min <= fieldValueLength && fieldValueLength <= max);
  },

  /**
  *  Validatinator.validations.contains(String/Number fieldValue, Array containsArray);
  *
  *  Checks to make sure the field's value is contained within the
  *  contains array.
  *
  *  @Added: 1/4/2014
  */
  contains: function(fieldValue, containsArray) {
    return containsArray.indexOf(fieldValue) !== -1;
  },

  /**
  *  Validatinator.validations.dateBefore(String fieldValue, String suppliedDate);
  *
  *  Checks to see whether or not fieldValue is set to a date that came BEFORE
  *  suppliedDate.
  *
  *  @Added: 3/6/2015
  */
  dateBefore: function(fieldValue, suppliedDate) {
    return Date.parse(fieldValue) < Date.parse(suppliedDate);
  },

  /**
  *  Validatinator.validations.dateAfter(String fieldValue, String supplieDate);
  *
  *  Checks to see whether or not fieldValue is set to a date that comes AFTER
  *  suppliedDate.
  *
  *  @Added: 3/6/2015
  */
  dateAfter: function(fieldValue, suppliedDate) {
    // If the value is not before our supplied date then it must be after!
    return ! this.dateBefore(fieldValue, suppliedDate);
  },

  /**
  *  Validatinator.validations.different(String/Number fieldValue, String/Number differentFieldValue, Boolean strict);
  *
  *  Checks to make sure the two field value's provided are, in fact, different in value.
  *
  *  @Added: 12/26/2013
  */
  different: function(fieldValue, differentFieldName, strict) {
    // Since we are checking to see if the field's values are different then we will
    // test it against our confirmed validation and just flip the returned value.
    return ! this.same(fieldValue, differentFieldName, strict);
  },

  /**
  *  Validatinator.validations.digitsLength(String/Number fieldValue, Number length);
  *
  *  Checks to make sure the field value is only numerical and that the length of the value
  *  is exactly the length supplied.
  *
  *  @Added: 12/26/2013
  */
  digitsLength: function(fieldValue, length) {
    var fieldValueLength = String(fieldValue).length,
        length = Number(length);

    if (isNaN(length)) {
      throw new Error("length must be of numerical value in the `digitsLength` validation.");
    }

    if (! this.number(fieldValue)) {
      return false;
    }

    return fieldValueLength === length;
  },

  /**
  *  Validatinator.validations.digitsBetween(String/Number fieldValue, Number minLength, Number maxLength);
  *
  *  Checks to make sure the field value supplied is only numerical and that the length of the value
  *  is between or equal to the min and max length supplied.
  *
  *  @Added: 12/26/2013
  */
  digitsLengthBetween: function(fieldValue, minMaxLength) {
    var minLength = Number(minMaxLength[0]),
        maxLength = Number(minMaxLength[1]),
        fieldValueLength = String(fieldValue).length;

    if (isNaN(minLength) || isNaN(maxLength)) {
      throw new Error("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");
    }

    if (! this.number(fieldValue)) {
      return false;
    }

    return (minLength <= fieldValueLength && fieldValueLength <= maxLength);
  },

  /**
  *  Validatinator.validations.email(String/Number fieldValue);
  *
  *  Checks to make sure the field value supplied is a valid email address, in format.
  *
  *  @Added: 12/27/2013
  */
  email: function(fieldValue) {
    var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,10})+$/;
    return emailReg.test(fieldValue);
  },

  /**
  *  Validatiantor.validations.ipvFour(String/Number fieldValue);
  *
  *  Checks to make sure the field value supplied is a valid ipv4 address based off
  *  of the RFC specs provided.
  *
  *  @Added: 12/30/2013
  */
  ipvFour: function(fieldValue) {
    var ipvFourReg,
        maxByteValue = 255;

    // Get an array with all four of our integer values.
    ipvFourReg = fieldValue.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);

    // Here we make sure all of our values are less than or equal to 255 as in the RFC for ipv4 it states that each decimal
    // separated value is 1 byte and the max integer value we can create with 1 byte is 255.  0.0.0.0 >=< 255.255.255.255
    return (ipvFourReg !== null && ipvFourReg[1] <= maxByteValue && ipvFourReg[2] <= maxByteValue && ipvFourReg[3] <= maxByteValue && ipvFourReg[4] <= maxByteValue);
  },

  /**
  *  Validatinator.validations.max(String/Number fieldValue, Number max);
  *
  *  Checks to make sure the field value supplied is less than or equal to the max
  *  value supplied.
  *
  *  @Added: 12/30/2013
  */
  max: function(fieldValue, max) {
    max = Number(max);

    if (isNaN(max)) {
      throw new Error("max must be of numerical value in the `max` validation.");
    }

    // Since we are only checking the max value we will go ahead and call the between method
    // but we will pass -Infinity in as the min value as there is no min.
    return this.between(fieldValue, [-Infinity, max]);
  },

  /**
  *  Validatinator.validations.maxLength(String/Number fieldValue, Number maxLength);
  *
  *  Checks to make sure the field value supplied has a length that is less than or equal to the
  *  max value supplied.
  *
  *  @Added: 1/20/2014
  */
  maxLength: function(fieldValue, max) {
    max = Number(max);

    if (isNaN(max)) {
      throw new Error("max must be a numerical value in the `max` validation.");
    }

    // Since we are only checking the max value we will go ahead and call the betweenLength method
    // but we will pass -Infinity in as the min value as there is no min.
    return this.betweenLength(fieldValue, [-Infinity, max]);
  },

  /**
  *  Validatinator.validations.min(String/Number fieldValue, Number min);
  *
  *  Checks to make sure the field value supplied is greater than or equal to the min
  *  value supplied.
  *
  *  @Added: 12/30/2013
  */
  min: function(fieldValue, min) {
    min = Number(min);

    if (isNaN(min)) {
      throw new Error("min must be of numerical value in the `min` validation.");
    }

    // Since we are only checking the min value we will go ahead and call the between method
    // but we will pass Inifinity in as the max value as there is no max.
    return this.between(fieldValue, [min, Infinity]);
  },

  /**
  *  Validatinator.validations.minLength(String/Number fieldValue, Number min);
  *
  *  Checks to make sure the field value supplied has a length that is greater than or equal to the
  *  min value supplied.
  *
  *  @Added: 1/20/2014
  */
  minLength: function(fieldValue, min) {
    min = Number(min);

    if (isNaN(min)) {
      throw new Error("min must be a numerical value in the `minLength` validation.");
    }

    // Since we are only checking the min value we will go ahead and call the betweenLength method
    // but we will pass Inifinity in as the max value as there is no max.
    return this.betweenLength(fieldValue, [min, Infinity]);
  },

  /**
  *  Validatinator.validations.notIn(String/Number fieldValue, Array containsArray);
  *
  *  Checks to make sure the field's value is not contained within the
  *  contains array.
  *
  *  @Added: 1/4/2014
  */
  notIn: function(fieldValue, containsArray) {
    return ! this.contains(fieldValue, containsArray);
  },

  /**
  *  Validatinator.validations.number(String/Number fieldValue);
  *
  *  Check to make sure the field value supplied is a valid number; int, float, double, etc.
  *
  *  @Added: 12/27/2013
  */
  number: function(fieldValue) {
    if (fieldValue === null || fieldValue === undefined) {
      return false;
    }

    fieldValue = Number(fieldValue);
    // If it != NaN then it is a number.
    return (! isNaN(fieldValue));
  },

  /**
  *  Validatinator.validations.required(String/Number fieldValue);
  *
  *  Simply checks to see if our value exists or not.
  *
  *  @Added: 12/23/2013
  */
  required: function(fieldValue) {
    // Flip the boolean return value because if the value is falsy in nature then it returns
    // true; we want to return true if the value exists, not if it is falsy.
    return ! this.utils.isValueFalsyInNature(fieldValue, false);
  },

  /**
  * Validatinator.validations._required_if(
  *                               String/Number fieldValue,
  *                               String testedFieldsName,
  *                               String/Number valueToTestAgainst,
  *                               Boolean not
  *                           )
  *
  * More or less a hidden method that the requiredIf and requiredIfNot method's
  * use to help keep code DRY.
  *
  * @Added: 9/17/2014
  */
  _required_if: function(fieldValue, testedFieldsName, valueToTestAgainst, not) {
    var testedFieldsValue = this.utils.getFieldsValue(this.parent.currentForm, testedFieldsName);

    if ((not && testedFieldsValue !== valueToTestAgainst) || (! not && testedFieldsValue === valueToTestAgainst)) {
      return this.required(fieldValue);
    }

    return true;
  },

  /**
  *  Validatinator.validations.requiredIf(String/Number fieldValue, String testedFieldsName, String/Number valueToTestAgainst);
  *
  *  The field under validation must be present if the field
  *  that is being tested, not the validation one, is equal to value.
  *
  *  @Added: 1/26/2014
  */
  requiredIf: function(fieldValue, testedFieldsName, valueToTestAgainst) {
    return this._required_if(fieldValue, testedFieldsName, valueToTestAgainst, false);
  },

  /**
  *  Validatinator.validations.requiredIfNot(String/Number fieldValue, String testedFieldsName, String/Number valueToTestAgainst);
  *
  *  This validation is exactly the same as the requiredIf validation except
  *  that the field we are validating against is only required IF the field
  *  being tested, not the validation one, is NOT equal to the value.
  *
  *  @Added: 1/26/2014
  */
  requiredIfNot: function(fieldValue, testedFieldsName, valueToTestAgainst) {
    return this._required_if(fieldValue, testedFieldsName, valueToTestAgainst, true);
  },

  /**
  *  Validatinator.validations.same(String/Number fieldValue, String/Number sameFieldValue, Boolean strict);
  *
  *  Checks to make sure the two field values provided are, in fact, the same in value.
  *
  *  @Added: 1/4/2014
  */
  same: function(fieldValue, sameFieldName, strict) {
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
  *  Validatinator.validations.url(String fieldValue);
  *
  *  Checks to make sure the field's value is, in fact, a real url.
  *
  *  @Added: 1/4/2014
  */
  url: function(fieldValue) {
    var urlReg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlReg.test(fieldValue);
  }
};

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
