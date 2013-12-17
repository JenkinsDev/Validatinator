describe("Validations", function() {
    var fakeValidatinator, realValidatinator;

    beforeEach(function() {
        validatinator = new Validatinator({
            "my-form": {
                "first-name": "required"
            }
        });
    });

    it('should handle bad and good method calls.', function() {
        // Make sure to add a wrapping, anonymous, function when checking to make sure your methods throw an exception.
        expect(function() { validatinator.testValidationArray(["fakeValidationMethod"]) }).toThrow();

        // If the validation method does exist then let's go ahead and make sure it doesn't throw an exception.
        expect(function() { validatinator.testValidationArray(["required"]) }).not.toThrow();
    });

    it('should not throw exception when getting field validation arrays.', function() {
        expect(function() { validatinator.getValidationArray() }).not.toThrow();
    });
});