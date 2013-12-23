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
});