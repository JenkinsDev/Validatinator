describe("Validations", function() {
    var validatinator,
        myForm,
        myForm2;

    beforeEach(function() {
        validatinator = new Validatinator({
            "my-form": {
                "first-name": "required"
            },
            "my-form-two": {
                "last-name": "required"
            }
        });
    });

    it('required should return false on empty, undefined or null and true on anything else.', function() {
        expect(validatinator.validations.required("")).toBeFalsy();
        expect(validatinator.validations.required(null)).toBeFalsy();
        expect(validatinator.validations.required()).toBeFalsy();

        expect(validatinator.validations.required("Jenkins")).toBeTruthy();
        expect(validatinator.validations.required(0)).toBeTruthy();
    });

    it('confirmed should return false if normal field and confirmation field are not equal, else be false', function() {
        // By default the third parameter is set to true for strict mode.  If confirmed is strict then
        // character case does matter.
        expect(validatinator.validations.confirmed("password", "nope")).toBeFalsy();
        expect(validatinator.validations.confirmed("password", "Password")).toBeFalsy();

        expect(validatinator.validations.confirmed("password", "Password", false)).toBeTruthy();
        expect(validatinator.validations.confirmed("password", "password")).toBeTruthy();
    });

    it('accepted should return true when the field value is yes, on, true or 1; else false.', function() {
        expect(validatinator.validations.accepted()).toBeFalsy();
        expect(validatinator.validations.accepted(null)).toBeFalsy();
        expect(validatinator.validations.accepted("")).toBeFalsy();
        expect(validatinator.validations.accepted(false)).toBeFalsy();
        expect(validatinator.validations.accepted(0)).toBeFalsy();

        expect(validatinator.validations.accepted("yes")).toBeTruthy();
        expect(validatinator.validations.accepted("on")).toBeTruthy();
        expect(validatinator.validations.accepted(true)).toBeTruthy();
        expect(validatinator.validations.accepted(1)).toBeTruthy();
    });

    it('alpha should return true if the field value only contains letters; else false', function() {
        expect(validatinator.validations.alpha(123)).toBeFalsy();
        expect(validatinator.validations.alpha("123")).toBeFalsy();
        expect(validatinator.validations.alpha("sadf23435@#$")).toBeFalsy();
        expect(validatinator.validations.alpha("This is a test")).toBeFalsy();

        expect(validatinator.validations.alpha("test")).toBeTruthy();
        expect(validatinator.validations.alpha("TEST")).toBeTruthy();
    });

    it('alphaDash should return true if the field value only contains letters, hyphens and underscores; else false', function() {
        expect(validatinator.validations.alphaDash(123)).toBeFalsy();
        expect(validatinator.validations.alphaDash("123")).toBeFalsy();
        expect(validatinator.validations.alphaDash("This is a test")).toBeFalsy();

        expect(validatinator.validations.alphaDash("This-Is-A-Test_")).toBeTruthy();
    });

    it('alphaNum should return true if the field value only contains letters, hyphens, underscores and numbers; else false', function() {
        expect(validatinator.validations.alphaNum("%$#")).toBeFalsy();
        expect(validatinator.validations.alphaNum("^&.")).toBeFalsy();
        expect(validatinator.validations.alphaNum("This is a real test")).toBeFalsy();

        expect(validatinator.validations.alphaNum(123)).toBeTruthy();
        expect(validatinator.validations.alphaNum("djenkins")).toBeTruthy();
        expect(validatinator.validations.alphaNum("This-Is-A-Test_0-9")).toBeTruthy();
    });

    it('between should return true if the field\'s value length is between the min and max number', function() {
        expect(validatinator.validations.between("value", 20, 30)).toBeFalsy();
        expect(validatinator.validations.between(123, 1, 2)).toBeFalsy();
        expect(validatinator.validations.between({}, 1, 20)).toBeFalsy();

        expect(validatinator.validations.between(123.432, 1, 300)).toBeTruthy();
        expect(validatinator.validations.between("Testing", 5, 10)).toBeTruthy();

        expect(function() {
            validatinator.validations.between(123, "min", "max")
        }).toThrow("min and max must both be numbers in the `between` validation.");
    });

    it('contains should return true if the field\'s value is contained within the array of values', function() {
        expect(validatinator.validations.contains("in", ["in", "not"])).toBeTruthy();

        expect(validatinator.validations.contains("not", ["in", "it"])).toBeFalsy();
    });

    it('different should return true if the field\'s value is different than the second field value supplied', function() {
        expect(validatinator.validations.different("test", "test")).toBeFalsy();
        expect(validatinator.validations.different(123, 123)).toBeFalsy();
        expect(validatinator.validations.different("TEST", "test", false)).toBeFalsy();

        expect(validatinator.validations.different("Test", "test")).toBeTruthy();
        expect(validatinator.validations.different(0, 124)).toBeTruthy();
    });

    it('digitsLength should return true if the field\'s value is only numerical and have the same exact length as supplied.', function() {
        expect(validatinator.validations.digitsLength("asdf", 4)).toBeFalsy();
        expect(validatinator.validations.digitsLength(123, 5)).toBeFalsy();
        expect(validatinator.validations.digitsLength({}, 5)).toBeFalsy();

        expect(validatinator.validations.digitsLength(123, 3)).toBeTruthy();
        expect(validatinator.validations.digitsLength(0, 1)).toBeTruthy();

        expect(function() {
            validatinator.validations.digitsLength(123)
        }).toThrow("length must be of numerical value in the `digitsLength` validation.");

        expect(function() {
            validatinator.validations.digitsLength(123, "asdf");
        }).toThrow("length must be of numerical value in the `digitsLength` validation.");
    });

    it('digitsLengthBetween should return true if the field\'s value is only numerical and is in-between the length of the two values supplied.', function() {
        expect(validatinator.validations.digitsLengthBetween("asdf", 4, 6)).toBeFalsy();
        expect(validatinator.validations.digitsLengthBetween(123, 1, 2)).toBeFalsy();

        expect(validatinator.validations.digitsLengthBetween(1234, 1, 5)).toBeTruthy();

        expect(function() {
            validatinator.validations.digitsLengthBetween(113, "1", "234")
        }).toThrow("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");

        expect(function() {
            validatinator.validations.digitsLengthBetween(123, 1, "234")
        }).toThrow("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");

        expect(function() {
            validatinator.validations.digitsLengthBetween(123, "1", 234)
        }).toThrow("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");
    });

    it('email should return true if the field\'s value is a valid email address.', function() {
        expect(validatinator.validations.email("asdfasdf")).toBeFalsy();
        expect(validatinator.validations.email("asdfasdf@asdfasdf")).toBeFalsy();

        expect(validatinator.validations.email("me@something.com")).toBeTruthy();
        expect(validatinator.validations.email("me123@youtube.com")).toBeTruthy();
    });

    it('ipvFour should return true if the field\'s value is a valid ipv4 or ipv6 address.', function() {
        expect(validatinator.validations.ipvFour("127.0.0.1.0")).toBeFalsy();
        expect(validatinator.validations.ipvFour("123123.123123123.12312312423.4324234.233423")).toBeFalsy();

        expect(validatinator.validations.ipvFour("0.0.0.0")).toBeTruthy();
        expect(validatinator.validations.ipvFour("255.255.255.255")).toBeTruthy();
    });

    it('max should return true if the field\'s value is below or equal to the maximum value supplied.', function() {
        expect(validatinator.validations.max(40, 20)).toBeFalsy();
        expect(validatinator.validations.max({}, 40)).toBeFalsy();
        expect(validatinator.validations.max("asdfasdf", 1)).toBeFalsy();

        expect(validatinator.validations.max(0, 20)).toBeTruthy();
        expect(validatinator.validations.max(40.50, 41)).toBeTruthy();
    });

    it('min should return true if the field\'s value is below or equal to the minimum value supplied.', function() {
        expect(validatinator.validations.min({}, 40)).toBeFalsy();
        expect(validatinator.validations.min("asdfasdf", 100)).toBeFalsy();

        expect(validatinator.validations.min(40, 20)).toBeTruthy();
        expect(validatinator.validations.min(40.50, 40)).toBeTruthy();
    });

    it('notIn should return true if the field\'s value is not contained within the list of value supplied.', function() {
        expect(validatinator.validations.notIn("in", ["in", "not"])).toBeFalsy();

        expect(validatinator.validations.notIn("not", ["in", "it"])).toBeTruthy();
    });

    it('number should return true if the field\'s value is a valid number.', function() {
        expect(validatinator.validations.number("123432")).toBeFalsy();
        expect(validatinator.validations.number("test")).toBeFalsy();

        expect(validatinator.validations.number(123)).toBeTruthy();
        expect(validatinator.validations.number(123.123)).toBeTruthy();
    });

    it('same should return true if the field\'s value is equal to the value passed in.', function() {
        expect(validatinator.validations.same("test", "test")).toBeTruthy();
        expect(validatinator.validations.same(123, 123)).toBeTruthy();
        expect(validatinator.validations.same("TEST", "test", false)).toBeTruthy();

        expect(validatinator.validations.same("Test", "test")).toBeFalsy();
        expect(validatinator.validations.same(0, 124)).toBeFalsy();
    })
});