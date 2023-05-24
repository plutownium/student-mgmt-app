import { Student, StudentCreationAttributes } from "../models/Student";

class StudentDAO {
    constructor() {}
    //

    public async createStudent(student: StudentCreationAttributes): Promise<Student> {
        return await Student.create(student);
    }

    public async getAllStudents(profileId: number): Promise<Student[]> {
        return await Student.findAll({ include: { required: true, model: Student, where: { profileId } } });
    }
}

export default StudentDAO;
