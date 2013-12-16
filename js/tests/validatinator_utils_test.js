describe("Validatinator Utils", function() {
    var utils = Validatinator.utils,
        validatinator;

    beforeEach(function() {
        validatinator = Validatinator.make({
            "my-form": {
                "first-name": "required|min:5|max:10"
            }
        });
    });

    it("should return correct data types.", function() {
        // Array Literal === "Array"
        expect(utils.getRealType([])).toEqual("array");

        // Object Literal === "object"
        expect(utils.getRealType({})).toEqual("object");

        // Validatinator "Object" === "object"
        expect(utils.getRealType(validatinator)).toEqual("object");

        // String === "string"
        expect(utils.getRealType("test string")).toEqual("string");

        // Empty Argument === "undefined"
        expect(utils.getRealType()).toEqual("undefined");

        // Null === null
        expect(utils.getRealType(null)).toEqual(null);
    });
});