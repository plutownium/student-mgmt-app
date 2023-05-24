// todo

import express, { Request, Response } from "express";

import { HealthCheck } from "../enum/healthCheck.enum";
import ResultService from "../service/result.service";
import { handleErrorResponse } from "../util/handleErrorResponse";

class ResultController {
    public path = "/result";
    public router = express.Router();
    private resultService: ResultService;

    constructor(resultService: ResultService) {
        this.resultService = resultService;
        this.router.post("/new", this.createResult.bind(this));
        this.router.get("/all/result", this.getAllResult.bind(this));
        this.router.get(HealthCheck.healthCheck, this.healthCheck.bind(this));
    }

    public async createResult(request: Request, response: Response) {
        try {
            return response.status(200).json({});
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async getAllResult(request: Request, response: Response) {
        try {
            //
            return response.status(200).json({});
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async deleteResult(request: Request, response: Response) {
        try {
            return response.status(200).json({});
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    async healthCheck(request: Request, response: Response) {
        return response.status(200).json({ status: "Online" });
    }
}

export default ResultController;
