import React, { useContext, useState } from "react";

import PageBase from "../components/pageBase/pageBase";
import TextFormInput from "../components/formInput/TextFormInput";
import { makeCourseAPI } from "../api/courseAPI";
import { NotificationsContext } from "../context/NotificationsContext";
import { AxiosError } from "axios";
import { PredictableErrorResponse } from "../interface/PredictableErrorResponse.interface";
import { unwrapAndSetErr } from "../util/errUnwrapper";

function AddCoursesPage() {
    const [courseName, setCourseName] = useState("");
    const [enabledSubmit, setEnabledSubmit] = useState(false);

    const [err, setErr] = useState("");

    const { updateNotifications } = useContext(NotificationsContext);

    function handleUpdateCourseName(event: React.ChangeEvent<HTMLInputElement>) {
        setCourseName(event.target.value);
        recheckValidInputs();
    }

    function recheckValidInputs() {
        if (courseName.length > 1) {
            setEnabledSubmit(true);
        } else {
            setEnabledSubmit(false);
        }
    }

    async function handleSubmitNewCourse(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        e.preventDefault();
        try {
            await makeCourseAPI(courseName);
            updateNotifications();
            clearAllTheControls();
        } catch (err) {
            unwrapAndSetErr(err, setErr);
        }
    }

    function clearAllTheControls() {
        setCourseName("");
        recheckValidInputs();
    }

    return (
        <PageBase>
            <div>
                <form>
                    <div className="mt-12 flex flex-col items-center border-2 border-blue-500">
                        <TextFormInput labelText="Course name" formText={courseName} inputName="course-name" handleUpdate={handleUpdateCourseName} />

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
                                    handleSubmitNewCourse(e);
                                }}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </PageBase>
    );
}

export default AddCoursesPage;
