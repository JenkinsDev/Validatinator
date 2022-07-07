var ValidationStateBuilder = (function () {
    function ValidationStateBuilder(messages) {
        this.messages = messages;
        this.results = {};
    }
    ValidationStateBuilder.prototype.addResult = function (fieldSelector, validationMethod, result) {
        var _a;
        this.results[fieldSelector] = (_a = this.results[fieldSelector]) !== null && _a !== void 0 ? _a : {};
        this.results[fieldSelector][validationMethod] = result;
    };
    ValidationStateBuilder.prototype.build = function () {
        return new ValidationState(this.results, this.messages);
    };
    return ValidationStateBuilder;
}());
export { ValidationStateBuilder };
var ValidationState = (function () {
    function ValidationState(results, messages) {
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
        Object.keys(this.results[fieldSelector]).forEach(function (validationMethod) {
            if (!_this.results[fieldSelector][validationMethod]) {
                errors.push(_this.messages[validationMethod]);
            }
        });
        return errors;
    };
    return ValidationState;
}());
export { ValidationState };
//# sourceMappingURL=state.js.map