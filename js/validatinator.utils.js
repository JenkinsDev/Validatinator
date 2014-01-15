Validatinator.prototype.utils = {
    /**
     *  Validatinator.utils.convertFieldValidationsToArray(validationInformation);
     *
     *  Convert string field validations to array field validations.
     *  "required|min:5|max:10" => ["required", "min:5", "max:10"];
     *
     *  @Added: 12/16/2013
     */
    convertFieldValidationsToArray: function(validationInformation) {
        var i,
            j,
            fieldValidation;

        // Loop through the top level forms.
        for (formName in validationInformation) {
            // Loop through each, individual, field that has validation tests attached to it.
            for (fieldName in validationInformation[formName]) {
                // Get the current field's validation string.
                fieldValidation = validationInformation[formName][fieldName];
                
                // Go ahead and create a nicely formated array of each field validation; if there is only a single field validation then 
                // we will use an array literal to create our array ourselves.
                validationInformation[formName][fieldName] = (fieldValidation.contains("|")) ? fieldValidation.split("|") : [fieldValidation];
            }
        }

        return validationInformation;
    },

    /**
     *  Validationator.utils.convertStringToBoolean(stringRepresentation);
     *
     *  Converts string representations of the boolean values to their actual boolean
     *  values.  "true" => true, "false" => false.
     *
     *  @Added: 1/5/2014
     */
    convertStringToBoolean: function(stringRepresentation) {
        if (typeof stringRepresentation !== "string")
            return stringRepresentation;

        if (stringRepresentation.toLowerCase() === "false")
            return false;
        else if (stringRepresentation.toLowerCase() === "true")
            return true;

        return stringRepresentation;
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
    },
    
    /**
     *  Validatinator.utils.isEmptyObject(Object obj);
     *
     *  Tests to see if an object is empty or not. Credit to jQuery.
     *
     *  @Added: 12/23/2013
     */
    isEmptyObject: function(obj) {
        var name;
        for (name in obj)
            return false;
        return true;
    }
};
