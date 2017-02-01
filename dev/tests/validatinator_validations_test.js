/**
 *  All validation tests are in alphabetical order, if you want to find a specific test you can run CMD+F or CTRL+F (Windows) and search
 *  for the validation method's name.
 */

describe("Validations", function() {
    var validatinator,
        validations,
        myForm,
        myForm2;

    beforeEach(function() {
        validatinator = new Validatinator();
        validations = validatinator.validations;

        var myForm = document.createElement('form'),
            firstName = document.createElement('input'),
            tos = document.createElement('input');

        myForm.name = "my-form";
        firstName.name = "first-name";
        firstName.value = "test";
        tos.name = "tos";
        tos.type = "checkbox";

        document.body.appendChild(myForm);

        // Now that our element is in the dom let's select it again.
        myForm = document.getElementsByName("my-form")[0];
        myForm.appendChild(firstName);
        myForm.appendChild(tos);
    });

    afterEach(function() {
        document.body.removeChild(document.querySelector('[name="my-form"]'));
    });

    it('alpha should return true if the field value only contains letters; else false', function() {
        expect(validations.alpha(123)).toBeFalsy();
        expect(validations.alpha("123")).toBeFalsy();
        expect(validations.alpha("sadf23435@#$")).toBeFalsy();
        expect(validations.alpha("This is a test")).toBeFalsy();

        expect(validations.alpha("test")).toBeTruthy();
        expect(validations.alpha("TEST")).toBeTruthy();
    });

    it('alphaDash should return true if the field value only contains letters, hyphens and underscores; else false', function() {
        expect(validations.alphaDash(123)).toBeFalsy();
        expect(validations.alphaDash("123")).toBeFalsy();
        expect(validations.alphaDash("This is a test")).toBeFalsy();

        expect(validations.alphaDash("This-Is-A-Test_")).toBeTruthy();
    });

    it('alphaNum should return true if the field value only contains letters, hyphens, underscores and numbers; else false', function() {
        expect(validations.alphaNum("%$#")).toBeFalsy();
        expect(validations.alphaNum("^&.")).toBeFalsy();
        expect(validations.alphaNum("This is a real test")).toBeFalsy();

        expect(validations.alphaNum(123)).toBeTruthy();
        expect(validations.alphaNum("djenkins")).toBeTruthy();
        expect(validations.alphaNum("This-Is-A-Test_0-9")).toBeTruthy();
    });

    it('between should return true if the field\'s value is between the min and max number', function() {
        expect(validations.between("value", [20, 30])).toBeFalsy();
        expect(validations.between({}, [1, 20])).toBeFalsy();
        expect(validations.between("Testing", [5, 10])).toBeFalsy();
        expect(validations.between("123", [1, 2])).toBeFalsy();

        expect(validations.between(123.432, [1, 300])).toBeTruthy();

        expect(function() {
            validations.between(123, ["min", "max"]);
        }).toThrow("min and max must both be numbers in the `between` validation.");
    });

    it('betweenLength should return true if the field\'s value length is between the min and max value supplied.', function() {
        expect(validations.betweenLength("value", [20, 30])).toBeFalsy();
        expect(validations.betweenLength("123", [1, 2])).toBeFalsy();

        expect(validations.betweenLength(123, [1, 5])).toBeTruthy();

        //
        // Below is a list of exmamples that might yield unexpected results.
        //

        // This is turned into "false".length
        expect(validations.betweenLength(false, [2, 3])).toBeFalsy();
        // This is false because we type cast to a string. "123".length === 3
        expect(validations.betweenLength(123, [2, 3])).toBeTruthy();
        // When type casted to a string this array turns into "foo,bar,foobar,baz"
        expect(validations.betweenLength(["foo", "bar", "foobar", "baz"], [0, 10])).toBeFalsy();
        // When an object is type casted it returns "[object Object]" so be careful.
        expect(validations.betweenLength({"foo": "bar"}, [5, 9])).toBeFalsy();
    });

    it('contains should return true if the field\'s value is contained within the array of values supplied.', function() {
        expect(validations.contains("in", ["in", "not"])).toBeTruthy();

        expect(validations.contains("not", ["in", "it"])).toBeFalsy();
    });

    it('dateBefore should return true if the field\'s value is before the date supplied.', function() {
        expect(validations.dateBefore("02/04/2015", "02/10/2015")).toBeTruthy();

        expect(validations.dateBefore("02/10/2015", "01/01/1532")).toBeFalsy();
    });

    it('dateAfter should return true if the field\'s value is after the date supplied.', function() {
        expect(validations.dateAfter("02/04/2015", "02/10/2015")).toBeFalsy();

        expect(validations.dateAfter("02/10/2015", "01/01/1532")).toBeTruthy();
    });

    it('digitsLength should return true if the field\'s value is only numerical and have the same exact length as supplied.', function() {
        expect(validations.digitsLength("asdf", 4)).toBeFalsy();
        expect(validations.digitsLength(123, 5)).toBeFalsy();
        expect(validations.digitsLength({}, 5)).toBeFalsy();

        expect(validations.digitsLength(123, 3)).toBeTruthy();
        expect(validations.digitsLength(0, 1)).toBeTruthy();

        expect(function() {
            validations.digitsLength(123);
        }).toThrow("length must be of numerical value in the `digitsLength` validation.");

        expect(function() {
            validations.digitsLength(123, "asdf");
        }).toThrow("length must be of numerical value in the `digitsLength` validation.");
    });

    it('digitsLengthBetween should return true if the field\'s value is only numerical and is in-between the length of the two values supplied.', function() {
        expect(validations.digitsLengthBetween("asdf", [4, 6])).toBeFalsy();
        expect(validations.digitsLengthBetween(123, [1, 2])).toBeFalsy();

        expect(validations.digitsLengthBetween(1234, [1, 5])).toBeTruthy();

        expect(function() {
            validations.digitsLengthBetween(113, ["min", "234"]);
        }).toThrow("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");

        expect(function() {
            validations.digitsLengthBetween(123, [1, "max"]);
        }).toThrow("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");

        expect(function() {
            validations.digitsLengthBetween(123, ["1f", 234]);
        }).toThrow("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");

        expect(function() {
            validations.digitsLengthBetween(123, ["1", 234]);
        }).not.toThrow("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");
    });

    it('email should return true if the field\'s value is a valid email address.', function() {
        expect(validations.email("asdfasdf")).toBeFalsy();
        expect(validations.email("asdfasdf@asdfasdf")).toBeFalsy();

        expect(validations.email("me@something.com")).toBeTruthy();
        expect(validations.email("me123@youtube.com")).toBeTruthy();
        expect(validations.email("foo+bar@example.com")).toBeTruthy();
        expect(validations.email("other.email-with-dash@example.com")).toBeTruthy();
        expect(validations.email('"much.more unusual"@example.com')).toBeTruthy();
        expect(validations.email('" "@example.com')).toBeTruthy();
    });

    it('ipvFour should return true if the field\'s value is a valid ipv4 address.', function() {
        expect(validations.ipvFour("127.0.0.1.0")).toBeFalsy();
        expect(validations.ipvFour("123123.123123123.12312312423.4324234.233423")).toBeFalsy();

        expect(validations.ipvFour("0.0.0.0")).toBeTruthy();
        expect(validations.ipvFour("255.255.255.255")).toBeTruthy();
    });

    it('max should return true if the field\'s value is below or equal to the maximum value supplied.', function() {
        // All values are type casted to a Number.  If the value contains anything that is not considered a number then this method
        // automatically returns false.
        expect(validations.max({}, 40)).toBeFalsy();
        expect(validations.max("asdfasdf", 100)).toBeFalsy();
        expect(validations.max(100, 10)).toBeFalsy();

        expect(validations.max(40, 200)).toBeTruthy();
        expect(validations.max(40.50, 41)).toBeTruthy();
        expect(validations.max(100, 1000)).toBeTruthy();
    });

    it('maxLength should return true if the field\'s value length is equal to or less than the maximum length supplied.', function() {
        expect(validations.maxLength("some length", 20)).toBeTruthy();

        expect(validations.maxLength("this is a test string, here we go", 10)).toBeFalsy();

        //
        // Below is a list of exmamples that might yield unexpected results.
        //

        // This is turned into "false".length
        expect(validations.maxLength(false, 2)).toBeFalsy();
        // This is false because we type cast to a string. "123".length === 3
        expect(validations.maxLength(123, 30)).toBeTruthy();
        // When type casted to a string this array turns into "foo,bar,foobar,baz"
        expect(validations.maxLength(["foo", "bar", "foobar", "baz"], 14)).toBeFalsy();
        // When an object is type casted it returns "[object Object]" so be careful.
        expect(validations.maxLength({"foo": "bar"}, 10)).toBeFalsy();
    });

    it('min should return true if the field\'s value is above or equal to the minimum value supplied.', function() {
        // All values are type casted to a Number.  If the value contains anything that is not considered a number then this method
        // automatically returns false.
        expect(validations.min({}, 40)).toBeFalsy();
        expect(validations.min("asdfasdf", 100)).toBeFalsy();
        expect(validations.min(100, 1000)).toBeFalsy();

        expect(validations.min(40, 20)).toBeTruthy();
        expect(validations.min(40.50, 40)).toBeTruthy();
        expect(validations.min(100, 10)).toBeTruthy();
    });

    it('minLength should return true if the field\'s value length is equal to or more than the minimum length supplied.', function() {
        expect(validations.minLength("some length", 20)).toBeFalsy();

        expect(validations.minLength("this is a test string, here we go", 10)).toBeTruthy();

        //
        // Below is a list of examples that might yield unexpected results.
        //

        // This is turned into "false".length
        expect(validations.minLength(false, 2)).toBeTruthy();
        // This is false because we type cast to a string. "123".length === 3
        expect(validations.minLength(123, 30)).toBeFalsy();
        // When type casted to a string this array turns into "foo,bar,foobar,baz"
        expect(validations.minLength(["foo", "bar", "foobar", "baz"], 14)).toBeTruthy();
        // When an object is type casted it returns "[object Object]" so be careful.
        expect(validations.minLength({"foo": "bar"}, 10)).toBeTruthy();
    });

    it('notIn should return true if the field\'s value is not contained within the list of value supplied.', function() {
        expect(validations.notIn("in", ["in", "not"])).toBeFalsy();

        expect(validations.notIn("not", ["in", "it"])).toBeTruthy();
    });

    it('number should return true if the field\'s value is a valid number.', function() {
        expect(validations.number("123432asdf")).toBeFalsy();
        expect(validations.number("test")).toBeFalsy();

        expect(validations.number(123)).toBeTruthy();
        expect(validations.number(123.123)).toBeTruthy();
    });

    it('required should return false on empty, undefined or null and true on anything else.', function() {
        expect(validations.required("")).toBeFalsy();
        expect(validations.required(null)).toBeFalsy();
        expect(validations.required()).toBeFalsy();

        expect(validations.required("Jenkins")).toBeTruthy();
        expect(validations.required(0)).toBeTruthy();
    });

    it('url should return true if the field\'s value is a true URL.', function() {
        expect(validations.url("http://www.googl@")).toBeFalsy();
        expect(validations.url("#@$")).toBeFalsy();

        expect(validations.url("http://www.google.com")).toBeTruthy();
        expect(validations.url("www.google.com")).toBeTruthy();
        expect(validations.url("google.com")).toBeTruthy();
        expect(validations.url("https://www.microsoft.com")).toBeTruthy();
        expect(validations.url("https://microsoft.com")).toBeTruthy();
    });

    it('accepted should return true when the field value is true or 1; else false.', function() {
        validatinator.currentField = "tos";
        expect(validations.accepted('')).toBeFalsy();

        // Check the TOS checkbox field and try again.
        document.getElementsByName("tos")[0].checked = true;

        expect(validations.accepted('')).toBeTruthy();
    });

    it('requiredIf should return false if the field provided equals the value provided, else true.', function() {
       validatinator.currentForm = "my-form";

	     expect(validations.requiredIf("field value", "first-name", "test")).toBeTruthy();
	     expect(validations.requiredIf("", "first-name", "not the real value")).toBeTruthy();

	     expect(validations.requiredIf("", "first-name", "test")).toBeFalsy();
    });

    it('requiredIfNot should return false if the field provided does NOT equal the value provided AND the value is not present, else true.', function() {
        validatinator.currentForm = "my-form";

        expect(validations.requiredIfNot("field value", "first-name", "not the real value")).toBeTruthy();
        expect(validations.requiredIfNot("", "first-name", "test")).toBeTruthy();

        expect(validations.requiredIfNot("", "first-name", "not the real value")).toBeFalsy();
    });

    it('same should return true if the two field\'s are the same, else return false', function() {
        validatinator.currentForm = "my-form";

        expect(validations.same("test", "first-name")).toBeTruthy();
        expect(validations.same("TEST", "first-name", false)).toBeTruthy();

        expect(validations.same("Test", "first-name")).toBeFalsy();
        expect(validations.same(0, "first-name")).toBeFalsy();
    });

    it('different should return true if the field\'s value is different than the second field value supplied', function() {
        validatinator.currentForm = "my-form";

        expect(validations.different("test", "first-name")).toBeFalsy();
        expect(validations.different("TEST", "first-name", false)).toBeFalsy();

        expect(validations.different("Test", "first-name")).toBeTruthy();
        expect(validations.different(324, "first-name")).toBeTruthy();
    });
});
