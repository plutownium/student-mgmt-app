import React, { useEffect, useState } from "react";

import PageBase from "../components/pageBase/pageBase";
import { ICourse } from "../interface/Course.interface";
import { deleteCourseAPI, getAllCoursesAPI } from "../api/courseAPI";
import DeleteButton from "../components/button/DeleteButton";

function CoursesListPage() {
    const [coursesList, setCoursesList] = useState<ICourse[]>([]);

    useEffect(() => {
        getAllCoursesAPI().then(response => {
            const courses = response.data.courses;
            setCoursesList(courses);
        });
    });

    function callDeleteForCourse(courseId: number) {
        console.log("removing course with id", courseId);
        deleteCourseAPI(courseId);
        removeCourseFromList(courseId);
    }

    function removeCourseFromList(courseIdToRemove: number) {
        const updated = coursesList.filter((course: ICourse) => {
            if (course.courseId !== courseIdToRemove) {
                return course;
            }
        });
        setCoursesList(updated);
    }

    return (
        <PageBase>
            <div>
                <div>
                    <div className="w-fit ml-8 px-4 pt-2 pb-1 border border-black">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="pr-8">Course Name </th>
                                    <th>Delete</th>
                                </tr>
                                {coursesList.map((course: ICourse) => {
                                    return (
                                        <tr key={course.courseId}>
                                            <td>{course.name}</td>
                                            <td>
                                                <DeleteButton
                                                    id={course.courseId}
                                                    callDelete={() => {
                                                        callDeleteForCourse(course.courseId);
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

export default CoursesListPage;
