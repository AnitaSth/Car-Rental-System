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
                    .getRentals(user.id, user.token)
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
                <div className="overflow-x-auto">
                    <h1 className="text-center mb-5 text-2xl font-semibold uppercase">
                        Rentals
                    </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Car</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Total Cost</th>
                                <th></th>
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
                                    <td>{rental.startDate}</td>
                                    <td>{rental.endDate}</td>
                                    <td>{rental.totalCost}</td>
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

export default AdminRentals;
