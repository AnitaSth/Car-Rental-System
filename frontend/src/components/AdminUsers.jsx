import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import userService from "../services/userService";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

const AdminUsers = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (user) {
            if (user.role === "Admin") {
                userService
                    .getAllUsers(user.token)
                    .then((res) => {
                        setUsers(res.data);
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

    const deleteHandler = async (userId) => {
        const confirm = window.confirm("Are you sure you want to delete?");

        if (confirm) {
            try {
                const response = await userService.deleteUser(
                    userId,
                    user.token
                );

                if (response) {
                    setUsers((prev) =>
                        prev.filter((user) => user.id !== userId)
                    );

                    toast(`User of Id ${userId} is deleted.`, {
                        type: "success",
                        autoClose: 1000,
                    });
                }
            } catch (error) {
                toast("An error occured", { type: "error" });
            }
        }
    };

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : (
                <div className="overflow-x-auto bg-white p-5 rounded-lg">
                    <h1 className="text-center mb-5 text-2xl font-semibold uppercase">
                        Users
                    </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Phone Number</th>
                                <th>Full Name</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <th>{index + 1}</th>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.fullName}</td>
                                    <td>
                                        <span
                                            className={
                                                user.role === "Admin"
                                                    ? "badge badge-primary text-white"
                                                    : user.role ===
                                                      "VehicleOwner"
                                                    ? "badge badge-accent text-white"
                                                    : ""
                                            }
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-error btn-sm text-white"
                                            onClick={() =>
                                                deleteHandler(user.id)
                                            }
                                        >
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

export default AdminUsers;
