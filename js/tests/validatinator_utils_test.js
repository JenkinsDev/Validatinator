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

    it("isValueFalsyInNature should return true if value is null, undefined, empty or false; else true", function() {
        expect(utils.isValueFalsyInNature()).toBeTruthy();
        expect(utils.isValueFalsyInNature("")).toBeTruthy();
        expect(utils.isValueFalsyInNature(null)).toBeTruthy();
        expect(utils.isValueFalsyInNature(false)).toBeTruthy();
        expect(utils.isValueFalsyInNature(0)).toBeTruthy();
        // An empty string should ALWAYS be considered falsy in nature.
        expect(utils.isValueFalsyInNature("", false)).toBeTruthy();

        expect(utils.isValueFalsyInNature(0, false)).toBeFalsy();
        expect(utils.isValueFalsyInNature("test")).toBeFalsy();
        expect(utils.isValueFalsyInNature(1)).toBeFalsy();
    });
});