describe('Validator Core', function() {
	var validatinator,
	    validationInformationMock = {
            "my-form": {
            	"first-name": "required|min:5|max:10|fakeValidation"
            }
	    };

    // Let's make sure we have a fresh Validatinator instance before each `spec.`
    beforeEach(function() {
        validatinator = Validatinator.make(validationInformationMock);
    });

    it('should be created.', function() {
        expect(validatinator).toEqual(jasmine.any(Object));
    });
 
    it('should have validationInformation property populated with real data.', function() {
        expect(validatinator.validationInformation).toEqual(validationInformationMock);
    });

    it('should turn each validation string into an array of validations.', function() {
        expect(validatinator.utils.convertToArray()).toContain(["required", "min:5", "max:10", "fakeValidation"]);
    });
});