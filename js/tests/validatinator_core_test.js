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
        expect(validatinator).toEqual(jasmine.any(Validatinator));
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
        // Field validation as strings, with pip separator(s), let's make sure they are turned into arrays.
        expect(validatinator.validationInformation["my-form"]["first-name"]).toEqual(['required', 'min:5', 'max:10']);
        // Field validation, no pipe separators, then turn that single string into a single indexed array.
        expect(validatinator.validationInformation["my-form"]["last-name"]).toEqual(['required']);
    });

    it('should return an array with the first element being the validation method and the second element containing any extra parameters', function() {

    });

    it('should return an array with any extra parameters for the validation functions.', function() {
        expect(validatinator.stripExtraParameters("5")).toEqual(["5"]);

        expect(validatinator.stripExtraParameters("")).toEqual([""]);

        expect(validatinator.stripExtraParameters("5:10")).toEqual(["5", "10"]);

        expect(validatinator.stripExtraParameters("someFieldName:false")).toEqual(["someFieldName", false]);

        expect(validatinator.stripExtraParameters("someFieldName:true")).toEqual(["someFieldName", true]);

        expect(validatinator.stripExtraParameters("foo, bar ,baz:false")).toEqual([["foo", "bar", "baz"], false]);
    });

    describe('Handling Field Validations', function() {
        beforeEach(function() {
            // Creating our testing form.
            var myForm = document.createElement('form'),
                firstName = document.createElement('input'),
                lastName = document.createElement('input');

            myForm.name = "my-form";
            firstName.name = "first-name";
            lastName.name = "last-name";

            document.body.appendChild(myForm);
            // Now that our element is in the dom let's select it again.
            myForm = document.getElementsByName("my-form")[0];

            // Place our inputs into the form now and then we are done!
            myForm.appendChild(firstName);
            myForm.appendChild(lastName);
        });

        it('get validation array for a specified field.', function() {
            validatinator.currentValidatingForm = "my-form";
            validatinator.currentValidatingField = "first-name";
            expect(validatinator.getFieldValidationArray()).toEqual(['required', 'min:5', 'max:10']);

            validatinator.currentValidatingField = "last-name";
            expect(validatinator.getFieldValidationArray()).toEqual(['required']);
        });
    });
});
