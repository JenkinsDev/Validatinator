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
     *  Validatinator.validations.alpha_dash(fieldValue);
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
     *  Validatinator.validations.required(fieldValue);
     *
     *  Checks to see if our value exists or not.
     *
     *  @Added: 12/23/2013
     */
    required: function(fieldValue) {
        // Flip the boolean return value because if the value is falsy in nature then it returns
        // true; we want to return true if the value exists, not if it is falsy.
        return !this.parent.utils.isValueFalsyInNature(fieldValue, false);
    },
}