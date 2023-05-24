import StudentsDAO from "../db/dao/students.dao";
import { IStudent } from "../interface/Student.interface";
import { Student } from "../db/models/Student";
import NotificationService from "./notification.service";

class StudentsService {
    private studentsDAO: StudentsDAO;
    private notificationService: NotificationService;
    constructor(notificationService: NotificationService, studentDAO: StudentsDAO) {
        this.notificationService = notificationService;
        this.studentsDAO = studentDAO;
    }

    public async createStudent(payload: IStudent): Promise<void> {
        //
        this.notificationService.makeNewStudentNotification(payload.firstName, payload.familyName);
    }

    public async getAllStudents(): Promise<Student[]> {
        return await this.studentsDAO.getAllStudents();
    }

    public async deleteStudent(studentId: number): Promise<number> {
        return await this.studentsDAO.deleteStudentById(studentId);
    }
}

export default StudentsService;
