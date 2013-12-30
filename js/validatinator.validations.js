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
        var fieldValueType = this.parent.utils.getRealType(fieldValue);

        if (this.utils.getRealType(min) !== "number" || this.utils.getRealType(max) !== "number")
            throw new Error("min and max must both be numbers in the `between` validation.");

        if (fieldValueType === "number")
            return (min <= fieldValue && fieldValue <= max);
        else if (fieldValueType === "string")
            return (min <= fieldValue.length && fieldValue.length <= max);

        // If our field's value type is not a string or numerical value then we will just return false.
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

        if (strict)
        	return fieldValue === confirmationFieldValue;
        return fieldValue.toLowerCase() === confirmationFieldValue.toLowerCase();
    },

    /**
     *  Validatinator.validations.different(fieldValue, differentFieldValue, strict);
     *
     *  Checks to make sure the two field value's provided are, in fact, different in value.
     *  All values are casted into their string representative and if strict is set to false
     *  then we will make sure to lowercase each value to make sure casing doesn't matter.
     *
     *  @Added: 12/26/2013
     */
    different: function(fieldValue, differentFieldValue, strict) {
        if (strict === undefined || strict === null)
            strict = true;

        fieldValue = String(fieldValue);
        differentFieldValue = String(differentFieldValue);

        // We need to flip the equality boolen as we are wanting to see if they are different or not.
        // False -> True; True -> False
        if (strict)
            return !(fieldValue === differentFieldValue);
        return !(fieldValue.toLowerCase() === differentFieldValue.toLowerCase());
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
        if (length === undefined || length === null || this.parent.utils.getRealType(length) !== "number")
            throw new Error("length must be of numerical value in the `digitsLength` validation.");

        if (this.utils.getRealType(fieldValue) !== "number")
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
        if (this.utils.isValueFalsyInNature(minLength) || this.utils.isValueFalsyInNature(maxLength)
                || this.utils.getRealType(minLength) !== "number" || this.utils.getRealType(maxLength) !== "number")
            throw new Error("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");

        if (this.utils.getRealType(fieldValue) !== "number")
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

        if (this.utils.getRealType(fieldValue) !== "string")
            return false;
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
        if (this.utils.isValueFalsyInNature(fieldValue))
            return false;

        // Get an array with all four of our integer values.
        var ipvFourReg = fieldValue.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);

        // Here we make sure all of our values are less than or equal to 255 as in the RFC for ipv4 it states that each decimal
        // separated value is 1 byte and the max integer value we can create with 1 byte is 255.  0.0.0.0 >=< 255.255.255.255
        return (ipvFourReg != null && ipvFourReg[1] <= 255 && ipvFourReg[2] <= 255 && ipvFourReg[3] <= 255 && ipvFourReg[4] <= 255);
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
        if (this.utils.isValueFalsyInNature(max) || this.utils.getRealType(max) !== "number")
            throw new Error("max must be of numerical value in the `max` validation.");

        if (this.utils.isValueFalsyInNature(fieldValue, false))
            return false;

        // If we are not working with a number then we need to go ahead and convert it to a number.
        var fieldValue = (this.utils.getRealType(fieldValue) !== "number") ? Number(fieldValue) : fieldValue;

        // Because we are handling the conversion of strings and such to "numbers" then we need to check to make sure
        // our value is not currently "Not A Number," if it is then we need to abort and return false.
        return (fieldValue !== NaN) ? fieldValue <= max : false;
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
        if (this.utils.isValueFalsyInNature(min) || this.utils.getRealType(min) !== "number")
            throw new Error("min must be of numerical value in the `min` validation.");

        if (this.utils.isValueFalsyInNature(fieldValue, false))
            return false;

        // If we are not working with a number then we need to go ahead and convert it to a number.
        var fieldValue = (this.utils.getRealType(fieldValue) !== "number") ? Number(fieldValue) : fieldValue;

        // Because we are handling the conversion of strings and such to "numbers" then we need to check to make sure
        // our value is not currently "Not A Number," if it is then we need to abort and return false.
        return (fieldValue !== NaN) ? fieldValue >= min : false;
    },

    /**
     *  Validatinator.validations.number(fieldValue);
     *
     *  Check to make sure the field value supplied is a valid number; int, float, double, etc.
     *
     *  @Added: 12/27/2013
     */
    number: function(fieldValue) {
        if (this.utils.isValueFalsyInNature(fieldValue, false) || this.utils.getRealType(fieldValue) !== "number")
            return false;
        return true;
    },

    /**
     *  Validatinator.validations.required(fieldValue);
     *
     *  Checks to see if our value exists or not.
     *
     *  @Added: 12/23/2013
     */
    required: function(fieldValue) {
        // Flip the boolean return value because if the value is falsy in nature then it returns
        // true; we want to return true if the value exists, not if it is falsy.
        return !(this.utils.isValueFalsyInNature(fieldValue, false));
    },
}