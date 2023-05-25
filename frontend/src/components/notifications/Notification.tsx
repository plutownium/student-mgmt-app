import React, { useContext } from "react";

import { markNotificationReadAPI } from "../../api/notificationsAPI";
import { NotificationsContext } from "../../context/NotificationsContext";

interface NotificationProps {
    notificationId: number;
    text: string;
    seen: boolean;
}

const Notification: React.FC<NotificationProps> = ({ notificationId, text, seen }: NotificationProps) => {
    const { removeFromClientSideList } = useContext(NotificationsContext);

    return (
        <div key={notificationId} className="mb-1 p-2 bg-slate-200 hover:bg-slate-300">
            <button
                onClick={() => {
                    markNotificationReadAPI(notificationId);
                    removeFromClientSideList(notificationId);
                }}
            >
                <div>
                    <p>{text}</p>
                </div>
            </button>
        </div>
    );
};

export default Notification;
