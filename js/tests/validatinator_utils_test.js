describe("Validatinator Utils", function() {
    var utils,
        validatinator;

    // Let's make sure we have a fresh Validatinator instance before each `spec.`
    beforeEach(function() {
        validatinator = new Validatinator({
            "my-form": {
                "first-name": "required|min:5|max:10"
            }
        });

        utils = validatinator.utils;
    });

    it("should return correct data types.", function() {
        // Array Literal === "Array"
        expect(utils.getRealType([])).toEqual("array");

        // Object Literal === "object"
        expect(utils.getRealType({})).toEqual("object");

        // Validatinator "Object" === "object"
        expect(utils.getRealType(validatinator)).toEqual("validatinator");

        // String === "string"
        expect(utils.getRealType("test string")).toEqual("string");

        // Empty Argument === "undefined"
        expect(utils.getRealType()).toEqual("undefined");

        // Null === null
        expect(utils.getRealType(null)).toEqual(null);
    });
});