import { prepareValidationRules } from "./utility";

describe("prepareValidationRules", () => {
  describe("when the validation rules string is empty", () => {
    test("returns an empty array", () => {
      const rules = prepareValidationRules("");
      expect(rules).toEqual([]);
    });
  });

  describe("when the validation rules string is not empty", () => {
    test("returns an array of validation rules", () => {
      const rules = prepareValidationRules("accepted|min:5|max:10|between:5,10|requiredIfNot:.other-field,true");
      expect(rules).toEqual([
        ["accepted"],
        ["min", "5"],
        ["max", "10"],
        ["between", "5", "10"],
        ["requiredIfNot", ".other-field", "true"]
      ]);
    });
    describe("when the pattern rule string is used with a comma", () => {
      test("returns a two member array of rule and parameter", () => {
        const rules = prepareValidationRules("accepted|between:5,10|pattern:^[0-9]+,[a-z]+$");
        expect(rules).toEqual([
          ["accepted"],
          ["between", "5", "10"],
          ["pattern", "^[0-9]+,[a-z]+$"]
        ]);
      });
    })
  });
});
