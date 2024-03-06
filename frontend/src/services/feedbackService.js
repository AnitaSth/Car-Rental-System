import apiClient from "./apiClient";

class FeedbackService {
    addFeedback(body, token) {
        return apiClient.post("/feedbacks", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    getFeedbackById(carId) {
        return apiClient.get(`/feedbacks/${carId}`);
    }
}

export default new FeedbackService();
