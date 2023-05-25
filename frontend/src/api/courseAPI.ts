import axios from "axios";
import { BACKEND_URL } from "../util/constants";

export function makeCourseAPI(courseName: string) {
    return axios.post(BACKEND_URL + "/courses/new", { courseName });
}

export function getAllCoursesAPI() {
    return axios.get(BACKEND_URL + "/courses/all");
}

export function deleteCourseAPI(courseId: number) {
    return axios.delete(BACKEND_URL + "/courses/" + courseId.toString());
}
