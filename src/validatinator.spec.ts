import { Validatinator } from './validatinator';
import { ValidationState } from './state';

describe("Validatinator.validate", () => {
  describe("formSelector provided has no validation config", () => {
    test("throws an error", () => {
      const validatinator = new Validatinator({});

      validatinator.validate("#no-results").catch(error => {
        expect(error.message).toEqual("No validation config found for form: #no-results");
      });
    });
  });

  describe("formSelector DOM querying returns no results", () => {
    test("throws an error", () => {
      const validatinator = new Validatinator({ "#no-results": {} });

      validatinator.validate("#no-results").catch(error => {
        expect(error.message).toEqual("No form found with selector: #no-results");
      });
    });
  });
});

describe("Validatinator.prepareValidationRules", () => {
  describe("when the validation rules string is empty", () => {
    test("returns an empty array", () => {
      const rules = (new Validatinator({}))['prepareValidationRules']("");
      expect(rules).toEqual([]);
    });
  });

  describe("when the validation rules string is not empty", () => {
    test("returns an array of validation rules", () => {
      const rules = (new Validatinator({}))['prepareValidationRules']("accepted|min:5|max:10|between:5,10|requiredIfNot:.other-field,true");
      expect(rules).toEqual([
        ["accepted"],
        ["min", "5"],
        ["max", "10"],
        ["between", "5", "10"],
        ["requiredIfNot", ".other-field", "true"]
      ]);
    });
  });
});
