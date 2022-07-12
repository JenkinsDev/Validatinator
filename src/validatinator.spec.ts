import Validatinator from './validatinator';
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
