# Validatinator (Reborn)

Current Release: 2.0.3 [Reborn]

Validatinator is a simple, yet effective, HTML form validation library built for JavaScript/TypeScript.

The project was originally loosely based off of Laravel's validation system, and has evolved since.

### How to Use

#### Installation

```javascript
npm install validatinator
```

#### Example Usage

```javascript
import { Validatinator } from "validatinator";

const validatinator = new Validatinator({
  ".my-form-query-selector": {
    ".my-field-query-selector": "required|alpha",
    ".another-field": "min:3|max:10",
    "input[type='checkbox']:last-of-type": "accepted"
  }
});

// async/await
const state = await validatinator.validate(".my-form-query-selector");
console.log(state.valid); // or state.invalid
console.log(state.getAllErrors()); // or state.getFieldErrors(".another-field")

// or as a promise
validatinator.validate(".my-form-query-selector").them((state) => {});
```

### Why does this exist?

Validatinator originally existed through the want of giving to the development community. As of 2022, this project is >6 years old, and has been stagnant for the majority of that time.

While the library may have been stagnant, it has been poised to do well due to the fact that it "just works". Along with all of the technological advancements we've underwent in the past 6 years; now the core pillars of Validatinator's existence are locked to:

* Zero dependencies
* Ease of use
* Framework & runtime agnostic (soon)
* Configurable and override-able

The holy grail of ease-of-use JS/TS validation libraries.

### Validation Methods

* `"accepted"`
* `"alpha"`
* `"alphaDash"`
* `"alphaNum"`
* `"alphaDashNum"`
* `"between:2,10"`
* `"betweenLength:2,10"`
* `"contains:2,4,6,8,10,12"`
* `"dateBefore:2022-02-04"`
* `"dateAfter:2022-02-10"`
* `"difference:.my-other-field-selector,false"`
* `"digitsLength:3"`
* `"digitsLengthBetween:3,10"`
* `"email"`
* `"ipvFour"`
* `"max:500"`
* `"maxLength:2"`
* `"min:200"`
* `"minLength:2"`
* `"notIn:2,4,6,8,10,12"`
* `"number"`
* `"required"`
* `"requiredIf:.another-field-selector,value-to-check"`
* `"requiredIfNot:.another-field-selector,value-to-check"`
* `"same:.another-field-selector,false"`
* `"url"`
