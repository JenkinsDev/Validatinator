describe("Validator Messages", function() {
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
    
    it('addValidationErrorMessage should populate the errors object with the corresponding validation message.', function() {
        validatinator.currentForm = "my-form";
        validatinator.currentField = "first-name";
        
        validatinator.messages.addValidationErrorMessage("required");
        expect(validatinator.errors).toEqual({
            "my-form": {
                "first-name": {
                    "required": "This field is required."
                }
            }
        });
    });
    
    it('validationMessages should easily be accessable via validatinator.messages.validationMessages["validationName"].', function() {
        expect(validatinator.messages.validationMessages["required"]).toEqual("This field is required.");
        expect(validatinator.messages.validationMessages["accepted"]).toEqual("This field must be accepted.");
        expect(validatinator.messages.validationMessages["alpha"]).toEqual("This field only allows alpha characters.");
        expect(validatinator.messages.validationMessages["same"]).toEqual("This field must be the same value as {sameValue}.");
    });
});
