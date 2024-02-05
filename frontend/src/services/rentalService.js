import apiClient from "./apiClient";

class RentalService {
    getRentals(token) {
        return apiClient.get(`/rentals/mine`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    getAllRentals(token) {
        return apiClient.get(`/rentals`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    addRental(body, token) {
        return apiClient.post("/rentals", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new RentalService();
