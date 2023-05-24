import { Result, ResultCreationAttributes } from "../models/Result";

class ResultDAO {
    constructor() {}
    //

    public async createResult(result: ResultCreationAttributes): Promise<Result> {
        return await Result.create(result);
    }

    public async getAllResults(): Promise<Result[]> {
        return await Result.findAll();
    }
}

export default ResultDAO;
