/**
 * Copyright (c) 2013-2015 David Jenkins
 * See the file license.txt for copying permission.
 */

Validatinator.prototype.validations = {
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
        var emailReg = /[^\s@]+@[^\s@]+\.[^\s@]+/;
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
