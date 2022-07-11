import { ValidationStateBuilder, ValidationState } from "./state";
import { DEFAULT_MESSAGES } from "./constants";

describe("ValidationStateBuilder#addResult", () => {
  it("should add the result to the `results` field", () => {
    const stateBuilder = (new ValidationStateBuilder())
      .addResult("foo", "bar", true)
      .addResult("foo", "baz", false);

    const currentResults = stateBuilder.results;
    expect(currentResults['foo']['bar']).toEqual(true);
    expect(currentResults['foo']['baz']).toEqual(false);
  });
});

describe("ValidationStateBuilder#build", () => {
  let validationState: ValidationState;

  beforeEach(() => {
    validationState = (new ValidationStateBuilder())
      .addResult("foo", "bar", true)
      .addResult("foo", "baz", false)
      .build();
  });

  it("should return a `ValidationState` object", () => {
    expect(validationState instanceof ValidationState).toEqual(true);
  });

  it("should supply the correct `results` & messages", () => {
    expect(validationState.results['foo']['bar']).toEqual(true);
    expect(validationState.results['foo']['baz']).toEqual(false);
    expect(validationState.messages).toEqual(DEFAULT_MESSAGES);
  });
});

describe("ValidationState#valid", () => {
  describe("when all fields are valid", () => {
    test("returns true", () => {
      const state = new ValidationState({"input[type=text]": { alpha: true }}, DEFAULT_MESSAGES);
      expect(state.valid).toBe(true);
    });
  });

  describe("when some fields are invalid", () => {
    test("returns false", () => {
      const state = new ValidationState({"input[type=text]": { alpha: false }}, DEFAULT_MESSAGES);
      expect(state.valid).toBe(false);
    });
  });
});

describe("ValidationState#invalid", () => {
  describe("when all fields are valid", () => {
    test("returns false", () => {
      const state = new ValidationState({"input[type=text]": { alpha: true }}, DEFAULT_MESSAGES);
      expect(state.invalid).toBe(false);
    });
  });

  describe("when some fields are invalid", () => {
    test("returns true", () => {
      const state = new ValidationState({"input[type=text]": { alpha: false }}, DEFAULT_MESSAGES);
      expect(state.invalid).toBe(true);
    });
  });
});

describe("ValidationState#getAllErrors", () => {
  describe("when any field is invalid", () => {
    test("returns an array of error messages", () => {
      const mock = jest
        .spyOn(ValidationState.prototype, "getFieldErrors")
        .mockImplementation(() => ["This field only allows alpha characters."]);

      const state = new ValidationState({"input[type=text]": { alpha: false }}, DEFAULT_MESSAGES);
      const errors = state.getAllErrors()

      expect(mock).toHaveBeenCalledWith("input[type=text]");
      expect(errors).toEqual(["This field only allows alpha characters."]);

      mock.mockRestore();
    });
  });

  describe("when no fields are invalid", () => {
    test("returns an empty array", () => {
      const mock = jest
        .spyOn(ValidationState.prototype, "getFieldErrors")
        .mockImplementation(() => []);

      const state = new ValidationState({"input[type=text]": { alpha: true }}, DEFAULT_MESSAGES);
      const errors = state.getAllErrors();

      expect(mock).toHaveBeenCalledWith("input[type=text]");
      expect(errors).toEqual([]);

      mock.mockRestore();
    });
  });
});

describe("ValidationState#getFieldErrors", () => {
  describe("when no validation methods failed", () => {
    test("returns an empty array", () => {
      const state = new ValidationState({"input[type=text]": { alpha: true }}, DEFAULT_MESSAGES);
      expect(state.getFieldErrors("input[type=text]")).toEqual([]);
    });
  });

  describe("when one validation method failed", () => {
    test("returns an array with the validation error message", () => {
      const state = new ValidationState({"input[type=text]": { alpha: false }}, DEFAULT_MESSAGES);
      expect(state.getFieldErrors("input[type=text]")).toEqual(["This field only allows alpha characters."]);
    });
  });

  describe("when multiple validation methods failed", () => {
    test("returns an array of error messages", () => {
      const state = new ValidationState({"input[type=text]": { alpha: false, required: false }}, DEFAULT_MESSAGES);
      expect(state.getFieldErrors("input[type=text]")).toEqual([
        "This field only allows alpha characters.",
        "This field is required."
      ]);
    });
  });
});
