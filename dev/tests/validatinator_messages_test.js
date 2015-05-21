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
    
    it('addCurrentFormAndField should add the current form and field to the errors object on the Validatinator core.', function() {
        validatinator.currentForm = "my-form";
        validatinator.currentField = "first-name";
        
        validatinator.messages.addCurrentFormAndField();
        
        expect(validatinator.errors).toEqual({
            "my-form": {
                "first-name": {}
            }
        });
    });
    
    it('addValidationErrorMessage should populate the errors object with the corresponding validation message.', function() {
        validatinator.currentForm = "my-form";
        
        validatinator.currentField = "first-name";
        validatinator.messages.addValidationErrorMessage("required", [""]);
        
        validatinator.currentField = "last-name";
        validatinator.messages.addValidationErrorMessage("required", [""]);
        
        expect(validatinator.errors).toEqual({
            "my-form": {
                "first-name": {
                    "required": "This field is required."
                },
                "last-name": {
                    "required": "This field is required."
                }
            }
        });
    });
    
    it('replaceCurlyBracesWithValues should replace all string values like {$0} and {$1} with values from the parameters', function() {
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
        expect(validatinator.messages.validationMessages["required"]).toEqual("This field is required.");
        expect(validatinator.messages.validationMessages["accepted"]).toEqual("This field must be accepted.");
        expect(validatinator.messages.validationMessages["alpha"]).toEqual("This field only allows alpha characters.");
        expect(validatinator.messages.validationMessages["same"]).toEqual("This field must be the same value as {$0}.");
    });

    it('creation of a Validatinator instance with the second parameter populated should allow the user to overwrite or add new validation error messages.', function() {
        var newValidatinator;
        
        // Before validation method change
        expect(validatinator.messages.validationMessages["required"]).toEqual("This field is required.");
        expect(validatinator.messages.validationMessages["someNonExitentMessage"]).toEqual(undefined);
        
        newValidatinator = new Validatinator({
            "my-form": {
                "first-name": "required",
                "last-name": "between:5,10"
            }            
        },
        {
            "newValidationMessage": "I am a new validation message.",
            "required": "I overwrote the original 'required' validation message."
        });
        
        expect(newValidatinator.messages.validationMessages["newValidationMessage"]).toEqual("I am a new validation message.");
        expect(newValidatinator.messages.validationMessages["required"]).toEqual("I overwrote the original 'required' validation message.");
    });

    it('creation of a Valdiatinator instance with the second parameter populated with form -> fields -> validations should allow for form and field specific validations.', function() {
        var newValidatinator;

        newValidatinator = new Validatinator({
            "my-form": {
                "first-name": "required",
                "last-name": "between:5,10"
            }
        },
        {
            "my-form": {
                "first-name": {
                    "required": "Your first name is required!"
                },
                "last-name": {
                    "between": "Your value must be between 5 and 10!"
                }
            }
        });

        expect(newValidatinator.messages.validationMessages["my-form"]["first-name"]["required"]).toEqual("Your first name is required!");
        expect(newValidatinator.messages.validationMessages["my-form"]["last-name"]["between"]).toEqual("Your value must be between 5 and 10!");


        newValidatinator.currentForm = "my-form";
        newValidatinator.currentField = "first-name";

        expect(newValidatinator.messages.getValidationErrorMessage("required")).toEqual("Your first name is required!");


        newValidatinator.currentField = "last-name";
        expect(newValidatinator.messages.getValidationErrorMessage("between")).toEqual("Your value must be between 5 and 10!");
    });
});
