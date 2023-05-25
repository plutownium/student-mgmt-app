import { Student, StudentCreationAttributes } from "../models/Student";

class StudentsDAO {
    constructor() {}
    //

    public async createStudent(student: StudentCreationAttributes): Promise<Student> {
        return await Student.create(student);
    }

    public async getAllStudents(): Promise<Student[]> {
        return await Student.findAll();
    }

    public async getStudentById(studentId: number): Promise<Student | null> {
        return await Student.findByPk(studentId);
    }

    public async deleteStudentById(studentId: number): Promise<number> {
        return await Student.destroy({ where: { studentId } });
    }
}

export default StudentsDAO;
