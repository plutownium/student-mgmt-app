import React, { useState } from "react";
import { AxiosError } from "axios";

import PageBase from "../components/pageBase/pageBase";

import { addNewStudentAPI } from "../api/studentsAPI";
import TextFormInput from "../components/formInput/TextFormInput";
import DateFormInput from "../components/formInput/DateFormInput";
import { PredictableErrorResponse } from "../interface/PredictableErrorResponse.interface";

function AddStudentsPage() {
    const [firstName, setFirstName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [dob, setDOB] = useState("");
    const [email, setEmail] = useState("");

    const [err, setErr] = useState("");

    async function handleSubmitNewStudent(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        e.preventDefault();
        if (dob === "") {
            setErr("Must choose a date of birth");
            return;
        }
        try {
            await addNewStudentAPI(firstName, familyName, dob, email);
            // updateNotifications()
            // todo: expect a notification! perhaps query the backend?
            clearAllTheControls();
        } catch (err) {
            const axiosErr = err as AxiosError;
            const errMsgContent = axiosErr.response?.data as PredictableErrorResponse;
            const reasonForFailure = errMsgContent.error.message;
            setErr(reasonForFailure);
        }
    }

    function clearAllTheControls() {
        setFirstName("");
        setFamilyName("");
        setDOB("");
        setEmail("");
        setErr(""); // clear old error msg
    }

    function handleUpdateFirstName(event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value);
    }

    function handleUpdateFamilyName(event: React.ChangeEvent<HTMLInputElement>) {
        setFamilyName(event.target.value);
    }

    function handleUpdateDOB(event: React.ChangeEvent<HTMLInputElement>) {
        setDOB(event.target.value);
    }

    function handleUpdateEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    return (
        <PageBase>
            <div>
                <form id="student-create-form">
                    <div className="mt-12 flex flex-col items-center border-2 border-blue-500">
                        <TextFormInput labelText="First name" formText={firstName} inputName="first-name" handleUpdate={handleUpdateFirstName} />
                        <TextFormInput labelText="Family name" formText={familyName} inputName="family-name" handleUpdate={handleUpdateFamilyName} />
                        <DateFormInput labelText="DOB" formText={dob} inputName="date" handleUpdate={handleUpdateDOB} />
                        <TextFormInput labelText="Email" formText={email} inputName="email" handleUpdate={handleUpdateEmail} />

                        <div className="h-12 p-2">
                            {/* // err msg container */}
                            <p>{err ? "Error: " + err : ""}</p>
                        </div>
                        <div className="py-2 px-3 rounded-md bg-slate-100 border-2 border-slate-300">
                            <input
                                type="submit"
                                value="Submit"
                                onClick={e => {
                                    handleSubmitNewStudent(e);
                                }}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </PageBase>
    );
}

export default AddStudentsPage;
