import React from "react";
import { ICourse } from "../../interface/Course.interface";
import DropdownEntry from "./DropdownEntry";

interface CourseDropdownListProps {
    entries: ICourse[];
    selectOnClick: (id: number) => void;
}

const CourseDropdownList: React.FC<CourseDropdownListProps> = ({ entries, selectOnClick }: CourseDropdownListProps) => {
    return (
        <div className="flex flex-col">
            {entries.map((course: ICourse) => {
                return (
                    <button
                        key={course.courseId}
                        onClick={e => {
                            e.preventDefault();

                            selectOnClick(course.courseId);
                        }}
                    >
                        <DropdownEntry text={course.name} />
                    </button>
                );
            })}
        </div>
    );
};

export default CourseDropdownList;
