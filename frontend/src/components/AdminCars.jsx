import { useEffect, useState } from "react";
import rentalService from "../services/rentalService";
import { useAuth } from "../hooks/useAuth";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import carService from "../services/carService";

const AdminCars = () => {
    const { user } = useAuth();
    const [cars, setCars] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (user) {
            if (user.role === "Admin") {
                carService
                    .getAllCars()
                    .then((res) => {
                        setCars(res.data);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        setError(error.message);
                        setIsLoading(false);
                    });
            } else {
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : (
                <div className="overflow-x-auto">
                    <h1 className="text-center mb-5 text-2xl font-semibold uppercase">
                        Cars
                    </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Car</th>
                                <th>License Plate</th>
                                <th>Color</th>
                                <th>Rental Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car, index) => (
                                <tr key={car.id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        {car.manufacturer} - {car.model}
                                    </td>
                                    <td>{car.licensePlate}</td>
                                    <td>{car.color}</td>
                                    <td>Rs. {car.rentalPrice}</td>
                                    <td className="flex gap-x-2 justify-center">
                                        <button className="btn btn-success btn-sm text-white">
                                            Update
                                        </button>
                                        <button className="btn btn-error btn-sm text-white">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminCars;
