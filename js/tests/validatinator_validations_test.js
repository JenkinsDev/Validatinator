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
});