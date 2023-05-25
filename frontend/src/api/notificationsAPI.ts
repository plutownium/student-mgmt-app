import axios from "axios";
import { BACKEND_URL } from "../util/constants";

export function markNotificationRead(notificationId: number) {
    return axios.put(BACKEND_URL + "/notifications/read/" + notificationId);
}

export function getAllUnreadNotifications() {
    return axios.get(BACKEND_URL + "/notifications/all/unread");
}
