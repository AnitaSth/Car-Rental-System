import apiClient from "./apiClient";

class CarService {
    getAllCars() {
        return apiClient.get("/cars");
    }

    getCRSCars() {
        return apiClient.get("/cars/crs");
    }

    getThirdParty() {
        return apiClient.get("/cars/thirdparty");
    }

    getSingleCar(carId) {
        return apiClient.get(`/cars/${carId}`);
    }

    addCar(body, token) {
        return apiClient.post("/cars", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    deleteCar(carId, token) {
        return apiClient.delete(`/cars/${carId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    updateCar(carId, body, token) {
        return apiClient.put(`/cars/${carId}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new CarService();
