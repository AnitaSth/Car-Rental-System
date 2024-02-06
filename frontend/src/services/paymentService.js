import apiClient from "./apiClient";

class CarService {
    pay(body, token) {
        return apiClient.post("/payments", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    getAllPayments(token) {
        return apiClient.get("/payments", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new CarService();
