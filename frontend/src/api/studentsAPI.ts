import axios from "axios";
import { BACKEND_URL } from "../util/constants";

export async function addNewStudentAPI(firstName: string, familyName: string, dob: string, email: string) {
    return await axios.post(BACKEND_URL + "/students/new", { firstName, familyName, dob, email });
}

export async function getStudentsAPI() {
    return await axios.get(BACKEND_URL + "/students/all");
}

export async function deleteStudentAPI(studentId: number) {
    return await axios.delete(BACKEND_URL + "/students/" + studentId.toString());
}
