import { Notification, NotificationCreationAttributes } from "../models/Notification";

class NotificationDAO {
    constructor() {}
    //

    public async createNotification(notification: NotificationCreationAttributes): Promise<Notification> {
        return await Notification.create(notification);
    }

    public async getAllUnreadNotifications(): Promise<Notification[]> {
        return await Notification.findAll({ where: { seen: false } });
    }

    public async markRead(notificationId: number): Promise<void> {
        await Notification.update({ seen: true }, { where: { notificationId } });
    }
}

export default NotificationDAO;
