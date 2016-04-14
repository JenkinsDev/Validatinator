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
  convertFieldValidationsToArray: function(validationInfo) {
    for (var form in validationInfo) {
      for (var field in validationInfo[form]) {
        var validation = validationInfo[form][field];

        if (validation.contains("|")) {
          validationInfo[form][field] = validation.split("|");
        }
        else {
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
  convertStringToBoolean: function(strRepr) {
    if (typeof strRepr !== "string") {
      return strRepr;
    }

    if (strRepr.toLowerCase() === "false") {
      return false;
    }
    else if (strRepr.toLowerCase() === "true") {
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
  convertArrayValuesToEnglishString: function(arrayOfValues) {
    var i,
        currentLength,
        finishedString = '';

    for (i = 0; i < arrayOfValues.length; i++) {
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
   * Tests to see if the value provided is falsy in it's nature; i.e: undefined,
   * null or false. If strict mode is true then 0 equates to false.
   *
   * @param {Any} value - Value to check
   * @param {Boolean} strict - If not supplied, defaults to true
   * @returns {Boolean} True if the value if falsy in nature, otherwise false
   */
  isValueFalsyInNature: function(value, strict) {
    if (strict === undefined || strict === null) {
      strict = true;
    }

    if (value === undefined || value === null || value === "") {
      return true;
    }

    // If strict mode is set to true then 0 will be the same as false.
    return (strict) ? !value : value === false;
  },

  /**
   * Checks to see if the supplied value is an array.
   *
   * @param {Any} value - Value to check
   * @returns {Boolean}
   */
  isValueAnArray: function(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  },

  /**
   * Check to see if the supplied value is an empty object.
   *
   * @param {Object} obj - Value to check
   * @returns {Boolean}
   */
  isEmptyObject: function(obj) {
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
  getFieldsValue: function(form, field) {
    var fieldsArray,
        fieldValue,
        fieldEle,
        i;

    fieldsArray = document.getElementsByName(field);

    for (i=0; i<fieldsArray.length; i++) {
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
    if (!fieldValue && fieldValue !== "")
      throw new Error("Couldn't find the field element " + field + " for the form " + form + ".");

    return fieldValue;
  }
};

module.exports = Utils;