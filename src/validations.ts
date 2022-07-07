const ALPHA_REGEX = new RegExp(/^[a-zA-Z]+$/);
const ALPHA_DASH_REGEX = new RegExp(/^[a-zA-Z-_]+$/);
const ALPHA_NUMERIC_REGEX = new RegExp(/^[a-zA-Z0-9]+$/);
const ALPHA_NUMERIC_DASH_REGEX = new RegExp(/^[a-zA-Z0-9-_]+$/);
const EMAIL_REGEX = new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/);
const IPV4_REGEX = new RegExp(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
const URL_REGEX = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);

export class HTMLFormValidations {

  /**
   * Checks to see if the field has been accepted.
   */
  static accepted(form: HTMLFormElement, field: HTMLInputElement) {
    return field.checked === true;
  }

  static alpha(form: HTMLFormElement, field: HTMLInputElement) {
    return ALPHA_REGEX.test(field.value);
  }

  static alphaDash(form: HTMLFormElement, field: HTMLInputElement) {
    return ALPHA_DASH_REGEX.test(field.value);
  }

  static alphaNum(form: HTMLFormElement, field: HTMLInputElement) {
    return ALPHA_NUMERIC_REGEX.test(field.value);
  }

  static alphaDashNum(form: HTMLFormElement, field: HTMLInputElement) {
    return ALPHA_NUMERIC_DASH_REGEX.test(field.value);
  }

  static between(
    form: HTMLFormElement,
    field: HTMLInputElement,
    min: string | number,
    max: string | number
  ) {
    const value = parseInt(field.value, 10);
    min = parseInt(min as string, 10);
    max = parseInt(max as string, 10);

    if (isNaN(min) || isNaN(max)) {
      throw new Error("min and max must both be numbers in the `between` validation.");
    }

    return (min <= value && value <= max);
  }

  static betweenLength(
    form: HTMLFormElement,
    field: HTMLInputElement,
    min: string | number,
    max: string | number
  ) {
    const valueLength = field.value?.length ?? 0;
    min = parseInt(min as string, 10);
    max = parseInt(max as string, 10);

    if (isNaN(min) || isNaN(max)) {
      throw new Error("min and max must both be numbers in the `betweenLength` validation.");
    }

    return (min <= valueLength && valueLength <= max);
  }

  static contains(form: HTMLFormElement, field: HTMLInputElement, ...arr: string[]) {
    return arr.indexOf(field.value) !== -1;
  }

  static dateBefore(form: HTMLFormElement, field: HTMLInputElement, date: string) {
    return Date.parse(field.value) < Date.parse(date);
  }

  static dateAfter(form: HTMLFormElement, field: HTMLInputElement, date: string) {
    return !this.dateBefore(form, field, date);
  }

  static different(
    form: HTMLFormElement,
    field: HTMLInputElement,
    otherField: HTMLInputElement,
    strict: boolean = true
  ) {
    return !this.same(form, field, otherField, strict);
  }

  static digitsLength(form: HTMLFormElement, field: HTMLInputElement, length: string | number) {
    length = parseInt(length as string, 10);
    const valueLength = field.value?.length ?? 0;

    if (isNaN(length as number)) {
      throw new Error("length must be of numerical value in the `digitsLength` validation.");
    }

    return valueLength == length;
  }

  static digitsLengthBetween(
    form: HTMLFormElement,
    field: HTMLInputElement,
    minLength: string | number,
    maxLength: string | number
  ) {
    const valueLength = field.value?.length ?? 0;
    minLength = parseInt(minLength as string, 10);
    maxLength = parseInt(maxLength as string, 10);

    if (isNaN(minLength as number) || isNaN(maxLength as number)) {
      throw new Error("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");
    }

    return (minLength <= valueLength && valueLength <= maxLength);
  }

  static email(form: HTMLFormElement, field: HTMLInputElement) {
    return EMAIL_REGEX.test(field.value);
  }

  static ipvFour(form: HTMLFormElement, field: HTMLInputElement) {
    const maxByteValue = 255;

    // Get an array with all four of our integer values.
    const ipvFourSegs = field.value?.match(IPV4_REGEX);

    return (
      ipvFourSegs !== null &&
        parseInt(ipvFourSegs[1] as string, 10) <= maxByteValue &&
        parseInt(ipvFourSegs[2] as string, 10) <= maxByteValue &&
        parseInt(ipvFourSegs[3] as string, 10) <= maxByteValue &&
        parseInt(ipvFourSegs[4] as string, 10) <= maxByteValue
    );
  }

  static max(form: HTMLFormElement, field: HTMLInputElement, max: string | number) {
    const value = parseInt(field.value, 10);
    max = parseInt(max as string, 10);

    if (isNaN(max)) {
      throw new Error("An integer must be provided with the `max` validation.");
    }

    return this.between(form, field, -Infinity, max);
  }

  static maxLength(form: HTMLFormElement, field: HTMLInputElement, maxLength: string | number) {
    const value = field.value?.length ?? 0;
    maxLength = parseInt(maxLength as string, 10);

    if (isNaN(maxLength)) {
      throw new Error("An integer must be provided with the `maxLength` validation.");
    }

    return this.betweenLength(form, field, -Infinity, maxLength);
  }

  static min(form: HTMLFormElement, field: HTMLInputElement, min: string | number) {
    const value = parseInt(field.value, 10);
    min = parseInt(min as string, 10);

    if (isNaN(min)) {
      throw new Error("An integer must be provided with the `min` validation.");
    }

    return this.between(form, field, min, Infinity);
  }

  static minLength(form: HTMLFormElement, field: HTMLInputElement, minLength: string | number) {
    const value = field.value?.length ?? 0;
    minLength = parseInt(minLength as string, 10);

    if (isNaN(minLength)) {
      throw new Error("An integer must be provided with the `minLength` validation.");
    }

    return this.betweenLength(form, field, minLength, Infinity);
  }

  static notIn(form: HTMLFormElement, field: HTMLInputElement, ...arr: string[]) {
    return !this.contains(form, field, ...arr);
  }

  static number(form: HTMLFormElement, field: HTMLInputElement) {
    return !isNaN(parseFloat(field.value));
  }

  static required(form: HTMLFormElement, field: HTMLInputElement) {
    return (
      field.value !== null &&
      field.value !== undefined &&
      field.value !== ""
    );
  }

  static requiredIf(
    form: HTMLFormElement,
    field: HTMLInputElement,
    otherField: HTMLInputElement,
    value: any
  ) {
    return otherField.value != value || this.required(form, field);
  }

  static requiredIfNot(
    form: HTMLFormElement,
    field: HTMLInputElement,
    otherField: HTMLInputElement,
    value: any
  ) {
    return otherField.value == value || this.required(form, field);
  }

  static same(
    form: HTMLFormElement,
    field: HTMLInputElement,
    otherField: HTMLInputElement,
    strict: boolean = true
  ) {
    return (strict) ?
      field.value === otherField.value :
      field.value?.toLowerCase() === otherField.value?.toLowerCase();
  }

  static url(form: HTMLFormElement, field: HTMLInputElement) {
    return URL_REGEX.test(field.value);
  }
}
