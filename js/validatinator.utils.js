Validatinator.prototype.utils = {
    /**
     *  Validatinator.utils.getRealType(obj);
     *
     *  Here we get the real type.  This is a nice little fix as typeof
     *  return "Object" with arrays, array literals and a few others.
     *
     *  @Added: 12/15/2013
     */
    getRealType: function(obj) {
        var type = (typeof obj).toLowerCase();

        // If the type of our object is "object" then there is a chance
        // that it is null, test that first.
        if (type === "object") {
            if (obj === null)
                return null;

            // If it's not null then let's get the constructor's name
            // so we have the `true` object type.
            return obj.constructor.name.toLowerCase();
        }

        return type;
    },

    /**
     *  Validatinator.utils.convertFieldValidationsToArray(validationInformation);
     *
     *  Convert string field validations to array field validations.
     *  "required|min:5|max:10" => ["required", "min:5", "max:10"];
     *
     *  @Added: 12/16/2013
     */
    convertFieldValidationsToArray: function(validationInformation) {
        var fieldValidation;

        // Loop through the top level forms.
        for (formName in validationInformation) {
            // Loop through each, individual, field that has validation tests attached to it.
            for (fieldName in validationInformation[formName]) {
                fieldValidation = validationInformation[formName][fieldName];

                // If the user has passed in an array then we want to go ahead and skip this portion as we `trust` them
                // to understand that there shouldn't be any pipe characters.
                if (this.getRealType(fieldValidation) !== "array")
                    validationInformation[formName][fieldName] = (fieldValidation.contains("|")) ? fieldValidation.split("|") : [fieldValidation];
            }
        }

        return validationInformation;
    },

    /**
     *  Validatinator.utils.isValueFalsyInNature(value, strict);
     *
     *  Tests to see if the value provided is falsy in it's nature; i.e: undefined, null or false.
     *  If strict mode is set to true or no boolean is passed in for strict then 0 equates to false,
     *  else 0 equates to true.
     *
     *  @Added: 12/23/2013
     */
    isValueFalsyInNature: function(value, strict) {
        // Check to see if a value was passed to strict, if not then strict mode will be set to True by default.
        if (strict === undefined || strict === null)
            strict = true;

        // If value is undefined or null then it is automatically marked as falsy in nature and therefore we return true.
        if (value === undefined || value === null || value === "")
            return true;

        // If strict mode is set to true then 0 will be the same as false.
        return (strict) ? !value : value === false;
    }
}