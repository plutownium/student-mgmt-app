// todo

import express, { Request, Response } from "express";

import { HealthCheck } from "../enum/healthCheck.enum";
import NotificationService from "../service/notification.service";
import { handleErrorResponse } from "../util/handleErrorResponse";
import { isString, isStringInteger } from "../validationSchemas/inputValidation";

class NotificationController {
    public path = "/notification";
    public router = express.Router();
    private notificationService: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notificationService = notificationService;
        this.router.put("/read", this.markRead.bind(this));
        this.router.get("/all/notification", this.getAllNotifications.bind(this));
        this.router.get(HealthCheck.healthCheck, this.healthCheck.bind(this));
    }

    public async markRead(request: Request, response: Response) {
        try {

            return response.status(200).json({  });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async getAllNotifications(request: Request, response: Response) {
        try {
            //
            return response.status(200).json({  });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async deleteNotification(request: Request, response: Response) {
        try {
            return response.status(200).json({  });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    async healthCheck(request: Request, response: Response) {
        return response.status(200).json({ status: "Online" });
    }
}

export default NotificationController;
