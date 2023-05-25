import React, { useState, useEffect } from "react";

import PageBase from "../components/pageBase/pageBase";
import { deleteStudentAPI, getStudentsAPI } from "../api/studentsAPI";
import { IStudent } from "../interface/Student.interface";
import DeleteButton from "../components/button/DeleteButton";

function StudentsListPage() {
    const [studentsList, setStudentsList] = useState<IStudent[]>([]);

    useEffect(() => {
        getStudentsAPI().then(response => {
            console.log(response, "11rm");
            const students = response.data.allStudents;
            setStudentsList(students);
            console.log(students);
        });
    }, []);

    function callDeleteForStudent(studentId: number) {
        deleteStudentAPI(studentId);
        removeStudentFromList(studentId);
    }

    function removeStudentFromList(studentIdToRemove: number) {
        const updated = studentsList.filter((student: IStudent) => {
            if (student.studentId !== studentIdToRemove) {
                return student;
            }
        });
        setStudentsList(updated);
    }

    function formatDOB(dateToFormat: Date): string {
        const YYYYMMDD = dateToFormat.toString().split("T")[0];
        console.log(YYYYMMDD);
        const split = YYYYMMDD.split("-");
        const formatted = split[2] + "/" + split[1] + "/" + split[0];
        return formatted;
    }

    return (
        <PageBase>
            <div>
                <div>Students List Page</div>
                <div>
                    <div>
                        <tr>
                            <th>Name & Family name</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                        {studentsList.map((student: IStudent) => {
                            const fullName = student.firstName + " " + student.familyName;
                            return (
                                <tr>
                                    <td>{fullName}</td>
                                    <td>{formatDOB(student.dob)}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <DeleteButton
                                            id={student.studentId}
                                            callDelete={() => {
                                                callDeleteForStudent(student.studentId);
                                            }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </div>
                </div>
            </div>
        </PageBase>
    );
}

export default StudentsListPage;
