import { Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";
import { PredictableErrorResponse } from "../interface/PredictableErrorResponse.interface";

export function unwrapAndSetErr(err: unknown, setErr: Dispatch<SetStateAction<string>>) {
    const axiosErr = err as AxiosError;
    const errMsgContent = axiosErr.response?.data as PredictableErrorResponse;
    const reasonForFailure = errMsgContent.error.message;
    setErr(reasonForFailure);
}
