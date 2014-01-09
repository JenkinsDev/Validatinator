Validatinator.prototype.validations = {
    /**
     *  Validatinator.validations.accepted(fieldValue);
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
     *  Validatinator.validations.alpha(fieldValue);
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
     *  Validatinator.validations.alphaDash(fieldValue);
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
     *  Validatinator.validations.alphaNum(fieldValue);
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
     *  Validatinator.validations.between(fieldValue, min, max);
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
    between: function(fieldValue, min, max) {
        var fieldValueType = typeof fieldValue;

        if (typeof min !== "number" || typeof max !== "number")
            throw new Error("min and max must both be numbers in the `between` validation.");

        if (fieldValueType === "number")
            return (min <= fieldValue && fieldValue <= max);
        else if (fieldValueType === "string")
            return (min <= fieldValue.length && fieldValue.length <= max);
        return false;
    },

    /**
     *  Validatinator.validations.confirmed(fieldValue, confirmationFieldValue, strict);
     *
     *  Checks to make sure the fieldValue equals the confirmationFieldValue.  If strict
     *  mode is set to on then case matters, if strict mode is off then it's case-insensitive.
     *
     *  @Added: 12/23/2013
     */
    confirmed: function(fieldValue, confirmationFieldValue, strict) {
        if (strict === undefined || strict === null)
            strict = true;

        // We cast our field values to strings so all values are of the same data type and we
        // can make use of the toLowerCase method.
        fieldValue = String(fieldValue);
        confirmationFieldValue = String(confirmationFieldValue);

        if (strict)
            return fieldValue === confirmationFieldValue;
        return fieldValue.toLowerCase() === confirmationFieldValue.toLowerCase();
    },

    /**
     *  Validatinator.validations.contains(fieldValue, containsArray);
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
     *  Validatinator.validations.different(fieldValue, differentFieldValue, strict);
     *
     *  Checks to make sure the two field value's provided are, in fact, different in value.
     *
     *  @Added: 12/26/2013
     */
    different: function(fieldValue, differentFieldValue, strict) {
        // Since we are checking to see if the field's values are different then we will
        // test it against our confirmed validation and just flip the returned value.
        return !this.confirmed(fieldValue, differentFieldValue, strict);
    },

    /**
     *  Validatinator.validations.digitsLength(fieldValue, length);
     *
     *  Checks to make sure the field value is only numerical and that the length of the value
     *  is exactly the length supplied.
     *
     *  @Added: 12/26/2013
     */ 
    digitsLength: function(fieldValue, length) {
        if (length === undefined || length === null || typeof length !== "number")
            throw new Error("length must be of numerical value in the `digitsLength` validation.");

        if (typeof fieldValue !== "number")
            return false;

        // Even though we only want a numerical value, we cast our value to a string so we can
        // make use of the the .length property.
        return String(fieldValue).length === length;
    },

    /**
     *  Validatinator.validations.digitsBetween(fieldValue, minLength, maxLength);
     *
     *  Checks to make sure the field value supplied is only numerical and that the length of the value
     *  is between or equal to the min and max length supplied.
     *
     *  @Added: 12/26/2013
     */
    digitsLengthBetween: function(fieldValue, minLength, maxLength) {
        if (this.utils.isValueFalsyInNature(minLength) || this.utils.isValueFalsyInNature(maxLength) || typeof minLength !== "number" || typeof maxLength !== "number")
            throw new Error("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");

        if (typeof fieldValue !== "number")
            return false;

        // Even though we only want a numerical value, we cast our value to a string so we can
        // make use of the the .length property.
        fieldValueLength = String(fieldValue).length;

        return ((minLength <= fieldValueLength) && (fieldValueLength <= maxLength));
    },

    /**
     *  Validatinator.validations.email(fieldValue);
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
     *  Validatiantor.validations.ipvFour(fieldValue);
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
     *  Validatinator.validations.max(fieldValue, max);
     *
     *  Checks to make sure the field value supplied is less than or equal to the max
     *  value supplied.
     *
     *  @Added: 12/30/2013
     */
    max: function(fieldValue, max) {
        var fieldValueType = typeof fieldValue;

        if (this.utils.isValueFalsyInNature(max) || typeof max !== "number")
            throw new Error("max must be of numerical value in the `max` validation.");

        // Pass in false as a second parameter so we are not stuck in strict mode.  Strict mode
        // makes 0 equate to a falsy value in nature.
        if (this.utils.isValueFalsyInNature(fieldValue, false))
            return false;

        if (fieldValueType === "number")
            return fieldValue <= max;
        else if (fieldValueType === "string")
            return fieldValue.length <= max;
        return false;
    },

    /**
     *  Validatinator.validations.min(fieldValue, min);
     *
     *  Checks to make sure the field value supplied is greater than or equal to the min
     *  value supplied.
     *
     *  @Added: 12/30/2013
     */
    min: function(fieldValue, min) {
        var fieldValueType = typeof fieldValue;

        if (this.utils.isValueFalsyInNature(min) || typeof min !== "number")
            throw new Error("min must be of numerical value in the `min` validation.");

        // Pass in false as a second parameter so we are not stuck in strict mode.  Strict mode
        // makes 0 equate to a falsy value in nature.
        if (this.utils.isValueFalsyInNature(fieldValue, false))
            return false;

        if (fieldValueType === "number")
            return fieldValue >= min;
        else if (fieldValueType === "string")
            return fieldValue.length >= min;
        return false;
    },

    /**
     *  Validatinator.validations.notIn(fieldValue, containsArray);
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
     *  Validatinator.validations.number(fieldValue);
     *
     *  Check to make sure the field value supplied is a valid number; int, float, double, etc.
     *
     *  @Added: 12/27/2013
     */
    number: function(fieldValue) {
        return typeof fieldValue === "number";
    },

    /**
     *  Validatinator.validations.required(fieldValue);
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
     *  Validatinator.validations.same(fieldValue, sameFieldValue, strict);
     *
     *  Checks to make sure the two field value's provided are, in fact, the same in value.
     *
     *  @Added: 1/4/2014
     */
    same: function(fieldValue, sameFieldValue, strict) {
        // Since our `different` field validation checks to see if two values are different we can use it
        // and flop the returned value.
        return ! this.different(fieldValue, sameFieldValue, strict);
    },

    url: function(fieldValue) {
        var urlReg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return urlReg.test(fieldValue);
    },
};
