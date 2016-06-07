'use strict';

describe("Validator Core", function() {
  var validatinator;

  beforeEach(function() {
    validatinator = new Validatinator({
      myForm: {
        fname: "required|min:5|max:10",
        lname: "required"
      }
    });
  });

  it('should have validationInformation property populated with real data.', function() {
    expect(validatinator.validationInformation).toEqual({
      "myForm": {
        "fname": ["required", "min:5", "max:10"],
        "lname": ["required"]
      }
    });
  });

  it('validations should be turned into an array.', function() {
    expect(
      validatinator.validationInformation["myForm"]["fname"]
    ).toEqual(['required', 'min:5', 'max:10']);

    expect(
      validatinator.validationInformation["myForm"]["lname"]
    ).toEqual(['required']);
  });

  it('should return an array with the first element being the validation method and the second element containing any extra parameters', function() {
    expect(
      validatinator.getValidationMethodAndParameters("required")
    ).toEqual(["required"]);

    expect(
      validatinator.getValidationMethodAndParameters("min:5")
    ).toEqual(["min", ["5"]]);

    expect(
      validatinator.getValidationMethodAndParameters("between:5,10")
    ).toEqual(["between", [["5", "10"]]]);

    expect(
      validatinator.getValidationMethodAndParameters("notIn:Foo,Bar,Baz")
    ).toEqual(["notIn", [["Foo", "Bar", "Baz"]]]);

    expect(
      validatinator.getValidationMethodAndParameters("notIn:Foo,Bar,Baz:false")
    ).toEqual(["notIn", [["Foo", "Bar", "Baz"], false]]);
  });

  it('prepareParameters should return an array with any extra parameters for the validation functions.', function() {
    expect(
      validatinator.prepareParameters(["5"])
    ).toEqual(["5"]);

    expect(
      validatinator.prepareParameters(["5", "10"])
    ).toEqual(["5", "10"]);

    expect(
      validatinator.prepareParameters(["someFieldName", "false"])
    ).toEqual(["someFieldName", false]);

    expect(
      validatinator.prepareParameters(["someFieldName", "true"])
    ).toEqual(["someFieldName", true]);

    expect(
      validatinator.prepareParameters(["foo,  bar  , baz", "False"])
    ).toEqual([["foo", "bar", "baz"], false]);
  });

  it("callValidationMethod should throw an error if the validation method doesn't exist.", function() {
    var fakeValue = 'value';

    expect(function() {
      spyOn(validatinator.validations, 'required').and.returnValue(false);
      validatinator.callValidationMethod('required', fakeValue);
    }).not.toThrowError();

    expect(function() {
      spyOn(validatinator.validations, 'min').and.returnValue(false);
      validatinator.callValidationMethod('min', fakeValue, ['5']);
    }).not.toThrowError();

    expect(function() {
      spyOn(validatinator.validations, 'between').and.returnValue(false);
      validatinator.callValidationMethod('between', fakeValue, ['5', '20']);
    }).not.toThrowError();

    expect(function() {
      validatinator.callValidationMethod('fakeValidation', fakeValue, ['FOO']);
    }).toThrowError("Validation does not exist: fakeValidation");
  });
});
