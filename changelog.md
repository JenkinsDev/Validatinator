# Validatinator Changelog

### Version 1.3.0

* Added the ability to now set field specific validation messages instead of just global validation messages.
* Moved towards a more unified coding style guide.


### Version 1.2.2

* Mainly "chores", updated bower.json and package.json for better npm and bower usability.

### Version 1.2.0

* Added a safety feature removing frustration in the Validatinator "constructor."  If you don't call Validatinator with the new keyword then we just throw an error.
* Added two new validation methods: dateBefore and dateAfter.  One validates that a form's field is a date and is before the supplied date and the latter does the opposite.
* Added package.json to the repository because I noticed that Gruntfile.js wouldn't really run if it wasn't there ;)
