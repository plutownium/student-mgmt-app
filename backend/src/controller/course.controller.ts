// todo

import express, { Request, Response } from "express";

import { HealthCheck } from "../enum/healthCheck.enum";
import CourseService from "../service/course.service";
import { handleErrorResponse } from "../util/handleErrorResponse";
import { isNonEmptyString, isStringInteger } from "../validation/inputValidation";
import CourseDAO from "../db/dao/course.dao";

class CourseController {
    public path = "/courses";
    public router = express.Router();
    private courseService: CourseService;

    constructor(courseService: CourseService) {
        this.courseService = courseService;
        this.router.post("/new", this.createCourse.bind(this));
        this.router.get("/all", this.getAllCourses.bind(this));
        this.router.delete("/:courseid", this.deleteCourse.bind(this));
        this.router.get(HealthCheck.healthCheck, this.healthCheck.bind(this));
    }

    public async createCourse(request: Request, response: Response) {
        try {
            const { courseName } = request.body;
            const validCourseName = isNonEmptyString(courseName);
            const newCourse = await this.courseService.makeCourse({ courseName: validCourseName });
            return response.status(200).json({ newCourse });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async getAllCourses(request: Request, response: Response) {
        try {
            const courses = await this.courseService.getAllCourses();
            return response.status(200).json({ courses });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async deleteCourse(request: Request, response: Response) {
        try {
            const courseIdInput = request.params.courseid;
            const courseId = isStringInteger(courseIdInput);
            const deleted = await this.courseService.deleteCourse(courseId);
            return response.status(200).json({ deleted });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    async healthCheck(request: Request, response: Response) {
        return response.status(200).json({ status: "Online" });
    }
}

export default CourseController;
