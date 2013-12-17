describe("Validations", function() {
    var validatinator;

    beforeEach(function() {
        fakeValidatinator = new Validatinator({
            "my-form": {
                "not-a-real-function": "fakeValidation"
            }
        });
    });

    it('should throw an exception if there is no validation with that name', function() {
        // Make sure to add a wrapping, anonymouse, function when checking to make sure your methods throw an exception.
        expect(function() { fakeValidatinator.testValidations() }).toThrow("Validation does not exist");
    });
});