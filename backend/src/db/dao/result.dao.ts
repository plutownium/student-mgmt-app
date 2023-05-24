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

    public async deleteAllRelatedToCourse(courseId: number): Promise<void> {
        await Result.destroy({ where: { courseId } });
    }

    public async deleteAllRelatedToStudent(studentId: number): Promise<void> {
        await Result.destroy({ where: { studentId } });
    }
}

export default ResultDAO;
