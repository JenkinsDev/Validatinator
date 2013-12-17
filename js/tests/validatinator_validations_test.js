describe("Validations", function() {
    var validatinator;

    beforeEach(function() {
        validatinator = new Validatinator({
            "my-form": {
                "first-name": "required|min:5|max:10|fakeValidation"
            }
        });
    });

    it('should throw an exception if there is no validation with that name', function() {
        //expect(Validatinator.validations)
    });
});