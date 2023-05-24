// todo

import express, { Request, Response } from "express";

import { HealthCheck } from "../enum/healthCheck.enum";
import NotificationService from "../service/notification.service";
import { handleErrorResponse } from "../util/handleErrorResponse";
import { isStringInteger } from "../validation/inputValidation";

class NotificationController {
    public path = "/notifications";
    public router = express.Router();
    private notificationService: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notificationService = notificationService;
        this.router.put("/read/:notificationid", this.markRead.bind(this));
        this.router.get("/all/unread", this.getAllUnreadNotifications.bind(this));
        this.router.get(HealthCheck.healthCheck, this.healthCheck.bind(this));
    }

    public async markRead(request: Request, response: Response) {
        try {
            const notificationIdInput = request.params.notificationid;
            const notificationId = isStringInteger(notificationIdInput);
            await this.notificationService.markRead(notificationId);
            return response.status(200).json({});
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    public async getAllUnreadNotifications(request: Request, response: Response) {
        try {
            const unread = await this.notificationService.getAllUnreadNotifications();
            return response.status(200).json({ unread });
        } catch (err) {
            return handleErrorResponse(response, err);
        }
    }

    // public async deleteNotification(request: Request, response: Response) {
    //     try {
    //         return response.status(200).json({});
    //     } catch (err) {
    //         return handleErrorResponse(response, err);
    //     }
    // }

    async healthCheck(request: Request, response: Response) {
        return response.status(200).json({ status: "Online" });
    }
}

export default NotificationController;
