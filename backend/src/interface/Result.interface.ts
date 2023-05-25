export interface IResult {
    courseId: number;
    studentId: number;
    score: string;
}

export interface IResultWithAssociations extends IResult {
    resultId: number;
    courseName: string;
    studentName: string;
}
