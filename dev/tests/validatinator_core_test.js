describe("Validator Core", function() {
    var validatinator;

    // Let's make sure we have a fresh Validatinator instance before each `spec.`
    beforeEach(function() {
        validatinator = new Validatinator({
            "my-form": {
                "first-name": "required|min:5|max:10",
                "last-name": "required"
            }
        });
    });

    // During initial development I had Validatinator set up under the singleton design pattern,
    // not on purpose though.  Let's make sure it stays non-singleton.
    it('should not be singleton pattern enabled.', function() {
        var validatinatorNew = new Validatinator({
            "new-form": {
                "last-name": "required|min:5|max:10"
            }
        });

        expect(validatinator.validationInformation).not.toEqual(validatinatorNew.validationInformation);
    });

    it('should have validationInformation property populated with real data.', function() {
        expect(validatinator.validationInformation).toEqual({
            "my-form": {
                "first-name": ["required", "min:5", "max:10"],
                "last-name": ["required"]
            }
        });
    });

    it('validations should be turned into an array.', function() {
        // Field validation as strings, with pipe separator(s), let's make sure they are turned into arrays.
        expect(validatinator.validationInformation["my-form"]["first-name"]).toEqual(['required', 'min:5', 'max:10']);
        // Field validation, no pipe separators, then turn that single string into a single indexed array.
        expect(validatinator.validationInformation["my-form"]["last-name"]).toEqual(['required']);
    });

    it('should return an array with the first element being the validation method and the second element containing any extra parameters', function() {
    	expect(validatinator.getValidationMethodAndParameters("required")).toEqual(["required"]);

        expect(validatinator.getValidationMethodAndParameters("min:5")).toEqual(["min", ["5"]]);

        expect(validatinator.getValidationMethodAndParameters("between:5,10")).toEqual(["between", [["5", "10"]]]);

        expect(validatinator.getValidationMethodAndParameters("notIn:Foo,Bar,Baz")).toEqual(["notIn", [["Foo", "Bar", "Baz"]]]);

        expect(validatinator.getValidationMethodAndParameters("notIn:Foo,Bar,Baz:false")).toEqual(["notIn", [["Foo", "Bar", "Baz"], false]]);
    });

    it('prepareParameters should return an array with any extra parameters for the validation functions.', function() {
        expect(validatinator.prepareParameters(["5"])).toEqual(["5"]);

        expect(validatinator.prepareParameters(["5", "10"])).toEqual(["5", "10"]);

        expect(validatinator.prepareParameters(["someFieldName", "false"])).toEqual(["someFieldName", false]);

        expect(validatinator.prepareParameters(["someFieldName", "true"])).toEqual(["someFieldName", true]);

        expect(validatinator.prepareParameters(["foo,  bar  , baz", "False"])).toEqual([["foo", "bar", "baz"], false]);
    });

    it('callValidationMethodWithParameters should throw an error if the validation method doesn\'t exist, else a boolean value.', function() {
        var fakeValue = 'value';

        expect(function() { validatinator.callValidationMethodWithParameters('required', undefined, fakeValue); }).not.toThrow("Validation does not exist: required");

        expect(function() { validatinator.callValidationMethodWithParameters('min', ['5'], fakeValue); }).not.toThrow("Validation does not exist: min");

        expect(function() { validatinator.callValidationMethodWithParameters('between', ['5', '20'], fakeValue); }).not.toThrow("Validation does not exist: between");

        expect(function() { validatinator.callValidationMethodWithParameters('fakeValidation', ['FOO'], fakeValue); }).toThrow("Validation does not exist: fakeValidation");
    });
});
