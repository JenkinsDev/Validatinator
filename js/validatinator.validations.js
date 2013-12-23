Validatinator.prototype.validations = {
    required: function(fieldValue) {
    	if (fieldValue === "" || fieldValue === null || fieldValue === undefined)
    		return false;
        return true;
    }
}