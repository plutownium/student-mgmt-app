import { Response } from "express";

export function handleErrorResponse(response: Response, error: unknown) {
    console.log(error, "in handleErrorResponse");
    if (error instanceof Error) {
        return response.status(400).json({ error: { name: error.name, message: error.message } });
    }
    return response.status(400).json(error);
}
