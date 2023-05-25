import { IStudent } from "../interface/Student.interface";

export function makeFullName(student: IStudent): string {
    return student.firstName + " " + student.familyName;
}
