describe('Validator Core', function() {
    var validatinator,
        validationInformationMock = {
            "my-form": {
                "first-name": "required|min:5|max:10",
                "last-name": "required",
                "email": ['required', 'email']
            }
        };

    // Let's make sure we have a fresh Validatinator instance before each `spec.`
    beforeEach(function() {
        validatinator = new Validatinator(validationInformationMock);
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
            expect(validatinator.validationInformation).toEqual(validationInformationMock);
        });

        it('should be turned into an array.', function() {
            // Field validation as strings, with pip separator(s), let's make sure they are turned into arrays.
            expect(validatinator.validationInformation["my-form"]["first-name"]).toEqual(['required', 'min:5', 'max:10']);
            // Field validation, no pipe separators, then turn that single string into a single indexed array.
            expect(validatinator.validationInformation["my-form"]["last-name"]).toEqual(['required']);
            // Field validation as array; let's make sure it doesn't change it's form.
            expect(validatinator.validationInformation["my-form"]["email"]).toEqual(['required', 'email']);
        });
    });

    xit('should fail if it failed validation.', function() {
        expect(validatinator.fails()).toBeTruthy();
        expect(validatinator.passes()).toBeFalsy();

        expect(validatinator.fails()).toBeTruthy();
        expect(validatinator.passes()).toBeTruthy();
    });
});