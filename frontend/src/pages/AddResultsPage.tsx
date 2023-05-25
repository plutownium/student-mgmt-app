import React, { useContext, useEffect, useState } from "react";

import PageBase from "../components/pageBase/pageBase";
import { IStudent } from "../interface/Student.interface";
import { ICourse } from "../interface/Course.interface";
import { getStudentsAPI } from "../api/studentsAPI";
import { getAllCoursesAPI } from "../api/courseAPI";
import { makeFullName } from "../util/makeFullName";
import TextFormInput from "../components/formInput/TextFormInput";
import { submitNewResultAPI } from "../api/resultsAPI";
import { NotificationsContext } from "../context/NotificationsContext";
import { unwrapAndSetErr } from "../util/errUnwrapper";
import ClickableFormInput from "../components/formInput/ClickableFormInput";

function AddResultsPage() {
    const [studentsList, setStudentsList] = useState<IStudent[]>([]);
    const [coursesList, setCoursesList] = useState<ICourse[]>([]);

    const [studentId, setStudentId] = useState<null | number>(null);
    const [courseId, setCourseId] = useState<null | number>(null);
    const [chosenCourse, setChosenCourse] = useState("");
    const [chosenStudentName, setChosenStudentName] = useState("");
    const [grade, setGrade] = useState("");
    // dropdown state
    const [studentDropdownIsOpen, setStudentDropdownIsOpen] = useState(false);
    const [courseDropdownIsOpen, setCourseDropdownIsOpen] = useState(false);
    const [gradeDropdownIsOpen, setGradeDropdownIsOpen] = useState(false);
    //
    const [err, setErr] = useState("");
    const [enabledSubmit, setEnabledSubmit] = useState(false);

    const { updateNotifications } = useContext(NotificationsContext);

    useEffect(() => {
        getAllCoursesAPI().then(response => {
            const courses = response.data.courses;
            setCoursesList(courses);
        });
        getStudentsAPI().then(response => {
            const students = response.data.allStudents;
            setStudentsList(students);
            console.log(students);
        });
    });

    async function handleSubmitNewResult(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        e.preventDefault();
        if (studentId === null || courseId === null) return;
        try {
            await submitNewResultAPI(studentId, courseId, grade);
            updateNotifications();
            clearAllTheControls();
        } catch (err) {
            unwrapAndSetErr(err, setErr);
        }
    }

    function clearAllTheControls() {
        setStudentId(null);
        setCourseId(null);
        setChosenCourse("");
        setChosenStudentName("");
        setGrade("");
    }

    function recheckValidInputs() {
        if (studentId !== null && courseId !== null && grade !== "") {
            setEnabledSubmit(true);
        } else {
            setEnabledSubmit(false);
        }
    }

    function handleChooseStudent(event: React.ChangeEvent<HTMLInputElement>) {
        const chosenStudentId = parseInt(event.target.value, 10);
        const chosenStudent = studentsList.find(student => student.studentId === chosenStudentId);
        if (!chosenStudent) {
            return; // should never happen; appeasing typescript
        }
        setChosenStudentName(makeFullName(chosenStudent));
        setStudentId(chosenStudent.studentId);
        recheckValidInputs();
    }

    function handleChooseCourse(event: React.ChangeEvent<HTMLInputElement>) {
        const chosenCourseId = parseInt(event.target.value, 10);
        const chosenCourse = coursesList.find(course => course.courseId === chosenCourseId);
        if (!chosenCourse) {
            return; // should never happen
        }
        setChosenCourse(chosenCourse.name);
        setCourseId(chosenCourse.courseId);
        recheckValidInputs();
    }

    function handleChooseGrade(event: React.ChangeEvent<HTMLInputElement>) {
        const grade = event.target.value;
        setGrade(grade);
        recheckValidInputs();
    }

    function openChooseStudentDropdown() {
        setStudentDropdownIsOpen(true);
    }

    function openChooseCourseDropdown() {
        setCourseDropdownIsOpen(true);
    }

    function openChooseGradeDropdown() {
        setGradeDropdownIsOpen(true);
    }

    return (
        <PageBase>
            <div>
                <form>
                    <div className="mt-12 flex flex-col items-center border-2 border-blue-500">
                        <ClickableFormInput
                            labelText="Student"
                            formText={chosenStudentName}
                            inputName="student-name"
                            openDropdown={openChooseStudentDropdown}
                        />
                        <ClickableFormInput
                            labelText="Course"
                            formText={chosenCourse}
                            inputName="course-name"
                            openDropdown={openChooseCourseDropdown}
                        />
                        <ClickableFormInput labelText="Grade" formText={grade} inputName="grade" openDropdown={openChooseGradeDropdown} />

                        <div className="h-12 p-2">
                            {/* // err msg container */}
                            <p>{err ? "Error: " + err : ""}</p>
                        </div>
                        <div className="rounded-md bg-slate-100 border-2 border-slate-300">
                            <input
                                className="py-2 px-3 w-full h-full disabled:text-slate-300"
                                type="submit"
                                value="Submit"
                                disabled={!enabledSubmit}
                                onClick={e => {
                                    handleSubmitNewResult(e);
                                }}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </PageBase>
    );
}

export default AddResultsPage;
