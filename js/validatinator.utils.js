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

        if (type === "object") {
            if (obj === null)
                return null;

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
    }
}