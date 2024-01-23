import apiClient from "./apiClient";

class CarService {
    getAllCars() {
        return apiClient.get("/cars");
    }

    getSingleCar(carId) {
        return apiClient.get(`/cars/${carId}`);
    }
}

export default new CarService();
