'use strict';

describe("Validator Messages", function() {
  var validatinator;

  // Let's make sure we have a fresh Validatinator instance before each `spec.`
  beforeEach(function() {
    validatinator = new Validatinator({
      myForm: {
        fname: "required|min:5|max:10",
        lname: "required"
      }
    });
  });

  it('addValidationErrorMessage should populate the errors object with the corresponding validation message.', function() {
    validatinator.currentForm = "myForm";
    validatinator.currentField = "fname";
    validatinator.messages.addValidationErrorMessage("required", [""]);

    validatinator.currentField = "lname";
    validatinator.messages.addValidationErrorMessage("required", [""]);

    expect(validatinator.errors).toEqual({
      myForm: {
        fname: {
          required: "This field is required."
        },
        lname: {
          required: "This field is required."
        }
      }
    });
  });

  it('replaceCurlyBracesWithValues should replace all placeholders with values ', function() {
    var replace = validatinator.messages.replaceCurlyBracesWithValues;

    expect(validatinator.messages.replaceCurlyBracesWithValues(
      'This field must be the same value as {$0}.',
      ['10']
    )).toEqual("This field must be the same value as 10.");

    expect(validatinator.messages.replaceCurlyBracesWithValues(
      "This field must be between {$0}, this second value is added on as an example {$1}.",
      [['20', '30'], "ADDED"]
    )).toEqual("This field must be between 20 and 30, this second value is added on as an example ADDED.");

    expect(validatinator.messages.replaceCurlyBracesWithValues(
      "This field must be above {$0} or below {$0}.",
      ['10']
    )).toEqual("This field must be above 10 or below 10.");
  });

  it('validationMessages should easily be accessable via validatinator.messages.validationMessages["validationName"].', function() {
    var messages = validatinator.messages.validationMessages;

    expect(messages["required"]).toEqual("This field is required.");
    expect(messages["accepted"]).toEqual("This field must be accepted.");
    expect(messages["alpha"]).toEqual("This field only allows alpha characters.");
    expect(messages["same"]).toEqual("This field must be the same value as {$0}.");
  });

  it('creation of a Validatinator instance with the second parameter populated should allow the user to overwrite or add new validation error messages.', function() {
    var newValidatinator;

    expect(validatinator.messages.validationMessages["required"]).toEqual("This field is required.");
    expect(validatinator.messages.validationMessages["someNonExitentMessage"]).toEqual(undefined);

    newValidatinator = new Validatinator({
      "myForm": {
        "fname": "required",
        "lname": "between:5,10"
      }
    }, {
      "newValidationMessage": "I am a new validation message.",
      "required": "I overwrote the original 'required' validation message."
    });

    expect(newValidatinator.messages.validationMessages["newValidationMessage"]).toEqual("I am a new validation message.");
    expect(newValidatinator.messages.validationMessages["required"]).toEqual("I overwrote the original 'required' validation message.");
  });

  it('creation of a Valdiatinator instance with the second parameter populated with form -> fields -> validations should allow for form and field specific validations.', function() {
    var newValidatinator;

    newValidatinator = new Validatinator({
      "myForm": {
        "fname": "required",
        "lname": "between:5,10"
      }
    }, {
      "myForm": {
        "fname": {
          "required": "Your first name is required!"
        },
        "lname": {
          "between": "Your value must be between 5 and 10!"
        }
      }
    });

    expect(newValidatinator.messages.validationMessages["myForm"]["fname"]["required"]).toEqual("Your first name is required!");
    expect(newValidatinator.messages.validationMessages["myForm"]["lname"]["between"]).toEqual("Your value must be between 5 and 10!");

    newValidatinator.currentForm = "myForm";
    newValidatinator.currentField = "fname";
    expect(newValidatinator.messages.getValidationErrorMessage("required")).toEqual("Your first name is required!");

    newValidatinator.currentField = "lname";
    expect(newValidatinator.messages.getValidationErrorMessage("between")).toEqual("Your value must be between 5 and 10!");
  });
});
