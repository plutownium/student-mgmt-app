import StudentsDAO from "../db/dao/students.dao";
import { IStudent } from "../interface/Student.interface";
import { Student } from "../db/models/Student";
import NotificationService from "./notification.service";
import { studentIsAtLeastTen } from "../util/ageChecker";

class StudentsService {
    private studentsDAO: StudentsDAO;
    private notificationService: NotificationService;
    constructor(notificationService: NotificationService, studentDAO: StudentsDAO) {
        this.notificationService = notificationService;
        this.studentsDAO = studentDAO;
    }

    public async createStudent(payload: IStudent): Promise<Student> {
        if (!studentIsAtLeastTen(payload.dob)) {
            throw new Error("Student must be at least 10 years old");
        }
        const newStudent = await this.studentsDAO.createStudent(payload);
        this.notificationService.makeNewStudentNotification(payload.firstName, payload.familyName);
        return newStudent;
    }

    public async getAllStudents(): Promise<Student[]> {
        return await this.studentsDAO.getAllStudents();
    }

    public async deleteStudent(studentId: number): Promise<number> {
        return await this.studentsDAO.deleteStudentById(studentId);
    }
}

export default StudentsService;
