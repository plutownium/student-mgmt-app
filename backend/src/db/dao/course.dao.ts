import { Course, CourseCreationAttributes } from "../models/Course";

class CourseDAO {
    constructor() {}
    //

    public async createCourse(course: CourseCreationAttributes): Promise<Course> {
        return await Course.create(course);
    }

    public async getAllCourses(profileId: number): Promise<Course[]> {
        return await Course.findAll({ include: { required: true, model: Course, where: { profileId } } });
    }
}

export default CourseDAO;
