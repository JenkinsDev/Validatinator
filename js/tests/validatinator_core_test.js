describe('Validator Core', function() {
	var validatinator;
	var validationInformationMock = {
        "#test": "required|min:5|max:10",
        ".input": "required|alphanumeric"
	};

    // Let's make sure we have a fresh Validatinator instance before each `spec.`
	beforeEach(function() {
        validatinator = Validatinator.make(validationInformationMock);
	});

    it('should be created.', function() {
        expect(validatinator).toEqual(jasmine.any(Validatinator));
    });

    it('should have validationInformation property populated with real data.', function() {
        expect(validatinator.validationInformation).toEqual(validationInformationMock);
    });
});