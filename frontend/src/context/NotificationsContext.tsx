import React, { createContext, useContext, useEffect, useState } from "react";
import { INotification } from "../interface/Notification.interface";
import { getAllUnreadNotificationsAPI } from "../api/notificationsAPI";

export interface INotificationsContext {
    notifications: INotification[];
    count: number;
    updateNotifications: () => void;
    removeFromClientSideList: (id: number) => void;
}

export const defaultState = {
    notifications: [],
    count: 0,
    updateNotifications: () => {
        /* do nothing -- suppressing eslint complaints */
    },
    removeFromClientSideList: () => {
        /* do nothing -- suppressing eslint complaints */
    },
};

interface ChildrenProps {
    children: React.ReactNode;
}

export const NotificationsContext = createContext<INotificationsContext>({} as INotificationsContext);

export function useNotificationsContext() {
    return useContext(NotificationsContext);
}

const NotificationsProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [count, setCount] = useState(0);

    function updateNotifications() {
        getAllUnreadNotificationsAPI().then(response => {
            const unread = response.data.unread;
            setNotifications(unread);
            const counted = unread.length;
            setCount(counted);
        });
    }

    function removeFromClientSideList(notificationIdToRemove: number) {
        // sync up client data with server side
        const updated = notifications.filter((notification: INotification) => {
            if (notificationIdToRemove !== notification.notificationId) {
                return notification;
            }
        });
        setNotifications(updated);
        const newCount = count - 1;
        setCount(newCount);
    }

    return (
        <NotificationsContext.Provider value={{ notifications, count, updateNotifications, removeFromClientSideList }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export default NotificationsProvider;
