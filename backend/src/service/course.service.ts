import CourseDAO from "../db/dao/course.dao";
import { Course } from "../db/models/Course";
import { ICourse } from "../interface/Course.interface";

class CourseService {
    private courseDAO: CourseDAO;
    constructor(courseDAO: CourseDAO) {
        this.courseDAO = courseDAO;
    }

    public async makeCourse(payload: ICourse): Promise<Course> {
        return await this.courseDAO.createCourse({ name: payload.courseName });
    }

    public async getAllCourses(): Promise<Course[]> {
        return await this.courseDAO.getAllCourses();
    }

    public async deleteCourse(courseId: number): Promise<number> {
        return await this.courseDAO.deleteCourseById(courseId);
    }
}

export default CourseService;
