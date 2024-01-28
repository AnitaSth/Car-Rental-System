import { useEffect, useState } from "react";
import rentalService from "../services/rentalService";
import { useAuth } from "../hooks/useAuth";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const UserRentalsPage = () => {
    const { user } = useAuth();
    const [rentals, setRentals] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (user) {
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
    }, [user, navigate]);

    return (
        <div className="container mx-auto max-w-7xl my-14">
            {isLoading ? (
                <Loader />
            ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Car</th>
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
                                    <td>{rental.startDate}</td>
                                    <td>{rental.endDate}</td>
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

export default UserRentalsPage;