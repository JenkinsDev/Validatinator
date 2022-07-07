import { HTMLFormValidations } from "./validations";

function createAndGetFormAndInput(
  type: string,
  value: string,
  ...extra: string[]
): [HTMLFormElement, HTMLInputElement] {
  document.body.innerHTML = `<form>
    <input type="${type}" value="${value}" ${extra.join(" ")} />
  </form>`;

  const form = document.querySelector("form");
  return [form!, form!.querySelector("input")!];
}

describe("HTMLFormValidations.accepted", () => {
  describe("when the field is not accepted", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("checkbox", "1");
      expect(HTMLFormValidations.accepted(form, field)).toBe(false);
    });
  });

  describe("when the field is accepted", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("checkbox", "1", "checked");
      expect(HTMLFormValidations.accepted(form, field)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.alpha", () => {
  describe("when the field is not alpha", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "1");
      expect(HTMLFormValidations.alpha(form, field)).toBe(false);
    });
  });

  describe("when the field is alpha", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "asdf");
      expect(HTMLFormValidations.alpha(form, field)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.alphaDash", () => {
  describe("when the field is not alphaDash", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "1");
      expect(HTMLFormValidations.alphaDash(form, field)).toBe(false);
    });
  });

  describe("when the field is alphaDash", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "asdf-_");
      expect(HTMLFormValidations.alphaDash(form, field)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.alphaNum", () => {
  describe("when the field is not alphaNum", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "asdf-_#@!$");
      expect(HTMLFormValidations.alphaNum(form, field)).toBe(false);
    });
  });

  describe("when the field is alphaNum", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "asdf123");
      expect(HTMLFormValidations.alphaNum(form, field)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.alphaDashNum", () => {
  describe("when the field is not alphaDashNum", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "asdf-_#@!$");
      expect(HTMLFormValidations.alphaDashNum(form, field)).toBe(false);
    });
  });

  describe("when the field is alphaDashNum", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "asdf123-_-");
      expect(HTMLFormValidations.alphaDashNum(form, field)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.between", () => {
  describe("when the field is not between the values", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "1203.23");
      expect(HTMLFormValidations.between(form, field, 0, 10)).toBe(false);
    });
  });

  describe("when the field is between the values", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "5");
      expect(HTMLFormValidations.between(form!, field!, 0, 10)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.betweenLength", () => {
  describe("when the field value's length is not between the values", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "asdfasdfasdfasdf");
      expect(HTMLFormValidations.betweenLength(form, field, 0, 10)).toBe(false);
    });
  });

  describe("when the field value's length is between the values", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "12");
      expect(HTMLFormValidations.betweenLength(form!, field!, 0, 10)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.contains", () => {
  describe("when the field's value is not contained in the array", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "no");
      expect(HTMLFormValidations.contains(form, field, "a", "b", "c")).toBe(false);
    });
  });

  describe("when the field's value is contained in the array", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "a");
      expect(HTMLFormValidations.contains(form!, field!, "a", "b", "c")).toBe(true);
    });
  });
});
