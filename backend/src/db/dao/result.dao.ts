import { Result, ResultCreationAttributes } from "../models/Result";

class ResultDAO {
    constructor() {}
    //

    public async createResult(result: ResultCreationAttributes): Promise<Result> {
        return await Result.create(result);
    }

    public async getAllResults(profileId: number): Promise<Result[]> {
        return await Result.findAll({ include: { required: true, model: Result, where: { profileId } } });
    }
}

export default ResultDAO;
