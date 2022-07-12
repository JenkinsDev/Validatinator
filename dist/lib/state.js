var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { DEFAULT_MESSAGES } from "./constants.js";
import { prepareValidationRules, prepareErrorMessage } from "./utility.js";
var ValidationStateBuilder = (function () {
    function ValidationStateBuilder(formFieldConfigs, messages) {
        if (messages === void 0) { messages = {}; }
        this.formFieldConfigs = formFieldConfigs;
        this.messages = messages;
        this.results = {};
        if (Object.keys(messages).length === 0) {
            this.messages = DEFAULT_MESSAGES;
        }
        else {
            this.messages = Object.assign({}, DEFAULT_MESSAGES, messages);
        }
    }
    ValidationStateBuilder.prototype.addResult = function (fieldSelector, validationMethod, result) {
        var _a;
        this.results[fieldSelector] = (_a = this.results[fieldSelector]) !== null && _a !== void 0 ? _a : {};
        this.results[fieldSelector][validationMethod] = result;
        return this;
    };
    ValidationStateBuilder.prototype.build = function () {
        return new ValidationState(this.formFieldConfigs, this.results, this.messages);
    };
    return ValidationStateBuilder;
}());
export { ValidationStateBuilder };
var ValidationState = (function () {
    function ValidationState(formFieldConfigs, results, messages) {
        this.formFieldConfigs = formFieldConfigs;
        this.results = results;
        this.messages = messages;
    }
    Object.defineProperty(ValidationState.prototype, "valid", {
        get: function () {
            var valid = true;
            for (var field in this.results) {
                valid = valid && Object.values(this.results[field]).every(function (state) { return state === true; });
            }
            return valid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationState.prototype, "invalid", {
        get: function () {
            return !this.valid;
        },
        enumerable: false,
        configurable: true
    });
    ValidationState.prototype.getAllErrors = function () {
        var _this = this;
        var fields = Object.keys(this.results);
        var errors = [];
        fields.forEach(function (fieldSelector) {
            errors = errors.concat(_this.getFieldErrors(fieldSelector));
        });
        return errors;
    };
    ValidationState.prototype.getFieldErrors = function (fieldSelector) {
        var _this = this;
        var errors = [];
        var fieldValidationRules = prepareValidationRules(this.formFieldConfigs[fieldSelector]);
        Object.keys(this.results[fieldSelector]).forEach(function (validationMethod) {
            var _a;
            if (!_this.results[fieldSelector][validationMethod]) {
                var _b = (_a = fieldValidationRules.filter(function (_a) {
                    var method = _a[0];
                    return method === validationMethod;
                })[0]) !== null && _a !== void 0 ? _a : [], _ = _b[0], validationParams = _b.slice(1);
                var errorMessage = _this.messages[validationMethod];
                errors.push(prepareErrorMessage.apply(void 0, __spreadArray([errorMessage], validationParams, false)));
            }
        });
        return errors;
    };
    return ValidationState;
}());
export { ValidationState };
//# sourceMappingURL=state.js.map