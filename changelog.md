# Validatinator Changelog

### Version 1.3.3

* Hotfix: Updated email regex to be less strict and follow RFC822.

### Version 1.3.2

* Fixed an issue where the requirement validation was not working for radio and checkbox inputs.
* Changed typo in the filename, license.txt
* Unused variables removed.
* Fixed global namespace pollution.

### Version 1.3.1

* Fixed an issue with error messages, namely min and max.  Their error messages used the old format ${0} that was previously used in the error message creation process.  Fixed them to use the new format {$0}.

### Version 1.3.0

* Added the ability to now set field specific validation messages instead of just global validation messages.
* Moved towards a more unified coding style guide.


### Version 1.2.2

* Mainly "chores", updated bower.json and package.json for better npm and bower usability.

### Version 1.2.0

* Added a safety feature removing frustration in the Validatinator "constructor."  If you don't call Validatinator with the new keyword then we just throw an error.
* Added two new validation methods: dateBefore and dateAfter.  One validates that a form's field is a date and is before the supplied date and the latter does the opposite.
* Added package.json to the repository because I noticed that Gruntfile.js wouldn't really run if it wasn't there ;)
