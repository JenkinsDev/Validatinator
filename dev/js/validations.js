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
  accepted: function(fieldValue) {
    return document.getElementsByName(this.parent.currentField)[0].checked;
  },

  /**
   * Checks to make sure the field's value only contains alpha characters.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  alpha: function(fieldValue) {
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
  alphaDash: function(fieldValue) {
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
  alphaNum: function(fieldValue) {
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
  between: function(fieldValue, minMax) {
    var min = Number(minMax[0]),
        max = Number(minMax[1]);

    if (isNaN(min) || isNaN(max)) {
      throw new Error("min and max must both be numbers in the `between` validation.");
    }

    return (min <= fieldValue && fieldValue <= max);
  },

  /**
   * Checks to make sure the field's value has a length that is between the
   * the min and max values.  The value to be checked will be casted to a String.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
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
   * Checks to make sure the field's value is contained within the
   * supplied array.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  contains: function(fieldValue, containsArray) {
    return containsArray.indexOf(fieldValue) !== -1;
  },

  /**
   * Checks to make sure the field's value is a date and that it
   * comes before the supplied date.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  dateBefore: function(fieldValue, suppliedDate) {
    return Date.parse(fieldValue) < Date.parse(suppliedDate);
  },

  /**
   * Check to make sure the field's value is a date and that it
   * comes after the date supplied.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  dateAfter: function(fieldValue, suppliedDate) {
    return Date.parse(fieldValue) > Date.parse(suppliedDate);
  },

  /**
   * Checks to make sure the field's value is different from the
   * supplied value.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  different: function(fieldValue, differentFieldName, strict) {
    return !this.same(fieldValue, differentFieldName, strict);
  },

  /**
   * Checks to make sure the field's value is only numerical and that
   * the length of the value is exactly the length supplied.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  digitsLength: function(fieldValue, length) {
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
  digitsLengthBetween: function(fieldValue, minMaxLength) {
    var minLength = Number(minMaxLength[0]),
        maxLength = Number(minMaxLength[1]),
        fieldValueLength = String(fieldValue).length;

    if (isNaN(minLength) || isNaN(maxLength)) {
      throw new Error("The min length and max length must both be numerical types in the `digitsLengthBetween` validation.");
    }

    if (! this.number(fieldValue)) {
      return false;
    }

    return (minLength <= fieldValueLength && fieldValueLength <= maxLength);
  },

  /**
   * Checks to make sure the field's value is a valid email address format.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  email: function(fieldValue) {
    var emailReg = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return emailReg.test(fieldValue);
  },

  /**
   * Checks to make sure the field's value supplied is a valid ipv4 address,
   * based on the RFC specs.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  ipvFour: function(fieldValue) {
    var ipSegments,
        ipSegment,
        ind;

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
  max: function(fieldValue, max) {
    max = Number(max);

    if (isNaN(max)) {
      throw new Error("max must be of numerical value in the `max` validation.");
    }

    return this.between(fieldValue, [-Infinity, max]);
  },

  /**
   * Checks to make sure the field's value has a length that is less than
   * or equal to the max length.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  maxLength: function(fieldValue, max) {
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
  min: function(fieldValue, min) {
    min = Number(min);

    if (isNaN(min)) {
      throw new Error("min must be of numerical value in the `min` validation.");
    }

    return this.between(fieldValue, [min, Infinity]);
  },

  /**
   * Checks to make sure the field's value has a length that is less than
   * or equal to the min length.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  minLength: function(fieldValue, min) {
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
  notIn: function(fieldValue, containsArray) {
    return ! this.contains(fieldValue, containsArray);
  },

  /**
   * Checks to make sure the field's value is a valid Number.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  number: function(fieldValue) {
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
  required: function(fieldValue) {
    // If the value isn't falsy in nature then required should
    // be true.
    return ! this.utils.isValueFalsyInNature(fieldValue, false);
  },

  /**
   * Protected method that is used to help keep the requiredIf and requiredIfNot
   * code DRY.
   *
   * @protected
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  _required_if: function(fieldValue, testedFieldsName, valueToTestAgainst, not) {
    var testedFieldsValue = this.utils.getFieldsValue(this.parent.currentForm,
                                                      testedFieldsName);

    if ((not && testedFieldsValue !== valueToTestAgainst) ||
        (!not && testedFieldsValue === valueToTestAgainst)) {
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
  requiredIf: function(fieldValue, testedFieldsName, valueToTestAgainst) {
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
  requiredIfNot: function(fieldValue, testedFieldsName, valueToTestAgainst) {
    return this._required_if(fieldValue, testedFieldsName, valueToTestAgainst, true);
  },

  /**
   * Checks to make sure the field's value is equal to the field value
   * provided.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
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
   * Checks to make sure the field's value is in correct URL format.
   *
   * @since 0.1.0-beta
   * @returns {Boolean}
   */
  url: function(fieldValue) {
    var urlReg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlReg.test(fieldValue);
  }
};

module.exports = Validations;
