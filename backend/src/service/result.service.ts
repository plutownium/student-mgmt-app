import ResultDAO from "../db/dao/result.dao";
import { Result } from "../db/models/Result";

class ResultService {
    private resultDAO: ResultDAO;
    constructor(resultDAO: ResultDAO) {
        this.resultDAO = resultDAO;
    }

    public async makeResult(email: string): Promise<void> {
        //
    }
}

export default ResultService;
