import CourseDAO from "../db/dao/course.dao";
import { Course } from "../db/models/Course";

class CourseService {
    private courseDAO: CourseDAO;
    constructor(courseDAO: CourseDAO) {
        this.courseDAO = courseDAO;
    }

    public async makeCourse(email: string): Promise<void> {
        //
    }

    public async getAllCourses(acctId: number): Promise<void> {
        //
    }

    public async deleteCourse(): Promise<void> {
        //
    }
}

export default CourseService;
