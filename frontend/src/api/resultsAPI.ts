import axios from "axios";
import { BACKEND_URL } from "../util/constants";

export function submitNewResultAPI(studentId: number, courseId: number, score: string) {
    return axios.post(BACKEND_URL + "/results/new", { studentId, courseId, score });
}

export function getAllResultsAPI() {
    return axios.get(BACKEND_URL + "/results/all");
}
