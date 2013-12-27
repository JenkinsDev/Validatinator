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

        // Setting up the DOM elements for use within testing.
        myForm = document.createElement('form');
        myForm2 = document.createElement('form');

        firstName = document.createElement('input');
        lastName = document.createElement('input');

        firstName.setAttribute('name', 'first-name');
        lastName.setAttribute('name', 'last-name');

        firstName.value = "";
        lastName.value = "Jenkins";

        document.body.appendChild(myForm);
        document.body.appendChild(myForm2);

        myForm.appendChild(firstName);
        myForm2.appendChild(lastName);
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

    it('between should return true if the field value\'s length is between the min and max number', function() {
        expect(validatinator.validations.between("value", 20, 30)).toBeFalsy();
        expect(validatinator.validations.between(123, 1, 2)).toBeFalsy();
        expect(validatinator.validations.between({}, 1, 20)).toBeFalsy();

        expect(validatinator.validations.between(123.432, 1, 20)).toBeTruthy();
        expect(validatinator.validations.between("Testing", 5, 10)).toBeTruthy();

        expect(function() {
            validatinator.validations.between(123, "min", "max")
        }).toThrow("minLength and maxLength must both be numbers in the `between` validation.");
    });

    it('different should return true if the field\'s value is different than the second field value supplied', function() {
        expect(validatinator.validations.different("test", "test")).toBeFalsy();
        expect(validatinator.validations.different(123, 123)).toBeFalsy();
        expect(validatinator.validations.different("TEST", "test", false)).toBeFalsy();

        expect(validatinator.validations.different("Test", "test")).toBeTruthy();
        expect(validatinator.validations.different(0, 124)).toBeTruthy();
    });

    it('digits should return true if the field\'s value is only numerical and have the same exact length as supplied.', function() {
        expect(validatinator.validations.digits("asdf", 4)).toBeFalsy();
        expect(validatinator.validations.digits(123, 5)).toBeFalsy();
        expect(validatinator.validations.digits({}, 5)).toBeFalsy();

        expect(validatinator.validations.digits(123, 3)).toBeTruthy();
        expect(validatinator.validations.digits(0, 1)).toBeTruthy();

        expect(function() {
            validatinator.validations.digits(123)
        }).toThrow("Length must be a numerical value.");

        expect(function() {
            validatinator.validations.digits(123, "asdf");
        }).toThrow("Length must be a numerical value.");
    });

    it('digitsBetween should return true if the field\'s value is only numerical and is in-between the length of the two values supplied.', function() {
        expect(validatinator.validations.digitsBetween("asdf", 4, 6)).toBeFalsy();
        expect(validatinator.validations.digitsBetween(123, 1, 2)).toBeFalsy();

        expect(validatinator.validations.digitsBetween(1234, 1, 5)).toBeTruthy();

        expect(function() {
            validatinator.validations.digitsBetween(113, "1", "234")
        }).toThrow("minLength and maxLength must both be numerical values.");

        expect(function() {
            validatinator.validations.digitsBetween(123, 1, "234")
        }).toThrow("minLength and maxLength must both be numerical values.");

        expect(function() {
            validatinator.validations.digitsBetween(123, "1", 234)
        }).toThrow("minLength and maxLength must both be numerical values.");
    });

    it('email should return true if the field\'s value is a valid email address.', function() {
        expect(validatinator.validations.email("asdfasdf")).toBeFalsy();
        expect(validatinator.validations.email("asdfasdf@asdfasdf")).toBeFalsy();

        expect(validatinator.validations.email("me@something.com")).toBeTruthy();
        expect(validatinator.validations.email("me123@youtube.com")).toBeTruthy();
    });
});