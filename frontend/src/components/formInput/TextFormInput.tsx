import React, { ChangeEvent } from "react";

interface FormInputProps {
    labelText: string;
    formText: string;
    inputName: string;
    handleUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextFormInput: React.FC<FormInputProps> = ({ labelText, formText, inputName, handleUpdate }: FormInputProps) => {
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
                    onChange={e => {
                        handleUpdate(e);
                    }}
                />
            </div>
        </div>
    );
};

export default TextFormInput;
