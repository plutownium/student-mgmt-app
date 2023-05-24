import { Notification, NotificationCreationAttributes } from "../models/Notification";

class NotificationDAO {
    constructor() {}
    //

    public async createNotification(notification: NotificationCreationAttributes): Promise<Notification> {
        return await Notification.create(notification);
    }

    public async getAllNotifications(profileId: number): Promise<Notification[]> {
        return await Notification.findAll({ include: { required: true, model: Notification, where: { profileId } } });
    }
}

export default NotificationDAO;
