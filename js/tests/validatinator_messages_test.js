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
});
