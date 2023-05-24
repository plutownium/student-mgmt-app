import StudentDAO from "../db/dao/student.dao";
import { Student } from "../db/models/Student";

class StudentsService {
    private studentDAO: StudentDAO;
    constructor(studentDAO: StudentDAO) {
        this.studentDAO = studentDAO;
    }

    public async makeStudent(email: string): Promise<void> {
        //
    }
}

export default StudentsService;
