import React, { useState } from "react";

import PageBase from "../components/pageBase/pageBase";

function AddStudentsPage() {
    const [firstName, setFirstName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [dob, setDOB] = useState<null | Date>(null);
    const [email, setEmail] = useState("");

    function isValidEmail(testValue: string) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return testValue.match(emailRegex);
    }

    function isValidAge(testValue: Date) {}

    return (
        <PageBase>
            <div>
                <form>
                    <div>
                        <div>
                            <label>
                                First name:
                                <input type="text" name="first-name" />
                            </label>
                        </div>
                        <div>
                            <label>
                                Family name:
                                <input type="text" name="family-name" />
                            </label>
                        </div>
                        <div>
                            <label>
                                Date of birth:
                                <input type="date" name="dob" />
                            </label>
                        </div>
                        <div>
                            <label>
                                Email:
                                <input type="text" name="email" />
                            </label>
                        </div>

                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </PageBase>
    );
}

export default AddStudentsPage;
