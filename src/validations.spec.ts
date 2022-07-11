import { HTMLFormValidations } from "./validations";

export function createAndGetFormAndInput(
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

export function createAndGetInput(
  form: HTMLFormElement,
  type: string,
  value: string,
  ...extra: string[]
): HTMLInputElement {
  const input = document.createElement("input");

  input.type = type;
  input.value = value;
  extra.forEach(attr => input.setAttribute(attr, ""));
  form.appendChild(input);

  return input;
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
      expect(HTMLFormValidations.betweenLength(form, field, 0, 10)).toBe(true);
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
      expect(HTMLFormValidations.contains(form, field, "a", "b", "c")).toBe(true);
    });
  });
});

describe("HTMLFormValidations.dateBefore", () => {
  describe("when the field's value is not a valid date string", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "2020-asdf-12-23");
      expect(HTMLFormValidations.dateBefore(form, field, "2020-01-02")).toBe(false);
    });
  });

  describe("when the field's value is a valid date, after the expected date", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "2020-01-03");
      expect(HTMLFormValidations.dateBefore(form, field, "2020-01-02")).toBe(false);
    });
  });

  describe("when the field's value is a valid date, before the expected date", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "2020-01-01");
      expect(HTMLFormValidations.dateBefore(form, field, "2020-01-02")).toBe(true);
    });
  });
});

describe("HTMLFormValidations.dateAfter", () => {
  describe("when the field's value is not a valid date string", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "2020-asdf-12-23");
      expect(HTMLFormValidations.dateAfter(form, field, "2020-01-02")).toBe(false);
    });
  });

  describe("when the field's value is a valid date, after the expected date", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "2020-01-01");
      expect(HTMLFormValidations.dateAfter(form, field, "2020-01-02")).toBe(false);
    });
  });

  describe("when the field's value is a valid date, before the expected date", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "2020-01-03");
      expect(HTMLFormValidations.dateAfter(form, field, "2020-01-02")).toBe(true);
    });
  });
});

describe("HTMLFormValidations.dateAfter", () => {
  describe("when the field's value is not a valid date string", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "2020-asdf-12-23");
      expect(HTMLFormValidations.dateAfter(form, field, "2020-01-02")).toBe(false);
    });
  });

  describe("when the field's value is a valid date, after the expected date", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "2020-01-01");
      expect(HTMLFormValidations.dateAfter(form, field, "2020-01-02")).toBe(false);
    });
  });

  describe("when the field's value is a valid date, before the expected date", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "2020-01-03");
      expect(HTMLFormValidations.dateAfter(form, field, "2020-01-02")).toBe(true);
    });
  });
});

describe("HTMLFormValidations.different", () => {
  describe("when strict is true", () => {
    describe("and the field's value is exactly the same as the provided value", () => {
      test("should return false", () => {
        const [form, field] = createAndGetFormAndInput("text", "SaMe");
        const otherField = createAndGetInput(form, "text", "SaMe");

        expect(HTMLFormValidations.different(form, field, otherField)).toBe(false);
      });
    });

    describe("and the field's value not the same at all", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "SaMe");
        const otherField = createAndGetInput(form, "text", "not-the-same-at-all");

        expect(HTMLFormValidations.different(form, field, otherField)).toBe(true);
      });
    });

    describe("and the field's value is the same as the provided value, with different casing", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "SaMe");
        const otherField = createAndGetInput(form, "text", "same");

        expect(HTMLFormValidations.different(form, field, otherField)).toBe(true);
      });
    });
  });

  describe("when strict is false", () => {
    describe("and the field's value is exactly the same as the provided value", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "SaMe");
        const otherField = createAndGetInput(form, "text", "SaMe");

        expect(HTMLFormValidations.different(form, field, otherField, "false")).toBe(false);
      });
    });

    describe("and the field's value not the same at all", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "SaMe");
        const otherField = createAndGetInput(form, "text", "not-the-same-at-all");

        expect(HTMLFormValidations.different(form, field, otherField, "false")).toBe(true);
      });
    });

    describe("and the field's value is the same as the provided value, with different casing", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "SaMe");
        const otherField = createAndGetInput(form, "text", "same");

        expect(HTMLFormValidations.different(form, field, otherField, "false")).toBe(false);
      });
    });
  });
});

describe("HTMLFormValidations.digitsLength", () => {
  describe("when the field's value is not a valid number", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "not-a-number");
      expect(HTMLFormValidations.digitsLength(form, field, 5)).toBe(false);
    });
  });

  describe("when the field's value is a valid number", () => {
    describe("and the field's value is NOT the same length as the provided length", () => {
      test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "123");
      expect(HTMLFormValidations.digitsLength(form, field, 5)).toBe(false);
      });
    });

    describe("and the field's value is the same length as the provided length", () => {
      test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "12345");
      expect(HTMLFormValidations.digitsLength(form, field, 5)).toBe(true);
      });
    });
  });
});

describe("HTMLFormValidations.digitsLengthBetween", () => {
  describe("when the field's value is not a valid number", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "not-a-number");
      expect(HTMLFormValidations.digitsLengthBetween(form, field, 5, 10)).toBe(false);
    });
  });

  describe("when the field's value is a valid number", () => {
    describe("and the field value's length is less than minLength", () => {
      test("should return false", () => {
        const [form, field] = createAndGetFormAndInput("text", "20");
        expect(HTMLFormValidations.digitsLengthBetween(form, field, 5, 10)).toBe(false);
      });
    });

    describe("and the field value's length is greater than maxLength", () => {
      test("should return false", () => {
        const [form, field] = createAndGetFormAndInput("text", "203213123124213123123");
        expect(HTMLFormValidations.digitsLengthBetween(form, field, 5, 10)).toBe(false);
      });
    });

    describe("and the field value's length is equal to minLength", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "12345");
        expect(HTMLFormValidations.digitsLengthBetween(form, field, 5, 10)).toBe(true);
      });
    });

    describe("and the field's value is between the minLength and maxLength", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "123456");
        expect(HTMLFormValidations.digitsLengthBetween(form, field, 5, 10)).toBe(true);
      });
    });

    describe("and the field value's length is equal to maxLength", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "1234567890");
        expect(HTMLFormValidations.digitsLengthBetween(form, field, 5, 10)).toBe(true);
      });
    });
  });
});

describe("HTMLFormValidations.email", () => {
  describe("when the field's value is not a valid email", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "not-an-email");
      expect(HTMLFormValidations.email(form, field)).toBe(false);
    });
  });

  describe("when the field's value is a valid email", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "support@djenkinsdev@gmail.com");
      expect(HTMLFormValidations.email(form, field)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.ipvFour", () => {
  describe("when the field's value is not a valid IPv4 address", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "not-an-ipv4");
      expect(HTMLFormValidations.ipvFour(form, field)).toBe(false);
    });
  });

  describe("when the field's value is not a valid IPv4 address", () => {
    const invalidIPv4Addresses = [
      "not-an-ipv4",
      "255.255.255.255.255",
      "0.0.0.0.0",
      "127.no.place.like.home"
    ];

    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "");
      invalidIPv4Addresses.forEach(ipv4Address => {
        field.value = ipv4Address;
        expect(HTMLFormValidations.ipvFour(form, field)).toBe(false);
      });
    });
  });

  describe("when the field's value is a valid IPv4 address", () => {
    const validIPv4Addresses = [
      "0.0.0.0",
      "127.0.0.1"
    ];

    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "");
      validIPv4Addresses.forEach(ipv4Address => {
        field.value = ipv4Address;
        expect(HTMLFormValidations.ipvFour(form, field)).toBe(true);
      });
    });
  });
});

describe("HTMLFormValidations.max", () => {
  describe("when the field's value is not a valid number", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "not-a-number");
      expect(HTMLFormValidations.max(form, field, "5")).toBe(false);
    });
  });

  describe("when the field's value is a valid number", () => {
    describe("and the field's value is greater than the provided max", () => {
      test("should return false", () => {
        const [form, field] = createAndGetFormAndInput("text", "6");
        expect(HTMLFormValidations.max(form, field, "5")).toBe(false);
      });
    });

    describe("and the field's value is equal to the provided max", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "5");
        expect(HTMLFormValidations.max(form, field, "5")).toBe(true);
      });
    });

    describe("and the field's value is less than the provided max", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "3");
        expect(HTMLFormValidations.max(form, field, "5")).toBe(true);
      });
    });
  });
});

describe("HTMLFormValidations.maxLength", () => {
  describe("when the field's value is less than the maxLength", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "abc");
      expect(HTMLFormValidations.maxLength(form, field, 5)).toBe(true);
    });
  });

  describe("when the field's value is equal to the maxLength", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "abcde");
      expect(HTMLFormValidations.maxLength(form, field, 5)).toBe(true);
    });
  });

  describe("when the field's value is greater than the maxLength", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "abcdefgh");
      expect(HTMLFormValidations.maxLength(form, field, 5)).toBe(false);
    });
  });
});


describe("HTMLFormValidations.min", () => {
  describe("when the field's value is not a valid number", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "not-a-number");
      expect(HTMLFormValidations.min(form, field, "5")).toBe(false);
    });
  });

  describe("when the field's value is a valid number", () => {
    describe("and the field's value is greater than the provided min", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "6");
        expect(HTMLFormValidations.min(form, field, "5")).toBe(true);
      });
    });

    describe("and the field's value is equal to the provided min", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "5");
        expect(HTMLFormValidations.min(form, field, "5")).toBe(true);
      });
    });

    describe("and the field's value is less than the provided min", () => {
      test("should return false", () => {
        const [form, field] = createAndGetFormAndInput("text", "3");
        expect(HTMLFormValidations.min(form, field, "5")).toBe(false);
      });
    });
  });
});

describe("HTMLFormValidations.minLength", () => {
  describe("when the field's value is less than the minLength", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "abc");
      expect(HTMLFormValidations.minLength(form, field, 5)).toBe(false);
    });
  });

  describe("when the field's value is equal to the minLength", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "abcde");
      expect(HTMLFormValidations.minLength(form, field, 5)).toBe(true);
    });
  });

  describe("when the field's value is greater than the minLength", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "abcdefgh");
      expect(HTMLFormValidations.minLength(form, field, 5)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.notIn", () => {
  describe("when the field's value is not in the provided list", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "abc");
      expect(HTMLFormValidations.notIn(form, field, ...["def", "ghi"])).toBe(true);
    });
  });

  describe("when the field's value is in the provided list", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "def");
      expect(HTMLFormValidations.notIn(form, field, ...["def", "ghi"])).toBe(false);
    });
  });
});

describe("HTMLFormValidations.number", () => {
  describe("when the field's value is not a valid number", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "not-a-number");
      expect(HTMLFormValidations.number(form, field)).toBe(false);
    });
  });

  describe("when the field's value is in the provided list", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "123.03");
      expect(HTMLFormValidations.number(form, field)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.required", () => {
  describe("when the field's value is null", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "");
      field.value = null as any;

      expect(HTMLFormValidations.required(form, field)).toBe(false);
    });
  });

  describe("when the field's value is empty", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "");
      expect(HTMLFormValidations.required(form, field)).toBe(false);
    });
  });

  describe("when the field's value is not empty", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "test");
      expect(HTMLFormValidations.required(form, field)).toBe(true);
    });
  });
});

describe("HTMLFormValidations.requiredIf", () => {
  describe("when the otherField's value equals the provided value", () => {
    describe("and the field's value is empty", () => {
      test("should return false", () => {
        const [form, field] = createAndGetFormAndInput("text", "");
        const otherField = createAndGetInput(form, "text", "test");

        expect(HTMLFormValidations.requiredIf(form, field, otherField, "test")).toBe(false);
      });
    });

    describe("and the field's value is present", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "has-a-value");
        const otherField = createAndGetInput(form, "text", "test");

        expect(HTMLFormValidations.requiredIf(form, field, otherField, "test")).toBe(true);
      });
    });
  });

  describe("when the otherField's value does not equal the provided comparator value", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "has-a-value");
      const otherField = createAndGetInput(form, "text", "test");

      expect(HTMLFormValidations.requiredIf(form, field, otherField, "other-value")).toBe(true);
    });
  });
});

describe("HTMLFormValidations.requiredIfNot", () => {
  describe("when the otherField's value equals the provided value", () => {
    test("should return true", () => {
      const [form, field] = createAndGetFormAndInput("text", "");
      const otherField = createAndGetInput(form, "text", "test");

      expect(HTMLFormValidations.requiredIfNot(form, field, otherField, "test")).toBe(true);
    });
  });

  describe("when the otherField's value does not equal the provided comparator value", () => {
    describe("and the field's value is empty", () => {
      test("should return false", () => {
        const [form, field] = createAndGetFormAndInput("text", "");
        const otherField = createAndGetInput(form, "text", "test");

        expect(HTMLFormValidations.requiredIfNot(form, field, otherField, "other-value")).toBe(false);
      });
    });

    describe("and the field's value is present", () => {
      test("should return true", () => {
        const [form, field] = createAndGetFormAndInput("text", "has-a-value");
        const otherField = createAndGetInput(form, "text", "test");

        expect(HTMLFormValidations.requiredIfNot(form, field, otherField, "other-value")).toBe(true);
      });
    });
  });
});

describe("HTMLFormValidations.same", () => {
  describe("when in strict mode", () => {
    describe("and the field's value is different from the otherField's value", () => {
      test("should return false", () => {
        const [form, field] = createAndGetFormAndInput("text", "abc");
        const otherField = createAndGetInput(form, "text", "def");

        expect(HTMLFormValidations.same(form, field, otherField)).toBe(false);
      });
    });

    describe("and the field's value is the same as the otherField's value", () => {
      describe("with casing differences", () => {
        test("should return false", () => {
          const [form, field] = createAndGetFormAndInput("text", "TesT");
          const otherField = createAndGetInput(form, "text", "test");

          expect(HTMLFormValidations.same(form, field, otherField)).toBe(false);
        });
      });

      describe("without casing differences", () => {
        test("should return true", () => {
          const [form, field] = createAndGetFormAndInput("text", "test");
          const otherField = createAndGetInput(form, "text", "test");

          expect(HTMLFormValidations.same(form, field, otherField)).toBe(true);
        });
      });
    });
  });

  describe("when NOT in strict mode", () => {
    describe("and the field's value is different from the otherField's value", () => {
      test("should return false", () => {
        const [form, field] = createAndGetFormAndInput("text", "abc");
        const otherField = createAndGetInput(form, "text", "def");

        expect(HTMLFormValidations.same(form, field, otherField, "false")).toBe(false);
      });
    });

    describe("and the field's value is the same as the otherField's value", () => {
      describe("with casing differences", () => {
        test("should return true", () => {
          const [form, field] = createAndGetFormAndInput("text", "TesT");
          const otherField = createAndGetInput(form, "text", "test");

          expect(HTMLFormValidations.same(form, field, otherField, "false")).toBe(true);
        });
      });

      describe("without casing differences", () => {
        test("should return true", () => {
          const [form, field] = createAndGetFormAndInput("text", "test");
          const otherField = createAndGetInput(form, "text", "test");

          expect(HTMLFormValidations.same(form, field, otherField, "false")).toBe(true);
        });
      });
    });
  });
});

describe("HTMLFormValidations.url", () => {
  describe("when the field's value is not a valid URL", () => {
    test("should return false", () => {
      const [form, field] = createAndGetFormAndInput("text", "not-a-url");
      expect(HTMLFormValidations.url(form, field)).toBe(false);
    });
  });

  describe("when the field's value is a valid URL", () => {
    test("should return true", () => {
      const validUrls = [
        "http://www.google.com",
        "https://www.google.com",
        "http://www.japan.go.jp/",
        "https://www.japan.go.jp/",
        "child5.child4.child3.child2.child1.child0.root.tld",
      ];

      const [form, field] = createAndGetFormAndInput("text", "");
      validUrls.forEach(url => {
        field.value = url;
        expect(HTMLFormValidations.url(form, field)).toBe(true);
      });
    });
  });
});
