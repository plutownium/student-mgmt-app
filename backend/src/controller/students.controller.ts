// todo

import express, { Request, Response } from "express";

import { HealthCheck } from "../enum/healthCheck.enum";
import StudentsService from "../service/students.service";
import { handleErrorResponse } from "../util/handleErrorResponse";

import { isDate, isEmail, isNonEmptyString, isStringInteger } from "../validation/inputValidation";

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
            const { firstName, familyName, dob, email } = request.body;
            const validFirstName = isNonEmptyString(firstName);
            const validFamilyName = isNonEmptyString(familyName);
            const validDOB = isDate(dob);
            const validEmail = isEmail(email);
            const newStudent = await this.studentsService.createStudent({
                firstName: validFirstName,
                familyName: validFamilyName,
                dob: validDOB,
                email: validEmail,
            });
            return response.status(200).json({ newStudent });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async getAllStudents(request: Request, response: Response) {
        try {
            const allStudents = await this.studentsService.getAllStudents();
            return response.status(200).json({ allStudents });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async deleteStudent(request: Request, response: Response) {
        try {
            const studentIdInput = request.params.studentid;
            const studentId = isStringInteger(studentIdInput);
            const deletedStudent = await this.studentsService.deleteStudent(studentId);
            return response.status(200).json({ deletedStudent });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    async healthCheck(request: Request, response: Response) {
        return response.status(200).json({ status: "Online" });
    }
}

export default StudentsController;
