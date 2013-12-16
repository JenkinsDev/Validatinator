describe("Validations", function() {
    var validatinator;

    beforeEach(function() {
        validatinator = Validatinator.make({
            "my-form": {
            	"first-name": "required|min:5|max:10"
            }
        });
    });

    it("Should exist", function() {
        
    });
});