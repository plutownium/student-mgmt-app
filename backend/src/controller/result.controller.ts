// todo

import express, { Request, Response } from "express";

import { HealthCheck } from "../enum/healthCheck.enum";
import ResultService from "../service/result.service";
import { handleErrorResponse } from "../util/handleErrorResponse";
import { isNonEmptyString, isStringInteger, isValidGrade } from "../validation/inputValidation";

class ResultController {
    public path = "/result";
    public router = express.Router();
    private resultService: ResultService;

    constructor(resultService: ResultService) {
        this.resultService = resultService;
        this.router.post("/new", this.addNewResult.bind(this));
        this.router.get("/all/result", this.getAllResults.bind(this));
        this.router.get(HealthCheck.healthCheck, this.healthCheck.bind(this));
    }

    public async addNewResult(request: Request, response: Response) {
        try {
            const { courseIdInput, studentIdInput, score } = request.body;
            const courseId = isStringInteger(courseIdInput);
            const studentId = isStringInteger(studentIdInput);
            const validScore = isValidGrade(score);
            const success = await this.resultService.addNewResult({ courseId, studentId, score: validScore });
            return response.status(200).json({ success });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async getAllResults(request: Request, response: Response) {
        try {
            const results = await this.resultService.getAllResults();
            return response.status(200).json({ results });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    async healthCheck(request: Request, response: Response) {
        return response.status(200).json({ status: "Online" });
    }
}

export default ResultController;
