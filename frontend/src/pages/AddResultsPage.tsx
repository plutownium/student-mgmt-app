import React, { useContext, useEffect, useRef, useState } from "react";

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
import DropdownContainer from "../components/dropdown/DropdownContainer";
import CourseDropdownList from "../components/dropdown/CourseDropdownList";
import GradeDropdownList from "../components/dropdown/GradeDropdownList";
import StudentDropdownList from "../components/dropdown/StudentDropdownList";

function AddResultsPage() {
    const gradeList = ["A", "B", "C", "D", "E", "F"];
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
    }, []);

    async function handleSubmitNewResult(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        e.preventDefault();
        if (studentId === null || courseId === null) return;
        try {
            await submitNewResultAPI(studentId, courseId, grade);
            updateNotifications();
            clearAllTheControls();
        } catch (err) {
            console.log(err, "59rm");
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

    function recheckValidInputs(studentId: number | null, courseId: number | null, grade: string) {
        console.log(studentId, courseId, grade, "73rm");
        if (studentId !== null && courseId !== null && grade !== "") {
            setEnabledSubmit(true);
        } else {
            setEnabledSubmit(false);
        }
    }

    function handleChooseStudent(chosenStudentId: number) {
        // console.log(event, "80rm");
        // if (event.target === null) {
        // throw new Error("null value error");
        // }
        // const chosenStudentId = parseInt(event.target.value, 10);
        const chosenStudent = studentsList.find(student => student.studentId === chosenStudentId);
        if (!chosenStudent) {
            return; // should never happen; appeasing typescript
        }
        setChosenStudentName(makeFullName(chosenStudent));
        setStudentId(chosenStudent.studentId);
        recheckValidInputs(chosenStudent.studentId, courseId, grade);
        setStudentDropdownIsOpen(false);
    }

    function handleChooseCourse(chosenCourseId: number) {
        const chosenCourse = coursesList.find(course => course.courseId === chosenCourseId);
        if (!chosenCourse) {
            return; // should never happen
        }
        setChosenCourse(chosenCourse.name);
        setCourseId(chosenCourse.courseId);
        recheckValidInputs(studentId, chosenCourse.courseId, grade);
        setCourseDropdownIsOpen(false);
    }

    function handleChooseGrade(grade: string) {
        setGrade(grade);
        recheckValidInputs(studentId, courseId, grade);
        setGradeDropdownIsOpen(false);
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

    // *** related to the dropdown ***
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [xOffset, setX] = useState<number | undefined>();
    const [yOffset, setY] = useState<number | undefined>();
    const getPosition = () => {
        const x = dropdownRef.current?.offsetLeft;
        if (!x) return; // it'll always be there.
        const xWithAdjustment = x + 255;
        setX(xWithAdjustment);

        const y = dropdownRef.current?.offsetTop;
        const approxInputHeight = 31;
        const yWithHeightOfInputFactoredIn = y ? y + approxInputHeight : y;
        setY(yWithHeightOfInputFactoredIn);
    };

    useEffect(() => {
        getPosition();
    }, []);
    useEffect(() => {
        window.addEventListener("resize", getPosition);
    }, []);
    // *** end dropdown section ***

    return (
        <PageBase>
            <div>
                <form autoComplete="off">
                    <div ref={dropdownRef} className="mt-12 flex flex-col items-center border-2 border-blue-500">
                        <ClickableFormInput
                            labelText="Student"
                            formText={chosenStudentName}
                            inputName="student-name"
                            openDropdown={openChooseStudentDropdown}
                        />
                        <DropdownContainer
                            isOpen={studentDropdownIsOpen}
                            leftDisplacement={xOffset}
                            topDisplacement={yOffset}
                            width={280}
                            closeDropdown={() => {
                                setStudentDropdownIsOpen(false);
                            }}
                        >
                            <StudentDropdownList entries={studentsList} selectOnClick={handleChooseStudent} />
                        </DropdownContainer>

                        <ClickableFormInput
                            labelText="Course"
                            formText={chosenCourse}
                            inputName="course-name"
                            openDropdown={openChooseCourseDropdown}
                        />
                        <DropdownContainer
                            isOpen={courseDropdownIsOpen}
                            leftDisplacement={xOffset}
                            topDisplacement={yOffset}
                            width={280}
                            closeDropdown={() => {
                                setCourseDropdownIsOpen(false);
                            }}
                        >
                            <CourseDropdownList entries={coursesList} selectOnClick={handleChooseCourse} />
                        </DropdownContainer>

                        <ClickableFormInput labelText="Grade" formText={grade} inputName="grade" openDropdown={openChooseGradeDropdown} />

                        <DropdownContainer
                            isOpen={gradeDropdownIsOpen}
                            leftDisplacement={xOffset}
                            topDisplacement={yOffset}
                            width={280}
                            closeDropdown={() => {
                                setGradeDropdownIsOpen(false);
                            }}
                        >
                            <GradeDropdownList entries={gradeList} selectOnClick={handleChooseGrade} />
                        </DropdownContainer>

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
