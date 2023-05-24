import ResultDAO from "../db/dao/result.dao";
import { Result } from "../db/models/Result";
import { IResult } from "../interface/Result.interface";

class ResultService {
    private resultDAO: ResultDAO;
    constructor(resultDAO: ResultDAO) {
        this.resultDAO = resultDAO;
    }

    public async addNewResult(payload: IResult): Promise<boolean> {
        try {
            await this.resultDAO.createResult(payload);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public async getAllResults(): Promise<Result[]> {
        return await this.resultDAO.getAllResults();
    }

    public async deleteResultsForStudent(studentId: number): Promise<void> {
        return await this.resultDAO.deleteAllRelatedToStudent(studentId);
    }

    public async deleteResultsForCourse(courseId: number): Promise<void> {
        return await this.resultDAO.deleteAllRelatedToCourse(courseId);
    }
}

export default ResultService;
