Validatinator.prototype.validations = {
	accepted: function(fieldValue) {
		// We can't call .toLowerCase(); on a non-string object so let's see if we are clear
		// here.
		if (this.parent.utils.isValueFalsyInNature(fieldValue))
			return false;

		// Case sensitivity shouldn't matter here as long as our value is a string.
		fieldValue = (typeof fieldValue === "string") ? fieldValue.toLowerCase() : fieldValue;

        if (fieldValue === "yes" || fieldValue === "on" || fieldValue)
        	return true;
        return false;
	},

	confirmed: function(fieldValue, confirmationFieldValue, strict) {
        if (strict === undefined || strict === null)
        	strict = true;

        if (strict)
        	return fieldValue === confirmationFieldValue;
        return fieldValue.toLowerCase() === confirmationFieldValue.toLowerCase();
    },

    required: function(fieldValue) {
    	if (this.parent.utils.isValueFalsyInNature(fieldValue))
    		return false;
        return true;
    },
}