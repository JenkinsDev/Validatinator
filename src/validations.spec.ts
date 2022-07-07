/**
 * @jest-environment jsdom
 */

import HTMLFormValidations from "./validations";

describe("HTMLFormValidations.accepted", () => {
  describe("when the field is not accepted", () => {
    document.body.innerHTML = `<form><input type="checkbox" value="1"></form>`;
    const form = document.querySelector("form");
    const field = form.querySelector("input");

    test("should return false", () => {
      expect(HTMLFormValidations.accepted(form, field)).toBe(false);
    });
  });

  describe("when the field is accepted", () => {
    document.body.innerHTML = `<form><input type="checkbox" value="1" checked></form>`;
    const form = document.querySelector("form");
    const field = form.querySelector("input");

    test("should return true", () => {
      expect(HTMLFormValidations.accepted(form, field)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.alpha", () => {
  describe("when the field is not alpha", () => {
    document.body.innerHTML = `<form><input type="text" value="1"></form>`;
    const form = document.querySelector("form");
    const field = form.querySelector("input");

    test("should return false", () => {
      expect(HTMLFormValidations.alpha(form, field)).toBe(false);
    });
  });

  describe("when the field is alpha", () => {
    document.body.innerHTML = `<form><input type="text" value="asdf"></form>`;
    const form = document.querySelector("form");
    const field = form.querySelector("input");

    test("should return true", () => {
      expect(HTMLFormValidations.alpha(form, field)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.alphaDash", () => {
  describe("when the field is not alphaDash", () => {
    document.body.innerHTML = `<form><input type="text" value="1"></form>`;
    const form = document.querySelector("form");
    const field = form.querySelector("input");

    test("should return false", () => {
      expect(HTMLFormValidations.alphaDash(form, field)).toBe(false);
    });
  });

  describe("when the field is alphaDash", () => {
    document.body.innerHTML = `<form><input type="text" value="asdf-_"></form>`;
    const form = document.querySelector("form");
    const field = form.querySelector("input");

    test("should return true", () => {
      expect(HTMLFormValidations.alphaDash(form, field)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.alphaNum", () => {
  describe("when the field is not alphaNum", () => {
    document.body.innerHTML = `<form><input type="text" value="asdf-_#@!$"></form>`;
    const form = document.querySelector("form");
    const field = form.querySelector("input");

    test("should return false", () => {
      expect(HTMLFormValidations.alphaNum(form, field)).toBe(false);
    });
  });

  describe("when the field is alphaNum", () => {
    document.body.innerHTML = `<form><input type="text" value="asdf123"></form>`;
    const form = document.querySelector("form");
    const field = form.querySelector("input");

    test("should return true", () => {
      expect(HTMLFormValidations.alphaNum(form, field)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.alphaDashNum", () => {
  describe("when the field is not alphaDashNum", () => {
    document.body.innerHTML = `<form><input type="text" value="asdf-_#@!$"></form>`;
    const form = document.querySelector("form");
    const field = form.querySelector("input");

    test("should return false", () => {
      expect(HTMLFormValidations.alphaDashNum(form, field)).toBe(false);
    });
  });

  describe("when the field is alphaDashNum", () => {
    document.body.innerHTML = `<form><input type="text" value="asdf123-_-"></form>`;
    const form = document.querySelector("form");
    const field = form.querySelector("input");

    test("should return true", () => {
      expect(HTMLFormValidations.alphaDashNum(form, field)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.between", () => {
  describe("when the field is not between the values", () => {
    document.body.innerHTML = `<form><input type="text" value="1203.23"></form>`;
    const form = document.querySelector("form");
    const field = form.querySelector("input");

    test("should return false", () => {
      expect(HTMLFormValidations.between(form, field, 0, 10)).toBe(false);
    });
  });

  describe("when the field is between the values", () => {
    document.body.innerHTML = `<form><input type="text" value="5"></form>`;
    const form = document.querySelector("form");
    const field = form.querySelector("input");

    test("should return true", () => {
      expect(HTMLFormValidations.between(form, field, 0, 10)).toBe(true);
    });
  });
});
