import axios from "axios";
import { BACKEND_URL } from "../util/constants";

export function submitNewResult(studentId: number, courseId: number, score: string) {
    return axios.post(BACKEND_URL + "/results/new", { studentId, courseId, score });
}

export function getAllResults() {
    return axios.get(BACKEND_URL + "/results/all");
}
