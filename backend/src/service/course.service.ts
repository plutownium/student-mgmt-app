import CourseDAO from "../db/dao/course.dao";
import { Course } from "../db/models/Course";
import { ICourse } from "../interface/Course.interface";
import ResultService from "./result.service";

class CourseService {
    private resultService: ResultService;
    private courseDAO: CourseDAO;
    constructor(resultService: ResultService, courseDAO: CourseDAO) {
        this.resultService = resultService;
        this.courseDAO = courseDAO;
    }

    public async makeCourse(payload: ICourse): Promise<Course> {
        return await this.courseDAO.createCourse({ name: payload.courseName });
    }

    public async getAllCourses(): Promise<Course[]> {
        return await this.courseDAO.getAllCourses();
    }

    public async deleteCourse(courseId: number): Promise<number> {
        await this.resultService.deleteResultsForCourse(courseId);
        return await this.courseDAO.deleteCourseById(courseId);
    }
}

export default CourseService;
