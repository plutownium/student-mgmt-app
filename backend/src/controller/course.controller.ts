// todo

import express, { Request, Response } from "express";

import { HealthCheck } from "../enum/healthCheck.enum";
import CourseService from "../service/course.service";
import { handleErrorResponse } from "../util/handleErrorResponse";
import { isString, isStringInteger } from "../validationSchemas/inputValidation";

class CourseController {
    public path = "/course";
    public router = express.Router();
    private courseService: CourseService;

    constructor(courseService: CourseService) {
        this.courseService = courseService;
        this.router.post("/new", this.createCourse.bind(this));
        this.router.get("/all/course", this.getAllCourses.bind(this));
        this.router.delete("/:courseid", this.deleteCourse.bind(this));
        this.router.get(HealthCheck.healthCheck, this.healthCheck.bind(this));
    }

    public async createCourse(request: Request, response: Response) {
        try {

            return response.status(200).json({  });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async getAllCourses(request: Request, response: Response) {
        try {
            //
            return response.status(200).json({  });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async deleteCourse(request: Request, response: Response) {
        try {
            return response.status(200).json({  });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    async healthCheck(request: Request, response: Response) {
        return response.status(200).json({ status: "Online" });
    }
}

export default CourseController;
