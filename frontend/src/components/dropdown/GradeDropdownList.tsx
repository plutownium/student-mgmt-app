import React from "react";
import { IStudent } from "../../interface/Student.interface";
import { ICourse } from "../../interface/Course.interface";
import DropdownEntry from "./DropdownEntry";

interface GradeDropdownListProps {
    entries: string[];
    selectOnClick: (grade: string) => void;
}

const GradeDropdownList: React.FC<GradeDropdownListProps> = ({ entries, selectOnClick }: GradeDropdownListProps) => {
    return (
        <div className="flex flex-col">
            {entries.map((grade: string, i: number) => {
                return (
                    <button
                        key={i}
                        onClick={e => {
                            e.preventDefault();

                            selectOnClick(grade);
                        }}
                    >
                        <DropdownEntry text={grade} />
                    </button>
                );
            })}
        </div>
    );
};

export default GradeDropdownList;
