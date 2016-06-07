'use strict';

describe("Validatinator Utils", function() {
  var utils,
      validatinator;

  // Let's make sure we have a fresh Validatinator instance before each `spec.`
  beforeEach(function() {
    validatinator = new Validatinator({
      "myForm": {
        "fname": "required|min:5|max:10"
      }
    });

    // Create a shorthand method to access the utils methods.
    utils = validatinator.utils;
  });

  it("isValueFalsyInNature should return true if value is null, undefined, empty or false; else true", function() {
    expect(utils.isValueFalsyInNature()).toBeTruthy();
    expect(utils.isValueFalsyInNature("")).toBeTruthy();
    expect(utils.isValueFalsyInNature(null)).toBeTruthy();
    expect(utils.isValueFalsyInNature(false)).toBeTruthy();
    expect(utils.isValueFalsyInNature(0)).toBeTruthy();
    expect(utils.isValueFalsyInNature("", false)).toBeTruthy();
    expect(utils.isValueFalsyInNature(0, false)).toBeFalsy();
    expect(utils.isValueFalsyInNature("test")).toBeFalsy();
    expect(utils.isValueFalsyInNature(1)).toBeFalsy();
  });

  it("convertStringToBoolean should return true if 'true' is supplied and false if 'false' is supplied", function() {
    expect(utils.convertStringToBoolean("TRUE")).toBeTruthy();
    expect(utils.convertStringToBoolean("FALSE")).toBeFalsy();
    expect(utils.convertStringToBoolean("true")).toBeTruthy();
    expect(utils.convertStringToBoolean("false")).toBeFalsy();
    expect(utils.convertStringToBoolean(undefined)).toEqual(undefined);
    expect(utils.convertStringToBoolean(null)).toEqual(null);
    expect(utils.convertStringToBoolean("FOO")).toEqual("FOO");
  });

  it("isEmptyObject should return true if an object is empty, else false", function() {
    expect(utils.isEmptyObject({})).toBeTruthy();
    expect(utils.isEmptyObject({"foo":"bar"})).toBeFalsy();
  });

  it("convertArrayValuesToEnglishString should return an English list of items; comma delimited", function() {
    expect(utils.convertArrayValuesToEnglishString(
      ["this", "should", "be", "right"]
    )).toEqual("this, should, be and right");
  });

  it("isValueAnArray should return true if a value is truly an Array, else false", function() {
    expect(utils.isValueAnArray([])).toBeTruthy();
    expect(utils.isValueAnArray(new Array('test'))).toBeTruthy();
    expect(utils.isValueAnArray(new Array())).toBeTruthy();
    expect(utils.isValueAnArray({})).toBeFalsy();
    expect(utils.isValueAnArray(12)).toBeFalsy();
    expect(utils.isValueAnArray(false)).toBeFalsy();
    expect(utils.isValueAnArray(true)).toBeFalsy();
    expect(utils.isValueAnArray("not an array")).toBeFalsy();
  });

  describe('Set Test Form For Value Retrieval', function() {
    beforeEach(function() {
      // Creating our testing form.
      var myForm = document.createElement('form'),
          firstName = document.createElement('input'),
          lastName = document.createElement('input'),
          gender = document.createElement('input'),
          languages = document.createElement('input');

      myForm.name = "myForm";
      firstName.name = "fname";
      lastName.name = "lname";
      gender.name = "gender";
      gender.type = "radio";
      gender.value = "male";
      languages.name = "languages";
      languages.type = "checkbox";
      languages.value = "english";

      lastName.value = "test";

      document.body.appendChild(myForm);
      myForm = document.getElementsByName("myForm")[0];

      myForm.appendChild(firstName);
      myForm.appendChild(lastName);
      myForm.appendChild(gender);
      myForm.appendChild(languages);
    });

    it('getFieldsValue should throw an error if there is no field to grab a value from, else return the field\'s value.', function() {
      expect(utils.getFieldsValue("myForm", "fname")).toEqual("");
      expect(utils.getFieldsValue("myForm", "lname")).toEqual("test");
      expect(function() {
        utils.getFieldsValue("myForm", "some-fake-field");
      }).toThrowError("Couldn't find the field element some-fake-field for the form myForm.");
    });

    it('getFieldsValue should only return the value from radio or checkbox if its actually selected/checked', function(){
      expect(utils.getFieldsValue("myForm", "gender")).toEqual("");
      expect(utils.getFieldsValue("myForm", "languages")).toEqual("");

      document.getElementsByName("gender")[0].checked = true;
      document.getElementsByName("languages")[0].checked = true;

      expect(utils.getFieldsValue("myForm", "gender")).toEqual("male");
      expect(utils.getFieldsValue("myForm", "languages")).toEqual("english");
    });
  });
});
