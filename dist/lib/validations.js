var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ALPHA_REGEX = new RegExp(/^[a-zA-Z]+$/);
var ALPHA_DASH_REGEX = new RegExp(/^[a-zA-Z-_]+$/);
var ALPHA_NUMERIC_REGEX = new RegExp(/^[a-zA-Z0-9]+$/);
var ALPHA_NUMERIC_DASH_REGEX = new RegExp(/^[a-zA-Z0-9-_]+$/);
var EMAIL_REGEX = new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/);
var IPV4_REGEX = new RegExp(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
var URL_REGEX = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
var HTMLFormValidations = (function () {
    function HTMLFormValidations() {
    }
    HTMLFormValidations.accepted = function (form, field) {
        return field.checked === true;
    };
    HTMLFormValidations.alpha = function (form, field) {
        return ALPHA_REGEX.test(field.value);
    };
    HTMLFormValidations.alphaDash = function (form, field) {
        return ALPHA_DASH_REGEX.test(field.value);
    };
    HTMLFormValidations.alphaNum = function (form, field) {
        return ALPHA_NUMERIC_REGEX.test(field.value);
    };
    HTMLFormValidations.alphaDashNum = function (form, field) {
        return ALPHA_NUMERIC_DASH_REGEX.test(field.value);
    };
    HTMLFormValidations.between = function (form, field, min, max) {
        var value = parseInt(field.value, 10);
        min = parseInt(min, 10);
        max = parseInt(max, 10);
        if (isNaN(min) || isNaN(max)) {
            throw new Error("min and max must both be numbers in the `between` validation.");
        }
        return (min <= value && value <= max);
    };
    HTMLFormValidations.betweenLength = function (form, field, min, max) {
        var _a, _b;
        var valueLength = (_b = (_a = field.value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        min = parseInt(min, 10);
        max = parseInt(max, 10);
        if (isNaN(min) || isNaN(max)) {
            throw new Error("min and max must both be numbers in the `betweenLength` validation.");
        }
        return (min <= valueLength && valueLength <= max);
    };
    HTMLFormValidations.contains = function (form, field) {
        var arr = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            arr[_i - 2] = arguments[_i];
        }
        return arr.indexOf(field.value) !== -1;
    };
    HTMLFormValidations.dateBefore = function (form, field, date) {
        return Date.parse(field.value) < Date.parse(date);
    };
    HTMLFormValidations.dateAfter = function (form, field, date) {
        return !this.dateBefore(form, field, date);
    };
    HTMLFormValidations.different = function (form, field, otherField, strict) {
        if (strict === void 0) { strict = true; }
        return !this.same(form, field, otherField, strict);
    };
    HTMLFormValidations.digitsLength = function (form, field, length) {
        var _a, _b;
        length = parseInt(length, 10);
        var valueLength = (_b = (_a = field.value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        if (isNaN(length)) {
            throw new Error("length must be of numerical value in the `digitsLength` validation.");
        }
        return valueLength == length;
    };
    HTMLFormValidations.digitsLengthBetween = function (form, field, minLength, maxLength) {
        var _a, _b;
        var valueLength = (_b = (_a = field.value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        minLength = parseInt(minLength, 10);
        maxLength = parseInt(maxLength, 10);
        if (isNaN(minLength) || isNaN(maxLength)) {
            throw new Error("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");
        }
        return (minLength <= valueLength && valueLength <= maxLength);
    };
    HTMLFormValidations.email = function (form, field) {
        return EMAIL_REGEX.test(field.value);
    };
    HTMLFormValidations.ipvFour = function (form, field) {
        var _a;
        var maxByteValue = 255;
        var ipvFourSegs = (_a = field.value) === null || _a === void 0 ? void 0 : _a.match(IPV4_REGEX);
        return (ipvFourSegs !== null &&
            parseInt(ipvFourSegs[1], 10) <= maxByteValue &&
            parseInt(ipvFourSegs[2], 10) <= maxByteValue &&
            parseInt(ipvFourSegs[3], 10) <= maxByteValue &&
            parseInt(ipvFourSegs[4], 10) <= maxByteValue);
    };
    HTMLFormValidations.max = function (form, field, max) {
        var value = parseInt(field.value, 10);
        max = parseInt(max, 10);
        if (isNaN(max)) {
            throw new Error("An integer must be provided with the `max` validation.");
        }
        return this.between(form, field, -Infinity, max);
    };
    HTMLFormValidations.maxLength = function (form, field, maxLength) {
        var _a, _b;
        var value = (_b = (_a = field.value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        maxLength = parseInt(maxLength, 10);
        if (isNaN(maxLength)) {
            throw new Error("An integer must be provided with the `maxLength` validation.");
        }
        return this.betweenLength(form, field, -Infinity, maxLength);
    };
    HTMLFormValidations.min = function (form, field, min) {
        var value = parseInt(field.value, 10);
        min = parseInt(min, 10);
        if (isNaN(min)) {
            throw new Error("An integer must be provided with the `min` validation.");
        }
        return this.between(form, field, min, Infinity);
    };
    HTMLFormValidations.minLength = function (form, field, minLength) {
        var _a, _b;
        var value = (_b = (_a = field.value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        minLength = parseInt(minLength, 10);
        if (isNaN(minLength)) {
            throw new Error("An integer must be provided with the `minLength` validation.");
        }
        return this.betweenLength(form, field, minLength, Infinity);
    };
    HTMLFormValidations.notIn = function (form, field) {
        var arr = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            arr[_i - 2] = arguments[_i];
        }
        return !this.contains.apply(this, __spreadArray([form, field], arr, false));
    };
    HTMLFormValidations.number = function (form, field) {
        return !isNaN(parseFloat(field.value));
    };
    HTMLFormValidations.required = function (form, field) {
        return (field.value !== null &&
            field.value !== undefined &&
            field.value !== "");
    };
    HTMLFormValidations.requiredIf = function (form, field, otherField, value) {
        return otherField.value != value || this.required(form, field);
    };
    HTMLFormValidations.requiredIfNot = function (form, field, otherField, value) {
        return otherField.value == value || this.required(form, field);
    };
    HTMLFormValidations.same = function (form, field, otherField, strict) {
        var _a, _b;
        if (strict === void 0) { strict = true; }
        return (strict) ?
            field.value === otherField.value :
            ((_a = field.value) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = otherField.value) === null || _b === void 0 ? void 0 : _b.toLowerCase());
    };
    HTMLFormValidations.url = function (form, field) {
        return URL_REGEX.test(field.value);
    };
    return HTMLFormValidations;
}());
export { HTMLFormValidations };
//# sourceMappingURL=validations.js.map