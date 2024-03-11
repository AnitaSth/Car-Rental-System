import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import notificationService from "../services/notificationService";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

const AdminNotifications = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (user) {
            notificationService
                .getAllNotifications(user.token)
                .then((res) => {
                    setNotifications(res.data);
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
        <div>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : (
                <div className="overflow-x-auto bg-white p-5 rounded-lg flex flex-col">
                    <h1 className="text-center mb-5 text-2xl font-semibold uppercase">
                        Notifications
                    </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Sent By</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map((notification, index) => (
                                <tr key={notification.id}>
                                    <th>{index + 1}</th>
                                    <td>{notification.title}</td>
                                    <td>{notification.description}</td>
                                    <td>{notification.user.fullName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminNotifications;
