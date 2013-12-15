/**
 * new Validatinator();
 *
 * Validatinator core `function` or `constructor`.
 */
function Validatinator(validationInformation) {
	this.errors = [];
	this.validationInformation = validationInformation;
}

/**
 * Validatinator.make();
 *
 * Factory make method to allow a more controlled instantiation flow.
 */
Validatinator.make = function(validationInformation) {
	return new Validatinator(validationInformation);
}

//var test = Validatinator.make({'test':'required|test|min:5|max:20|between:10-20'});