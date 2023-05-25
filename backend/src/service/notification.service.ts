import NotificationDAO from "../db/dao/notification.dao";
import { Notification } from "../db/models/Notification";

class NotificationService {
    private notificationDAO: NotificationDAO;
    constructor(notificationDAO: NotificationDAO) {
        this.notificationDAO = notificationDAO;
    }

    public async makeNewStudentNotification(firstName: string, familyName: string): Promise<void> {
        const notificationText = "New student named " + firstName + " " + familyName + "!";
        this.makeNotification(notificationText);
    }

    public async makeNewCourseNotification(courseName: string): Promise<void> {
        const notificationText = "Course added: " + courseName;
        this.makeNotification(notificationText);
    }

    public async makeNewResultNotification(studentName: string, courseName: string, grade: string): Promise<void> {
        const notificationText = `New result for ${studentName} with ${courseName}: grade ${grade}`;
        this.makeNotification(notificationText);
    }

    public async getAllUnreadNotifications(): Promise<Notification[]> {
        return await this.notificationDAO.getAllUnreadNotifications();
    }

    public async markRead(notificationId: number): Promise<void> {
        await this.notificationDAO.markRead(notificationId);
    }

    private async makeNotification(text: string): Promise<void> {
        await this.notificationDAO.createNotification({ text, seen: false });
    }
}

export default NotificationService;
