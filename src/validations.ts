const ALPHA_REGEX = new RegExp(/^[a-zA-Z]+$/);
const ALPHA_DASH_REGEX = new RegExp(/^[a-zA-Z-_]+$/);
const ALPHA_NUMERIC_REGEX = new RegExp(/^[a-zA-Z0-9]+$/);
const ALPHA_NUMERIC_DASH_REGEX = new RegExp(/^[a-zA-Z0-9-_]+$/);

export default class HTMLFormValidations {

    /**
     * Checks to see if the field has been accepted.
     */
    static accepted(form: HTMLFormElement, field: HTMLCheckboxElement) {
        return field.checked === true;
    }

    static alpha(form: HTMLFormElement, field: HTMLInputElement) {
        return ALPHA_REGEX.test(field.value);
    }

    static alphaDash(form: HTMLFormElement, field: HTMLInputElement) {
        return ALPHA_DASH_REGEX.test(field.value);
    }

    static alphaDash(form: HTMLFormElement, field: HTMLInputElement) {
        return ALPHA_NUMERIC_REGEX.test(field.value);
    }

    static alphaDash(form: HTMLFormElement, field: HTMLInputElement) {
        return ALPHA_NUMERIC_DASH_REGEX.test(field.value);
    }

    static between(
        form: HTMLFormElement,
        field: HTMLInputElement,
        min: string | number,
        max: string | number
    ) {
        const value = parseInt(field.value, 10);
        min = parseInt(min, 10);
        max = parseInt(max, 10);

        if (isNaN(min) || isNaN(max)) {
            throw new Error("min and max must both be numbers in the `between` validation.");
        }

        return (min <= value && value <= max);
    }

    static betweenLength(fieldValue, minMax) {
        var min = Number(minMax[0]),
            max = Number(minMax[1]),
            fieldValueLength = String(fieldValue).length;

        if (isNaN(min) || isNaN(max)) {
            throw new Error("min and max must both be numbers in the `betweenLength` validation.");
        }

        return (min <= fieldValueLength && fieldValueLength <= max);
    }

    static contains(fieldValue, containsArray) {
        return containsArray.indexOf(fieldValue) !== -1;
    }

    static dateBefore(fieldValue, suppliedDate) {
        return Date.parse(fieldValue) < Date.parse(suppliedDate);
    }

    static dateAfter(fieldValue, suppliedDate) {
        // If the value is not before our supplied date then it must be after!
        return ! this.dateBefore(fieldValue, suppliedDate);
    }

    static different(fieldValue, differentFieldName, strict) {
        // Since we are checking to see if the field's values are different then we will
        // test it against our confirmed validation and just flip the returned value.
        return ! this.same(fieldValue, differentFieldName, strict);
    }

    static digitsLength(fieldValue, length) {
        var fieldValueLength = String(fieldValue).length,
            length = Number(length);

        if (isNaN(length)) {
            throw new Error("length must be of numerical value in the `digitsLength` validation.");
        }

        if (! this.number(fieldValue)) {
            return false;
        }

        return fieldValueLength === length;
    }

    static digitsLengthBetween(fieldValue, minMaxLength) {
        var minLength = Number(minMaxLength[0]),
            maxLength = Number(minMaxLength[1]),
            fieldValueLength = String(fieldValue).length;

        if (isNaN(minLength) || isNaN(maxLength)) {
            throw new Error("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");
        }

        if (! this.number(fieldValue)) {
            return false;
        }

        return (minLength <= fieldValueLength && fieldValueLength <= maxLength);
    }

    email: function(fieldValue) {
        var emailReg = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        return emailReg.test(fieldValue);
    }

    ipvFour: function(fieldValue) {
        var ipvFourReg,
            maxByteValue = 255;

        // Get an array with all four of our integer values.
        ipvFourReg = fieldValue.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);

        // Here we make sure all of our values are less than or equal to 255 as in the RFC for ipv4 it states that each decimal
        // separated value is 1 byte and the max integer value we can create with 1 byte is 255.  0.0.0.0 >=< 255.255.255.255
        return (ipvFourReg !== null && ipvFourReg[1] <= maxByteValue && ipvFourReg[2] <= maxByteValue && ipvFourReg[3] <= maxByteValue && ipvFourReg[4] <= maxByteValue);
    }

    max: function(fieldValue, max) {
        max = Number(max);

        if (isNaN(max)) {
            throw new Error("max must be of numerical value in the `max` validation.");
        }

        // Since we are only checking the max value we will go ahead and call the between method
        // but we will pass -Infinity in as the min value as there is no min.
        return this.between(fieldValue, [-Infinity, max]);
    }

    maxLength: function(fieldValue, max) {
        max = Number(max);

        if (isNaN(max)) {
            throw new Error("max must be a numerical value in the `max` validation.");
        }

        // Since we are only checking the max value we will go ahead and call the betweenLength method
        // but we will pass -Infinity in as the min value as there is no min.
        return this.betweenLength(fieldValue, [-Infinity, max]);
    }

    min: function(fieldValue, min) {
        min = Number(min);

        if (isNaN(min)) {
            throw new Error("min must be of numerical value in the `min` validation.");
        }

        // Since we are only checking the min value we will go ahead and call the between method
        // but we will pass Inifinity in as the max value as there is no max.
        return this.between(fieldValue, [min, Infinity]);
    }

    minLength: function(fieldValue, min) {
        min = Number(min);

        if (isNaN(min)) {
            throw new Error("min must be a numerical value in the `minLength` validation.");
        }

        // Since we are only checking the min value we will go ahead and call the betweenLength method
        // but we will pass Inifinity in as the max value as there is no max.
        return this.betweenLength(fieldValue, [min, Infinity]);
    }

    notIn: function(fieldValue, containsArray) {
        return ! this.contains(fieldValue, containsArray);
    }

    number: function(fieldValue) {
        if (fieldValue === null || fieldValue === undefined) {
            return false;
        }

        fieldValue = Number(fieldValue);
        // If it != NaN then it is a number.
        return (! isNaN(fieldValue));
    }

    required: function(fieldValue) {
        // Flip the boolean return value because if the value is falsy in nature then it returns
        // true; we want to return true if the value exists, not if it is falsy.
        return ! this.utils.isValueFalsyInNature(fieldValue, false);
    }

    _required_if: function(fieldValue, testedFieldsName, valueToTestAgainst, not) {
        var testedFieldsValue = this.utils.getFieldsValue(this.parent.currentForm, testedFieldsName);

        if ((not && testedFieldsValue !== valueToTestAgainst) || (! not && testedFieldsValue === valueToTestAgainst)) {
            return this.required(fieldValue);
        }

        return true;
    }

    /**
     *  Validatinator.validations.requiredIf(String/Number fieldValue, String testedFieldsName, String/Number valueToTestAgainst);
     *
     *  The field under validation must be present if the field
     *  that is being tested, not the validation one, is equal to value.
     *
     *  @Added: 1/26/2014
     */
    requiredIf: function(fieldValue, testedFieldsName, valueToTestAgainst) {
        return this._required_if(fieldValue, testedFieldsName, valueToTestAgainst, false);
    }

    requiredIfNot: function(fieldValue, testedFieldsName, valueToTestAgainst) {
        return this._required_if(fieldValue, testedFieldsName, valueToTestAgainst, true);
    }

    same: function(fieldValue, sameFieldName, strict) {
        var sameFieldValue = this.utils.getFieldsValue(this.parent.currentForm, sameFieldName);

        if (strict === undefined || strict === null) {
            strict = true;
        }

        // We cast our field values to strings so all values are of the same data type and we
        // can make use of the toLowerCase method.
        fieldValue = String(fieldValue);
        sameFieldValue = String(sameFieldValue);

        if (strict) {
            return fieldValue === sameFieldValue;
        }

        return fieldValue.toLowerCase() === sameFieldValue.toLowerCase();
    }

    url: function(fieldValue) {
        var urlReg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return urlReg.test(fieldValue);
    }

}
