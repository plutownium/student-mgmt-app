import axios from "axios";
import { BACKEND_URL } from "../util/constants";

export function makeStudentAPI(firstName: string, familyName: string, dob: Date, email: string) {
    return axios.post(BACKEND_URL + "/students/new", { firstName, familyName, dob, email });
}

export function getStudentsAPI() {
    return axios.get(BACKEND_URL + "/students/all");
}

export function deleteStudentAPI(studentId: number) {
    return axios.delete(BACKEND_URL + "/students/" + studentId.toString());
}
