import CourseDAO from "../db/dao/course.dao";
import ResultDAO from "../db/dao/result.dao";
import StudentsDAO from "../db/dao/students.dao";
import { Result } from "../db/models/Result";
import { IResult, IResultWithAssociations } from "../interface/Result.interface";
import NotificationService from "./notification.service";

class ResultService {
    private notificationService: NotificationService;
    private resultDAO: ResultDAO;
    private studentDAO: StudentsDAO;
    private courseDAO: CourseDAO;
    constructor(notificationService: NotificationService, resultDAO: ResultDAO, studentDAO: StudentsDAO, courseDAO: CourseDAO) {
        this.notificationService = notificationService;
        this.resultDAO = resultDAO;
        this.studentDAO = studentDAO;
        this.courseDAO = courseDAO;
    }

    public async addNewResult(payload: IResult): Promise<boolean> {
        try {
            const course = await this.courseDAO.getCourseById(payload.courseId);
            const student = await this.studentDAO.getStudentById(payload.studentId);
            if (course === null || student === null) {
                throw new Error("Invalid ID error");
            }
            const grade = payload.score;
            const fullName = student.firstName + " " + student.familyName;
            await this.resultDAO.createResult(payload);
            this.notificationService.makeNewResultNotification(fullName, course.name, grade);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public async getAllResults(): Promise<IResultWithAssociations[]> {
        const results = await this.resultDAO.getAllResults();
        const resultsWithNames = [];
        for (let i = 0; i < results.length; i++) {
            const target = results[i];
            const student = await this.studentDAO.getStudentById(target.studentId);
            const course = await this.courseDAO.getCourseById(target.courseId);
            if (student === null || course === null) {
                continue; // ignore it; should never happen as the app is so small
            }
            const withAssociation: IResultWithAssociations = {
                resultId: target.resultId,
                courseId: target.courseId,
                studentId: target.studentId,
                courseName: course.name,
                studentName: student.firstName + " " + student.familyName,
                score: target.score,
            };
            resultsWithNames.push(withAssociation);
        }
        return resultsWithNames;
    }

    public async deleteResultsForStudent(studentId: number): Promise<void> {
        return await this.resultDAO.deleteAllRelatedToStudent(studentId);
    }

    public async deleteResultsForCourse(courseId: number): Promise<void> {
        return await this.resultDAO.deleteAllRelatedToCourse(courseId);
    }
}

export default ResultService;
