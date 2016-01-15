/**
 * Copyright (c) 2013-2015 David Jenkins
 * See the file license.txt for copying permission.
 */

Validatinator.prototype.utils = {
    /**
     *  Validatinator.utils.convertFieldValidationsToArray(Object validationInformation);
     *
     *  Convert string field validations to array field validations.
     *  "required|min:5|max:10" => ["required", "min:5", "max:10"];
     *
     *  @Added: 12/16/2013
     */
    convertFieldValidationsToArray: function(validationInformation) {
        var fieldValidation;

        // Loop through the top level forms.
        for (var formName in validationInformation) {
            // Loop through each, individual, field that has validation tests attached to it.
            for (var fieldName in validationInformation[formName]) {
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
     *  Validatinator.utils.convertStringToBoolean(String stringRepresentation);
     *
     *  Converts string representations of the boolean values to their actual boolean
     *  values.  "true" => true, "false" => false.
     *
     *  @Added: 1/5/2014
     */
    convertStringToBoolean: function(stringRepresentation) {
        if (typeof stringRepresentation !== "string") {
            return stringRepresentation;
        }

        if (stringRepresentation.toLowerCase() === "false") {
            return false;
        }
        else if (stringRepresentation.toLowerCase() === "true") {
            return true;
        }

        return stringRepresentation;
    },

    /**
     *  Validatinator.utils.convertArrayValuesToEnglishString(Array arrayOfValues);
     *
     *  We loop through each of the array's values and concat it to an English string
     *  containing AND between the second to last and last element.
     *
     *  @Added: 1/17/2014
     */
    convertArrayValuesToEnglishString: function(arrayOfValues) {
        var i = 0,
            currentLength,
            finishedString = '';

        for (; i < arrayOfValues.length; i++) {
            currentLength = i + 1;

            if (currentLength === arrayOfValues.length) {
                finishedString += ' and ' + arrayOfValues[i];
            }
            else if (i === 0) {
                finishedString += arrayOfValues[i];
            }
            else {
                finishedString += ', ' + arrayOfValues[i];
            }
        }

        return finishedString;
    },

    /**
     *  Validatinator.utils.isValueFalsyInNature(Object value, Boolean strict);
     *
     *  Tests to see if the value provided is falsy in it's nature; i.e: undefined, null or false.
     *  If strict mode is set to true or no boolean is passed in for strict then 0 equates to false,
     *  else 0 equates to true.
     *
     *  @Added: 12/23/2013
     */
    isValueFalsyInNature: function(value, strict) {
        // Check to see if a value was passed to strict, if not then strict mode will be set to True by default.
        if (strict === undefined || strict === null) {
            strict = true;
        }

        // If value is undefined or null then it is automatically marked as falsy in nature and therefore we return true.
        if (value === undefined || value === null || value === "") {
            return true;
        }

        // If strict mode is set to true then 0 will be the same as false.
        return (strict) ? !value : value === false;
    },

    /**
     *  Validatinator.utils.isValueAnArray(Object value);
     *
     *  Checks to see if the value is an array, this will work for new Array(); and array
     *  literals.
     *
     *  @Added: 1/17/2014
     */
    isValueAnArray: function(value) {
        return Object.prototype.toString.call(value) === "[object Array]";
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

        for (name in obj) {
            return false;
        }

        return true;
    },

    /**
     *  Validatinator.utils.getFieldValue(String form, String field);
     *
     *  Gets a field's value based off of the field's name attribute, but first we test
     *  to make sure that field's form name attribute is that of our currently validating field.
     *
     *  @Added: 1/17/2014
     */
    getFieldsValue: function(form, field) {
        var fieldsArray,
            fieldValue,
            fieldElement,
            i = 0;

        // Instead of trusting that the first element returned is the actual field, we will go ahead
        // and test if the field is truly within the form that we are validating against.
        fieldsArray = document.getElementsByName(field);

        for (; i<fieldsArray.length; i++) {
            fieldElement = fieldsArray[i];

            // We are running a simple test to see if the current field in the returned array is part of
            // our validating field or not.  If it is then grab it's value and break out of this test loop.
            if (fieldElement.form.name === form) {
                if((fieldElement.type == 'radio' || fieldElement.type == 'checkbox') && !fieldValue) {
                    if(fieldElement.checked) {
                        fieldValue = fieldElement.value;
                        break;
                    } else {
                        fieldValue = "";
                        continue;
                    }
                } else {
                    fieldValue = fieldElement.value;
                }
                break;
            }
        }

        // If no field value was stored then we will assume that the field couldn't be found.  An empty string is
        // not considered a "non-stored field value."
        if (! fieldValue && fieldValue !== "")
            throw new Error("Couldn't find the field element " + field + " for the form " + form + ".");

        return fieldValue;
    }
};
