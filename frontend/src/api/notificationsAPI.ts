import axios from "axios";
import { BACKEND_URL } from "../util/constants";

export function markNotificationReadAPI(notificationId: number) {
    return axios.put(BACKEND_URL + "/notifications/read/" + notificationId);
}

export function getAllUnreadNotificationsAPI() {
    return axios.get(BACKEND_URL + "/notifications/all/unread");
}
