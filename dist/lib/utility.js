var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export function prepareValidationRules(validationRulesStr) {
    var _a;
    var validationRules = (_a = validationRulesStr === null || validationRulesStr === void 0 ? void 0 : validationRulesStr.split('|')) !== null && _a !== void 0 ? _a : [];
    return validationRules
        .filter(function (methodAndParams) { return !!methodAndParams; })
        .map(function (methodAndParams) {
        var _a;
        var _b = methodAndParams.split(':'), method = _b[0], params = _b[1];
        var paramsArray = (_a = params === null || params === void 0 ? void 0 : params.split(',')) !== null && _a !== void 0 ? _a : [];
        return __spreadArray([method], paramsArray, true);
    });
}
export function prepareErrorMessage(errorMessage) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    return errorMessage
        .replace(/\$\{\.\.\.\}/g, function (match, index) { return params.join(', '); })
        .replace(/\$\{(\d+)\}/g, function (match, index) { return params[index]; });
}
//# sourceMappingURL=utility.js.map