import CourseDAO from "../db/dao/course.dao";
import { Course } from "../db/models/Course";
import { ICourse } from "../interface/Course.interface";
import NotificationService from "./notification.service";
import ResultService from "./result.service";

class CourseService {
    private notificationService: NotificationService;

    private resultService: ResultService;
    private courseDAO: CourseDAO;
    constructor(notificationService: NotificationService, resultService: ResultService, courseDAO: CourseDAO) {
        this.notificationService = notificationService;
        this.resultService = resultService;
        this.courseDAO = courseDAO;
    }

    public async makeCourse(payload: ICourse): Promise<Course> {
        const newCourse = await this.courseDAO.createCourse({ name: payload.courseName });
        this.notificationService.makeNewCourseNotification(payload.courseName);
        return newCourse;
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
