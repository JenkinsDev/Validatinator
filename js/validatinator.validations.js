/**
 * Copyright (c) 2013-2014 David Jenkins
 * See the file license.txt for copying permission.
 */

Validatinator.prototype.validations = {
    /**
     *  Validatinator.validations.accepted(String/Number fieldValue);
     *
     *  Check to make sure the field value is of an accepted type.
     *  Accepted Types: "yes", "on", true and 1.
     *
     *  @Added: 12/23/2013
     */
    accepted: function(fieldValue) {
        // We can't call .toLowerCase(); on a non-string object so let's see if we are clear
        // here.
        if (this.utils.isValueFalsyInNature(fieldValue))
            return false;

        // Case sensitivity shouldn't matter here as long as our value is a string.
        fieldValue = (typeof fieldValue === "string") ? fieldValue.toLowerCase() : fieldValue;

        return (fieldValue === "yes" || fieldValue === "on" || fieldValue);
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
        if (this.utils.isValueFalsyInNature(fieldValue))
            return false;
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

        if (this.utils.isValueFalsyInNature(fieldValue))
            return false;
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

        if (this.utils.isValueFalsyInNature(fieldValue))
            return false;
        return alphaNumReg.test(fieldValue);
    },

    /**
     *  Validatinator.validations.between(String/Number fieldValue, Number min, Number max);
     *
     *  Checks to make sure the field value supplied is between the minimum value and maximum
     *  value.
     *  
     *  If the field value is of the numerical type then we test to make sure the numerical
     *  value is between the minimum and maximum.  If the field value is of the string data type then
     *  we test the string's length against the minimum and maximum values.
     *
     *  @Added: 12/25/2013 *CHRISTMAS DAY!*
     */
    between: function(fieldValue, minMax) {
        var min = Number(minMax[0]),
            max = Number(minMax[1]);

        if (isNaN(min) || isNaN(max))
            throw new Error("min and max must both be numbers in the `between` validation.");

        // If it is not not a number then we check it's value versus min and max.  If it is a NaN then we check it's length.
        if (isNaN(Number(fieldValue)))
            return (min <= fieldValue.length && fieldValue.length <= max);
        return (min <= fieldValue && fieldValue <= max);
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
        length = Number(length);
        
        if (!length || isNaN(length))
            throw new Error("length must be of numerical value in the `digitsLength` validation.");
        
        fieldValue = Number(fieldValue);

        if (isNaN(fieldValue))
            return false;

        // Even though we only want a numerical value, we cast our value to a string so we can
        // make use of the the .length property.
        return String(fieldValue).length === length;
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
            maxLength = Number(minMaxLength[1]);
        
        if (this.utils.isValueFalsyInNature(minLength) || this.utils.isValueFalsyInNature(maxLength) || isNaN(minLength) || isNaN(maxLength))
            throw new Error("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");

        fieldValue = Number(fieldValue);

        if (fieldValue === NaN)
            return false;

        // Even though we only want a numerical value, we cast our value to a string so we can
        // make use of the the .length property.
        fieldValueLength = String(fieldValue).length;

        return ((minLength <= fieldValueLength) && (fieldValueLength <= maxLength));
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
        return (ipvFourReg != null && ipvFourReg[1] <= maxByteValue && ipvFourReg[2] <= maxByteValue && ipvFourReg[3] <= maxByteValue && ipvFourReg[4] <= maxByteValue);
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

        if (this.utils.isValueFalsyInNature(max) || isNaN(max))
            throw new Error("max must be of numerical value in the `max` validation.");

        // Pass in false as a second parameter so we are not stuck in strict mode.  Strict mode
        // makes 0 equate to a falsy value in nature.
        if (this.utils.isValueFalsyInNature(fieldValue, false))
            return false;

        // If it is not not a number then we check it's value versus max.  If it is a NaN then we check it's length.
        if (isNaN(Number(fieldValue)))
            return fieldValue.length <= max;
        return fieldValue <= max;
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

        if (this.utils.isValueFalsyInNature(min) || isNaN(min))
            throw new Error("min must be of numerical value in the `min` validation.");

        // Pass in false as a second parameter so we are not stuck in strict mode.  Strict mode
        // makes 0 equate to a falsy value in nature.
        if (this.utils.isValueFalsyInNature(fieldValue, false))
            return false;

        // If it is not not a number then we check it's value versus max.  If it is a NaN then we check it's length.
        if (isNaN(Number(fieldValue)))
            return fieldValue.length >= min;
        return fieldValue >= min;
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
        if (! fieldValue)
            return false;

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
     *  Validatinator.validations.same(String/Number fieldValue, String/Number sameFieldValue, Boolean strict);
     *
     *  Checks to make sure the two field values provided are, in fact, the same in value.
     *
     *  @Added: 1/4/2014
     */
    same: function(fieldValue, sameFieldName, strict) {
        var sameFieldValue = this.utils.getFieldsValue(this.parent.currentForm, sameFieldName);
        
        if (strict === undefined || strict === null)
            strict = true;

        // We cast our field values to strings so all values are of the same data type and we
        // can make use of the toLowerCase method.
        fieldValue = String(fieldValue);
        sameFieldValue = String(sameFieldValue);

        if (strict)
            return fieldValue === sameFieldValue;
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
    },
};
