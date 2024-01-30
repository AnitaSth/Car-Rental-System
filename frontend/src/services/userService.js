import apiClient from "./apiClient";

class UserService {
    getUsers(token) {
        return apiClient.get("/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    deleteUser(userId, token) {
        return apiClient.delete(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new UserService();
