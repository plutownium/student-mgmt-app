import React, { MouseEvent } from "react";

interface ClickableFormInputProps {
    labelText: string;
    formText: string;
    inputName: string;
    openDropdown: (event: MouseEvent) => void;
}

const ClickableFormInput: React.FC<ClickableFormInputProps> = ({ labelText, formText, inputName, openDropdown }: ClickableFormInputProps) => {
    return (
        <div className="pt-2 pb-1 flex w-2/3 flex">
            <div className="w-1/4 flex">
                <label className="flex items-center">{labelText}</label>
            </div>
            <div className="w-3/4 rounded-md border border-slate-400">
                <input
                    className="w-full p-1 rounded-md"
                    type="text"
                    name={inputName}
                    value={formText}
                    onClick={e => {
                        openDropdown(e);
                    }}
                />
            </div>
        </div>
    );
};

export default ClickableFormInput;
