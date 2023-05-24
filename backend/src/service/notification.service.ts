import NotificationDAO from "../db/dao/notification.dao";
import { Notification } from "../db/models/Notification";

class NotificationService {
    private notificationDAO: NotificationDAO;
    constructor(notificationDAO: NotificationDAO) {
        this.notificationDAO = notificationDAO;
    }

    public async makeNotification(text: string): Promise<void> {
        //
    }
}

export default NotificationService;
