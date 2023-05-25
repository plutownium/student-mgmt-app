import React from "react";
import { INotification } from "../../interface/Notification.interface";
import Notification from "./Notification";

interface NotificationsDropdownProps {
    notifications: INotification[];
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ notifications }: NotificationsDropdownProps) => {
    return (
        <div>
            {notifications.map((notification: INotification) => {
                return (
                    <Notification
                        key={notification.notificationId}
                        notificationId={notification.notificationId}
                        text={notification.text}
                        seen={notification.seen}
                    />
                );
            })}
        </div>
    );
};

export default NotificationsDropdown;
