import React from "react";

interface DropdownEntryProps {
    text: string;
}

const DropdownEntry: React.FC<DropdownEntryProps> = ({ text }: DropdownEntryProps) => {
    return (
        <div>
            <div>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default DropdownEntry;
