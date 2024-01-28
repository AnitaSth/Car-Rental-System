import apiClient from "./apiClient";

class RentalService {
    getRentals(id, token) {
        return apiClient.get(`/rentals?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new RentalService();
