import { useEffect, useState } from "react";
import rentalService from "../services/rentalService";
import { useAuth } from "../hooks/useAuth";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const AdminRentals = () => {
    const { user } = useAuth();
    const [rentals, setRentals] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (user) {
            if (user.role === "Admin") {
                rentalService
                    .getAllRentals(user.token)
                    .then((res) => {
                        setRentals(res.data);
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
                <div className="overflow-x-auto bg-white p-5 rounded-lg">
                    <h1 className="text-center mb-5 text-2xl font-semibold uppercase">
                        Rentals
                    </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Car</th>
                                <th>User</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rentals.map((rental, index) => (
                                <tr key={rental.id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        {rental.car.manufacturer} -{" "}
                                        {rental.car.model}
                                    </td>
                                    <td>{rental.user.phoneNumber}</td>
                                    <td>
                                        {new Date(
                                            rental.startDate
                                        ).toDateString()}{" "}
                                        {new Date(
                                            rental.startDate
                                        ).toLocaleTimeString()}
                                    </td>
                                    <td>
                                        {new Date(
                                            rental.endDate
                                        ).toDateString()}{" "}
                                        {new Date(
                                            rental.endDate
                                        ).toLocaleTimeString()}
                                    </td>
                                    <td>{rental.totalCost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminRentals;
