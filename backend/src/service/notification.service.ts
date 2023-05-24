import NotificationDAO from "../db/dao/notification.dao";
import { Notification } from "../db/models/Notification";

class NotificationService {
    private notificationDAO: NotificationDAO;
    constructor(notificationDAO: NotificationDAO) {
        this.notificationDAO = notificationDAO;
    }

    public async makeNewStudentNotification(firstName: string, familyName: string): Promise<void> {
        const notificationText = "A new student named " + firstName + " " + familyName + " was added!";
        this.makeNotification(notificationText);
    }

    public async makeNewCourseNotification(courseName: string): Promise<void> {
        const notificationText = "A new course named " + courseName + " was added!";
        this.makeNotification(notificationText);
    }

    private async makeNotification(text: string): Promise<void> {
        await this.notificationDAO.createNotification({ text, seen: false });
    }
}

export default NotificationService;
