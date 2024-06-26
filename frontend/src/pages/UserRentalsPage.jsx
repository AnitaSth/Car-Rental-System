import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import RentalModal from "../components/RentalModal";
import { useAuth } from "../hooks/useAuth";
import rentalService from "../services/rentalService";

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
                .getRentals(user.token)
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
            ) : rentals.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Car</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Duration</th>
                                <th>Total Cost</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                                <th>Payment Date</th>
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
                                        ).toDateString()}
                                        {new Date(
                                            rental.endDate
                                        ).toLocaleTimeString()}
                                    </td>
                                    <td>{rental.duration}</td>
                                    <td>{rental.totalCost}</td>
                                    <td>{rental.payment.paymentMethod}</td>
                                    <td>{rental.payment.status}</td>
                                    <td>
                                        {rental.payment.paymentDate
                                            ? `${new Date(
                                                  rental.payment.paymentDate
                                              ).toDateString()} ${new Date(
                                                  rental.payment.paymentDate
                                              ).toLocaleTimeString()}`
                                            : "Not Paid"}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        `feedback-${rental.id}`
                                                    )
                                                    .showModal()
                                            }
                                        >
                                            Feedback
                                        </button>
                                        <RentalModal
                                            carId={rental.carId}
                                            rentalId={rental.id}
                                            car={rental.car}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h1 className="text-center text-lg font-semibold">
                    No Rentals Yet
                </h1>
            )}
        </div>
    );
};

export default UserRentalsPage;
