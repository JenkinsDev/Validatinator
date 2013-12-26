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
		if (this.parent.utils.isValueFalsyInNature(fieldValue))
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

        if (this.parent.utils.isValueFalsyInNature(fieldValue))
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

        if (this.parent.utils.isValueFalsyInNature(fieldValue))
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

        if (this.parent.utils.isValueFalsyInNature(fieldValue))
            return false;
        return alphaNumReg.test(fieldValue);
    },

    /**
     *  Validatinator.validations.between(fieldValue, minLength, maxLength);
     *
     *  Checks to make sure our field's value's length is is between the minimum and maximum
     *  value passed in.
     *
     *  @Added: 12/25/2013 *CHRISTMAS DAY!*
     */
    between: function(fieldValue, minLength, maxLength) {
        var fieldValueType = this.parent.utils.getRealType(fieldValue);

        if (this.parent.utils.getRealType(minLength) !== "number" || this.parent.utils.getRealType(maxLength) !== "number")
            throw new Error("minLength and maxLength must both be numbers in the `between` validation.");

        // We only want to deal with string's and numbers (int, float, etc.)  If something else is supplied then
        // we will automatically fail.  Possible TODO: Change to throw an error?
        if (fieldValueType !== "string" && fieldValueType !== "number")
            return false;

        // If we are working with a number then we need to transfer it to a string so we can make use of the
        // .length property.
        fieldValue = (fieldValueType === "number") ? String(fieldValue) : fieldValue;

        if (minLength <= fieldValue.length && fieldValue.length <= maxLength)
            return true;
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

        if (strict)
            return !(fieldValue === differentFieldValue);
        return !(fieldValue.toLowerCase() === differentFieldValue.toLowerCase());
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
        return !(this.parent.utils.isValueFalsyInNature(fieldValue, false));
    },
}