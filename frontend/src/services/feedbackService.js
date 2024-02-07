import apiClient from "./apiClient";

class FeedbackService {
    addFeedback(body, token) {
        return apiClient.post("/feedbacks", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new FeedbackService();
