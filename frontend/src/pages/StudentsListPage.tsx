import React, { useState, useEffect } from "react";

import PageBase from "../components/pageBase/pageBase";
import { deleteStudentAPI, getStudentsAPI } from "../api/studentsAPI";
import { IStudent } from "../interface/Student.interface";
import DeleteButton from "../components/button/DeleteButton";

function StudentsListPage() {
    const [studentsList, setStudentsList] = useState<IStudent[]>([]);

    useEffect(() => {
        getStudentsAPI().then(response => {
            const students = response.data.allStudents;
            setStudentsList(students);
            console.log(students);
        });
    }, []);

    function callDeleteForStudent(studentId: number) {
        console.log("removing student with id", studentId);
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
        const split = YYYYMMDD.split("-");
        const formatted = split[2] + "/" + split[1] + "/" + split[0];
        return formatted;
    }

    return (
        <PageBase>
            <div>
                <div>
                    <div className="w-fit ml-8 px-4 pt-2 pb-1 border border-black">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name & Family name</th>
                                    <th>DOB</th>
                                    <th>Email</th>
                                    <th>Delete</th>
                                </tr>
                                {studentsList.map((student: IStudent) => {
                                    const fullName = student.firstName + " " + student.familyName;
                                    return (
                                        <tr key={student.studentId}>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PageBase>
    );
}

export default StudentsListPage;
