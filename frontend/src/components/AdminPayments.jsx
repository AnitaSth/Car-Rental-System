import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import paymentService from "../services/paymentService";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

const AdminPayments = () => {
    const { user } = useAuth();
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (user) {
            if (user.role === "Admin") {
                paymentService
                    .getAllPayments(user.token)
                    .then((res) => {
                        setPayments(res.data);
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
                        Payments
                    </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>User</th>
                                <th>Rental Id</th>
                                <th>Payment Amount</th>
                                <th>Status</th>
                                <th>Payment Method</th>
                                <th>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment.id}>
                                    <th>{index + 1}</th>
                                    <td>{payment.user.phoneNumber}</td>
                                    <td>{payment.rentalId}</td>
                                    <td>{payment.paymentAmount}</td>
                                    <td>{payment.status}</td>
                                    <td>{payment.paymentMethod}</td>

                                    <td>
                                        {payment.paymentDate
                                            ? `${new Date(
                                                  payment.paymentDate
                                              ).toDateString()} ${new Date(
                                                  payment.paymentDate
                                              ).toLocaleTimeString()}`
                                            : "Not Paid"}
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

export default AdminPayments;
