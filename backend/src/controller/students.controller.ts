// todo

import express, { Request, Response } from "express";

import { HealthCheck } from "../enum/healthCheck.enum";
import StudentsService from "../service/students.service";
import { handleErrorResponse } from "../util/handleErrorResponse";
import { isString, isStringInteger } from "../validationSchemas/inputValidation";

class StudentsController {
    public path = "/students";
    public router = express.Router();
    private studentsService: StudentsService;

    constructor(studentsService: StudentsService) {
        this.studentsService = studentsService;
        this.router.post("/new", this.createStudent.bind(this));
        this.router.get("/all/students", this.getAllStudents.bind(this));
        this.router.delete("/:studentid", this.deleteStudent.bind(this));
        this.router.get(HealthCheck.healthCheck, this.healthCheck.bind(this));
    }

    public async createStudent(request: Request, response: Response) {
        try {

            return response.status(200).json({  });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async getAllStudents(request: Request, response: Response) {
        try {
            //
            return response.status(200).json({  });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async deleteStudent(request: Request, response: Response) {
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

export default StudentsController;
