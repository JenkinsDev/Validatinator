/**
 *  All validation tests are in alphabetical order, if you want to find a specific test you can run CMD+F or CTRL+F (Windows) and search
 *  for the validation method's name.
 */

describe("Validations", function() {
    var validatinator,
        myForm,
        myForm2;

    beforeEach(function() {
        validatinator = new Validatinator();
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

    it('between should return true if the field\'s value is between the min and max number', function() {
        expect(validatinator.validations.between("value", [20, 30])).toBeFalsy();
        expect(validatinator.validations.between({}, [1, 20])).toBeFalsy();
        expect(validatinator.validations.between("Testing", [5, 10])).toBeFalsy();
        expect(validatinator.validations.between("123", [1, 2])).toBeFalsy();

        expect(validatinator.validations.between(123.432, [1, 300])).toBeTruthy();

        expect(function() {
            validatinator.validations.between(123, ["min", "max"]);
        }).toThrow("min and max must both be numbers in the `between` validation.");
    });

    it('betweenLength should return true if the field\'s value length is between the min and max value supplied.', function() {
        expect(validatinator.validations.betweenLength("value", [20, 30])).toBeFalsy();
        expect(validatinator.validations.betweenLength("123", [1, 2])).toBeFalsy();

        expect(validatinator.validations.betweenLength(123, [1, 5])).toBeTruthy();

        //
        // Below is a list of exmamples that might yield unexpected results.
        //

        // This is turned into "false".length
        expect(validatinator.validations.betweenLength(false, [2, 3])).toBeFalsy();
        // This is false because we type cast to a string. "123".length === 3
        expect(validatinator.validations.betweenLength(123, [2, 3])).toBeTruthy();
        // When type casted to a string this array turns into "foo,bar,foobar,baz"
        expect(validatinator.validations.betweenLength(["foo", "bar", "foobar", "baz"], [0, 10])).toBeFalsy();
        // When an object is type casted it returns "[object Object]" so be careful.
        expect(validatinator.validations.betweenLength({"foo": "bar"}, [5, 9])).toBeFalsy();
    });

    it('contains should return true if the field\'s value is contained within the array of values supplied.', function() {
        expect(validatinator.validations.contains("in", ["in", "not"])).toBeTruthy();

        expect(validatinator.validations.contains("not", ["in", "it"])).toBeFalsy();
    });

    it('dateBefore should return true if the field\'s value is before the date supplied.', function() {
        expect(validatinator.validations.dateBefore("02/04/2015", "02/10/2015")).toBeTruthy();

        expect(validatinator.validations.dateBefore("02/10/2015", "01/01/1532")).toBeFalsy();
    });

    it('dateAfter should return true if the field\'s value is after the date supplied.', function() {
        expect(validatinator.validations.dateAfter("02/04/2015", "02/10/2015")).toBeFalsy();

        expect(validatinator.validations.dateAfter("02/10/2015", "01/01/1532")).toBeTruthy();
    });

    it('digitsLength should return true if the field\'s value is only numerical and have the same exact length as supplied.', function() {
        expect(validatinator.validations.digitsLength("asdf", 4)).toBeFalsy();
        expect(validatinator.validations.digitsLength(123, 5)).toBeFalsy();
        expect(validatinator.validations.digitsLength({}, 5)).toBeFalsy();

        expect(validatinator.validations.digitsLength(123, 3)).toBeTruthy();
        expect(validatinator.validations.digitsLength(0, 1)).toBeTruthy();

        expect(function() {
            validatinator.validations.digitsLength(123);
        }).toThrow("length must be of numerical value in the `digitsLength` validation.");

        expect(function() {
            validatinator.validations.digitsLength(123, "asdf");
        }).toThrow("length must be of numerical value in the `digitsLength` validation.");
    });

    it('digitsLengthBetween should return true if the field\'s value is only numerical and is in-between the length of the two values supplied.', function() {
        expect(validatinator.validations.digitsLengthBetween("asdf", [4, 6])).toBeFalsy();
        expect(validatinator.validations.digitsLengthBetween(123, [1, 2])).toBeFalsy();

        expect(validatinator.validations.digitsLengthBetween(1234, [1, 5])).toBeTruthy();

        expect(function() {
            validatinator.validations.digitsLengthBetween(113, ["min", "234"]);
        }).toThrow("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");

        expect(function() {
            validatinator.validations.digitsLengthBetween(123, [1, "max"]);
        }).toThrow("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");

        expect(function() {
            validatinator.validations.digitsLengthBetween(123, ["1f", 234]);
        }).toThrow("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");

        expect(function() {
            validatinator.validations.digitsLengthBetween(123, ["1", 234]);
        }).not.toThrow("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");
    });

    it('email should return true if the field\'s value is a valid email address.', function() {
        expect(validatinator.validations.email("asdfasdf")).toBeFalsy();
        expect(validatinator.validations.email("asdfasdf@asdfasdf")).toBeFalsy();

        expect(validatinator.validations.email("me@something.com")).toBeTruthy();
        expect(validatinator.validations.email("me123@youtube.com")).toBeTruthy();
        expect(validatinator.validations.email("foo+bar@example.com")).toBeTruthy();
        expect(validatinator.validations.email("other.email-with-dash@example.com")).toBeTruthy();
        expect(validatinator.validations.email('"much.more unusual"@example.com')).toBeTruthy();
        expect(validatinator.validations.email('" "@example.com')).toBeTruthy();
    });

    it('ipvFour should return true if the field\'s value is a valid ipv4 address.', function() {
        expect(validatinator.validations.ipvFour("127.0.0.1.0")).toBeFalsy();
        expect(validatinator.validations.ipvFour("123123.123123123.12312312423.4324234.233423")).toBeFalsy();

        expect(validatinator.validations.ipvFour("0.0.0.0")).toBeTruthy();
        expect(validatinator.validations.ipvFour("255.255.255.255")).toBeTruthy();
    });

    it('max should return true if the field\'s value is below or equal to the maximum value supplied.', function() {
        // All values are type casted to a Number.  If the value contains anything that is not considered a number then this method
        // automatically returns false.
        expect(validatinator.validations.max({}, 40)).toBeFalsy();
        expect(validatinator.validations.max("asdfasdf", 100)).toBeFalsy();
        expect(validatinator.validations.max(100, 10)).toBeFalsy();

        expect(validatinator.validations.max(40, 200)).toBeTruthy();
        expect(validatinator.validations.max(40.50, 41)).toBeTruthy();
        expect(validatinator.validations.max(100, 1000)).toBeTruthy();
    });

    it('maxLength should return true if the field\'s value length is equal to or less than the maximum length supplied.', function() {
        expect(validatinator.validations.maxLength("some length", 20)).toBeTruthy();

        expect(validatinator.validations.maxLength("this is a test string, here we go", 10)).toBeFalsy();

        //
        // Below is a list of exmamples that might yield unexpected results.
        //

        // This is turned into "false".length
        expect(validatinator.validations.maxLength(false, 2)).toBeFalsy();
        // This is false because we type cast to a string. "123".length === 3
        expect(validatinator.validations.maxLength(123, 30)).toBeTruthy();
        // When type casted to a string this array turns into "foo,bar,foobar,baz"
        expect(validatinator.validations.maxLength(["foo", "bar", "foobar", "baz"], 14)).toBeFalsy();
        // When an object is type casted it returns "[object Object]" so be careful.
        expect(validatinator.validations.maxLength({"foo": "bar"}, 10)).toBeFalsy();
    });

    it('min should return true if the field\'s value is above or equal to the minimum value supplied.', function() {
        // All values are type casted to a Number.  If the value contains anything that is not considered a number then this method
        // automatically returns false.
        expect(validatinator.validations.min({}, 40)).toBeFalsy();
        expect(validatinator.validations.min("asdfasdf", 100)).toBeFalsy();
        expect(validatinator.validations.min(100, 1000)).toBeFalsy();

        expect(validatinator.validations.min(40, 20)).toBeTruthy();
        expect(validatinator.validations.min(40.50, 40)).toBeTruthy();
        expect(validatinator.validations.min(100, 10)).toBeTruthy();
    });

    it('minLength should return true if the field\'s value length is equal to or more than the minimum length supplied.', function() {
        expect(validatinator.validations.minLength("some length", 20)).toBeFalsy();

        expect(validatinator.validations.minLength("this is a test string, here we go", 10)).toBeTruthy();

        //
        // Below is a list of examples that might yield unexpected results.
        //

        // This is turned into "false".length
        expect(validatinator.validations.minLength(false, 2)).toBeTruthy();
        // This is false because we type cast to a string. "123".length === 3
        expect(validatinator.validations.minLength(123, 30)).toBeFalsy();
        // When type casted to a string this array turns into "foo,bar,foobar,baz"
        expect(validatinator.validations.minLength(["foo", "bar", "foobar", "baz"], 14)).toBeTruthy();
        // When an object is type casted it returns "[object Object]" so be careful.
        expect(validatinator.validations.minLength({"foo": "bar"}, 10)).toBeTruthy();
    });

    it('notIn should return true if the field\'s value is not contained within the list of value supplied.', function() {
        expect(validatinator.validations.notIn("in", ["in", "not"])).toBeFalsy();

        expect(validatinator.validations.notIn("not", ["in", "it"])).toBeTruthy();
    });

    it('number should return true if the field\'s value is a valid number.', function() {
        expect(validatinator.validations.number("123432asdf")).toBeFalsy();
        expect(validatinator.validations.number("test")).toBeFalsy();

        expect(validatinator.validations.number(123)).toBeTruthy();
        expect(validatinator.validations.number(123.123)).toBeTruthy();
    });

    it('required should return false on empty, undefined or null and true on anything else.', function() {
        expect(validatinator.validations.required("")).toBeFalsy();
        expect(validatinator.validations.required(null)).toBeFalsy();
        expect(validatinator.validations.required()).toBeFalsy();

        expect(validatinator.validations.required("Jenkins")).toBeTruthy();
        expect(validatinator.validations.required(0)).toBeTruthy();
    });

    it('url should return true if the field\'s value is a true URL.', function() {
        expect(validatinator.validations.url("http://www.googl@")).toBeFalsy();
        expect(validatinator.validations.url("#@$")).toBeFalsy();

        expect(validatinator.validations.url("http://www.google.com")).toBeTruthy();
        expect(validatinator.validations.url("www.google.com")).toBeTruthy();
        expect(validatinator.validations.url("google.com")).toBeTruthy();
        expect(validatinator.validations.url("https://www.microsoft.com")).toBeTruthy();
        expect(validatinator.validations.url("https://microsoft.com")).toBeTruthy();
    });

    describe('Adding required DOM elements for these validation methods to run correctly.', function() {
        beforeEach(function() {
            var myForm = document.createElement('form'),
                firstName = document.createElement('input'),
                tos = document.createElement('input');

            myForm.name = "my-form";
            firstName.name = "first-name";
            tos.name = "tos";
            tos.type = "checkbox";

            document.body.appendChild(myForm);

            // Now that our element is in the dom let's select it again.
            myForm = document.getElementsByName("my-form")[0];
            myForm.appendChild(firstName);
            myForm.appendChild(tos);

            firstName = document.getElementsByName("first-name")[0];
            firstName.value = "test";
        });

        it('accepted should return true when the field value is true or 1; else false.', function() {
            validatinator.currentField = "tos";
            expect(validatinator.validations.accepted('')).toBeFalsy();

            // Check the TOS checkbox field and try again.
            document.getElementsByName("tos")[0].checked = true;

            expect(validatinator.validations.accepted('')).toBeTruthy();
        });

	    it('requiredIf should return false if the field provided equals the value provided, else true.', function() {
	    	validatinator.currentForm = "my-form";

	    	expect(validatinator.validations.requiredIf("field value", "first-name", "test")).toBeTruthy();
	    	expect(validatinator.validations.requiredIf("", "first-name", "not the real value")).toBeTruthy();

	    	expect(validatinator.validations.requiredIf("", "first-name", "test")).toBeFalsy();
	    });

	    it('requiredIfNot should return false if the field provided does NOT equal the value provided AND the value is not present, else true.', function() {
	    	validatinator.currentForm = "my-form";

	    	expect(validatinator.validations.requiredIfNot("field value", "first-name", "not the real value")).toBeTruthy();
	    	expect(validatinator.validations.requiredIfNot("", "first-name", "test")).toBeTruthy();

	    	expect(validatinator.validations.requiredIfNot("", "first-name", "not the real value")).toBeFalsy();
	    });

        it('same should return true if the two field\'s are the same, else return false', function() {
            validatinator.currentForm = "my-form";

            expect(validatinator.validations.same("test", "first-name")).toBeTruthy();
            expect(validatinator.validations.same("TEST", "first-name", false)).toBeTruthy();

            expect(validatinator.validations.same("Test", "first-name")).toBeFalsy();
            expect(validatinator.validations.same(0, "first-name")).toBeFalsy();
        });

        it('different should return true if the field\'s value is different than the second field value supplied', function() {
            validatinator.currentForm = "my-form";

            expect(validatinator.validations.different("test", "first-name")).toBeFalsy();
            expect(validatinator.validations.different("TEST", "first-name", false)).toBeFalsy();

            expect(validatinator.validations.different("Test", "first-name")).toBeTruthy();
            expect(validatinator.validations.different(324, "first-name")).toBeTruthy();
        });
    });
});
