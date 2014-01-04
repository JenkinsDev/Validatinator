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

    it('should be created.', function() {
        expect(validatinator).toEqual(jasmine.any(Object));
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

    describe('Field Validations', function() {
        it('should have validationInformation property populated with real data.', function() {
            expect(validatinator.validationInformation).toEqual({
                "my-form": {
                    "first-name": ["required", "min:5", "max:10"],
                    "last-name": ["required"]
                }
            });
        });

        it('should be turned into an array.', function() {
            // Field validation as strings, with pip separator(s), let's make sure they are turned into arrays.
            expect(validatinator.validationInformation["my-form"]["first-name"]).toEqual(['required', 'min:5', 'max:10']);
            // Field validation, no pipe separators, then turn that single string into a single indexed array.
            expect(validatinator.validationInformation["my-form"]["last-name"]).toEqual(['required']);
        });

        it('should handle bad and good method calls.', function() {
            // Make sure to add a wrapping, anonymous, function when checking to make sure your methods throw an exception.
            expect(function() { validatinator.testValidationArray(["fakeValidationMethod"]) }).toThrow();
            // If the validation method does exist then let's go ahead and make sure it doesn't throw an exception.
            expect(function() { validatinator.testValidationArray(["required"]) }).not.toThrow("Validation does not exist: required");
        });

        it('should not throw exception when getting field validation arrays.', function() {
            expect(function() { validatinator.getValidationArray(["required"]) }).not.toThrow();
        });
    });
});