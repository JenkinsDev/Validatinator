"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var validations_1 = require("./validations");
var Validatinator = (function () {
    function Validatinator(validations, messages) {
        if (messages === void 0) { messages = {}; }
        this.config = validations;
    }
    Validatinator.prototype.succeeds = function (formSelector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.validate(formSelector)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Validatinator.prototype.fails = function (formSelector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.validate(formSelector)];
                    case 1: return [2, !(_a.sent())];
                }
            });
        });
    };
    Validatinator.prototype.validate = function (formSelector) {
        return __awaiter(this, void 0, void 0, function () {
            var formValidationConfig, form, valid;
            var _this = this;
            return __generator(this, function (_a) {
                formValidationConfig = this.validationConfig[formSelector] || {};
                form = document.querySelector(formSelector);
                if (!form) {
                    throw new Error("No form found with selector: ".concat(formSelector));
                }
                valid = false;
                formValidationConfig.forEach(function (fieldSelector, validationRules) {
                    var field = form.querySelector(fieldSelector);
                    var _a = _this.prepareValidationRules(validationRules), method = _a[0], params = _a.slice(1);
                    if (!field) {
                        throw new Error("No field found with selector: ".concat(fieldSelector));
                    }
                    if (!validations_1.default[method]) {
                        throw new Error("No validation method found with name: ".concat(method));
                    }
                    valid = validations_1.default[method].apply(validations_1.default, __spreadArray([form, field], params, false)) && valid;
                });
                return [2];
            });
        });
    };
    return Validatinator;
}());
{
    return validationRules.split('|').map(function (validationMethodAndParams) {
        var _a = validationMethodAndParams.split(':'), method = _a[0], params = _a[1];
        var paramsArray = params.split(',');
        return __spreadArray([method], paramsArray, true);
    });
}
//# sourceMappingURL=validatinator.js.map