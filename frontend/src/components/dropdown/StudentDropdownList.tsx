import React, { MouseEvent } from "react";
import { IStudent } from "../../interface/Student.interface";
import { makeFullName } from "../../util/makeFullName";
import DropdownEntry from "./DropdownEntry";

interface StudentDropdownListProps {
    entries: IStudent[];
    selectOnClick: (id: number) => void;
}

const StudentDropdownList: React.FC<StudentDropdownListProps> = ({ entries, selectOnClick }: StudentDropdownListProps) => {
    return (
        <div className="flex flex-col">
            {entries.map((student: IStudent) => {
                const fullName = makeFullName(student);
                return (
                    <button
                        key={student.studentId}
                        onClick={e => {
                            e.preventDefault();
                            selectOnClick(student.studentId);
                        }}
                    >
                        <DropdownEntry text={fullName} />
                    </button>
                );
            })}
        </div>
    );
};

export default StudentDropdownList;
