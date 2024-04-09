import apiClient from "./apiClient";

class NotificationService {
    getAllNotifications(token) {
        return apiClient.get(`/notifications`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    addNotification(body, token) {
        return apiClient.post("/notifications", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    updateNofication(notificationId, token) {
        return apiClient.put(`/notifications/${notificationId}`);
    }
}

export default new NotificationService();
