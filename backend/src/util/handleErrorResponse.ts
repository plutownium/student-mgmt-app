import { Response } from "express";
import { ZodError } from "zod";

export function handleErrorResponse(response: Response, error: unknown) {
    console.log(error, "in handleErrorResponse");
    if (error instanceof ZodError) {
        const message = JSON.parse(error.message);
        return response.status(400).json({ error: { name: error.name, message } });
    } else if (error instanceof Error) {
        return response.status(400).json({ error: { name: error.name, message: error.message } });
    } else {
        return response.status(400).json(error);
    }
}
