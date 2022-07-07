export default class HTMLFormValidations {
    static accepted(form: HTMLFormElement, field: HTMLInputElement): boolean;
    static alpha(form: HTMLFormElement, field: HTMLInputElement): boolean;
    static alphaDash(form: HTMLFormElement, field: HTMLInputElement): boolean;
    static alphaNum(form: HTMLFormElement, field: HTMLInputElement): boolean;
    static alphaDashNum(form: HTMLFormElement, field: HTMLInputElement): boolean;
    static between(form: HTMLFormElement, field: HTMLInputElement, min: string | number, max: string | number): boolean;
    static betweenLength(form: HTMLFormElement, field: HTMLInputElement, min: string | number, max: string | number): boolean;
    static contains(form: HTMLFormElement, field: HTMLInputElement, arr: string[]): boolean;
    static dateBefore(form: HTMLFormElement, field: HTMLInputElement, date: string): boolean;
    static dateAfter(form: HTMLFormElement, field: HTMLInputElement, date: string): boolean;
    static different(form: HTMLFormElement, field: HTMLInputElement, otherField: HTMLInputElement, strict?: boolean): boolean;
    static digitsLength(form: HTMLFormElement, field: HTMLInputElement, length: string | number): boolean;
    static digitsLengthBetween(form: HTMLFormElement, field: HTMLInputElement, minLength: string | number, maxLength: string | number): boolean;
    static email(form: HTMLFormElement, field: HTMLInputElement): boolean;
    static ipvFour(form: HTMLFormElement, field: HTMLInputElement): boolean;
    static max(form: HTMLFormElement, field: HTMLInputElement, max: string | number): boolean;
    static maxLength(form: HTMLFormElement, field: HTMLInputElement, maxLength: string | number): boolean;
    static min(form: HTMLFormElement, field: HTMLInputElement, min: string | number): boolean;
    static minLength(form: HTMLFormElement, field: HTMLInputElement, minLength: string | number): boolean;
    static notIn(form: HTMLFormElement, field: HTMLInputElement, arr: string[]): boolean;
    static number(form: HTMLFormElement, field: HTMLInputElement): boolean;
    static required(form: HTMLFormElement, field: HTMLInputElement): boolean;
    static requiredIf(form: HTMLFormElement, field: HTMLInputElement, otherField: HTMLInputElement, value: any): boolean;
    static requiredIfNot(form: HTMLFormElement, field: HTMLInputElement, otherField: HTMLInputElement, value: any): boolean;
    static same(form: HTMLFormElement, field: HTMLInputElement, otherField: HTMLInputElement, strict?: boolean): boolean;
    static url(form: HTMLFormElement, field: HTMLInputElement): boolean;
}
