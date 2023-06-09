import { Course, CourseCreationAttributes } from "../models/Course";

class CourseDAO {
    constructor() {}

    public async createCourse(course: CourseCreationAttributes): Promise<Course> {
        return await Course.create(course);
    }

    public async getAllCourses(): Promise<Course[]> {
        return await Course.findAll();
    }

    public async getCourseById(courseId: number): Promise<Course | null> {
        return await Course.findByPk(courseId);
    }

    public async deleteCourseById(courseId: number): Promise<number> {
        return await Course.destroy({ where: { courseId } });
    }
}

export default CourseDAO;
