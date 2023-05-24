import { z } from "zod";

const nonEmptyString = z.string().nonempty();
const stringSchema = z.string();
const emailSchema = z.string().email();
const numberSchema = z.number();
const dateSchema = z.coerce.date();
const stringArr = z.array(z.string());
const intArr = z.array(z.number());

const validGrades = ["A", "B", "C", "D", "E", "F"];

export function isNonEmptyString(testSubject: unknown): string {
    return nonEmptyString.parse(testSubject);
}

export function isStringInteger(testSubject: unknown): number {
    const stringInput = stringSchema.parse(testSubject);
    const toNumber = parseInt(stringInput);
    return numberSchema.parse(toNumber);
}

export function isStringFloat(testSubject: unknown): number {
    const narrowedToString = isString(testSubject);
    const toFloat = parseFloat(narrowedToString);
    return numberSchema.parse(toFloat);
}

export function isInteger(testSubject: unknown): number {
    return numberSchema.parse(testSubject);
}

export function isString(testSubject: unknown): string {
    return stringSchema.parse(testSubject);
}

export function isEmail(testSubject: unknown): string {
    return emailSchema.parse(testSubject);
}

export function isValidGrade(testSubject: unknown): string {
    const isString = stringSchema.parse(testSubject);
    if (isString) {
        if (validGrades.includes(isString)) {
            return isString;
        }
    }
    throw new Error("Invalid grade input");
}

export function isDate(testSubject: unknown): Date {
    return dateSchema.parse(testSubject);
}
