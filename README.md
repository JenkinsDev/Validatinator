# Validatinator

Simple, yet effective, vanilla JavaScript form validation "plugin." Validatinator is based off of one of PHP's most famous framework, Laravel.  Using Validatinator is as easy as instantiating a Validatinator object, calling the passes or fails methods and if there are failed validations then grabbing those validations from the errors property on the main object.

## Setting Up

#### Download The Source

Before doing anything you will need to retrieve the source code by cloning the repository or downloading the zip from [HERE](https://github.com/JenkinsDev/Validatinator/archive/master.zip).  When working with Validatinator on a site that will be pushed to production make sure you download the source from the master branch, this branch will always contain the most stable, up-to-date, code.


#### Running The Source Through Jasmine Testing (Optional)

Now that you have the source at your disposal you can successfully run the Jasmine tests using Grunt, you will need access to PhantomJS to run the tests via the terminal.  Click to learn how to use [Jasmine](http://pivotal.github.io/jasmine/), [Grunt](http://gruntjs.com/) and [PhantomJS](http://phantomjs.org/).

#### Linking The JavaScript Files

Move the Validatinator.min.js file to the directory that houses the rest of your JavaScript source code, once there go ahead and link the Validatinator.min.js file within your HTML source:

```html
<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <!-- Your HTML -->
        <script type="text/javascript" src="./js/Validatinator.min.js"></script>
    </body>
</html>
```

## Using Validatinator

#### Instantiating A Validatinator Object

Creating an instance of the Validatinator constructor is quite simple, all you have to do is pass in an object literal containing properties named after your form's name attribute.  Now assign that property to another object literal containing properties named after each of your form's field's name attribute and assign those properties to a string value that contains each validation method that is pipe-character delimited.

Here's a quick example:

```html
<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <form name="my-forms-name-attribute">
            <input type="text" name="my-fields-name-attribute">
            <input type="text" name="i-am-another-field-in-the-above-form">
            <button type="submit">Submit Form</button>
        </form>
        
        <form name="i-am-another-form">
            <input type="text" name="i-am-a-field-in-the-new-form">
            <button type="submit">Submit Second Form</button>
        </form>
        
        <script type="text/javascript" src="./js/Validatinator.min.js"></script>
        <script type="text/javascript">
            var validatinator = new Validatinator({
                "my-forms-name-attribute": {
                    "my-fields-name-attribute": "required|min:5|max:20",
                    "i-am-another-field-in-the-above-form": "required|between:20,30",
                },
                "i-am-another-form": {
                    "i-am-a-field-in-the-new-form": "required|alphaNum",
                }
            });
        </script>
    </body>
</html>
```

To get a list of all currently available validation methods then head over [HERE]().

#### Validating The Form

When validating the form you can either call the passes or fails method; they return a boolean value depending on if they pass or fail.  When calling passes or fails method you need to make sure you pass in the form's name that you wish to validate against, without this the calling method will pass back an error stating it does not know which form to validate against.

Here's another quick example showing how to call the validation methods.  We will use the variable defined above for this example as it already holds a Validatinator object:

```javascript
if (validatinator.passes("my-forms-name-attribute")) {
    // Do something here because the form passed validation!
}

if (validatinator.fails("i-am-another-form")) {
    // The form failed validation; do something here to show that to the user!
}
```

#### Getting Validation Error Messages

After running a form through one of the validation methods and if the form failed validation you can access the errors property on your Validatinator Object to retrieve all of the validation error messages.  The errors property will have a similar layout as when you instantiated Validatinator.

```javascript
if (validatinator.fails("i-am-another-form")) {
    console.log(validatinator.errors);
}

// The above would output the following if all validation methods failed.
"i-am-another-form": {
    "i-am-a-field-in-the-new-form": {
        "required": "This field is required.",
        "alphaNum": "This field only allows alpha, dash, underscore and numerical characters."
    }
}
```

## Customizing Validatinator

#### Adding Custom Validations

Coming Soon

#### Adding Custom Validation Error Messages

Coming Soon
