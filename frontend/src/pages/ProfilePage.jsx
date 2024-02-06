import { useEffect, useState } from "react";
import rentalService from "../services/rentalService";
import { useAuth } from "../hooks/useAuth";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

const ProfilePage = () => {
    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (user) {
            userService
                .getProfile(user.token)
                .then((res) => {
                    setUserProfile(res.data);
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

    console.log(userProfile);

    return (
        <div className="container mx-auto max-w-sm my-14">
            {isLoading ? (
                <Loader />
            ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : (
                <div className="bg-white p-6 rounded-lg">
                    <h1 className="text-2xl font-bold mb-6">Profile</h1>
                    <div className="flex flex-col gap-y-3">
                        <p>
                            <span className="text-lg font-medium">Name:</span>{" "}
                            {user.fullName}
                        </p>
                        <p>
                            <span className="text-lg font-medium">
                                Phone Number:
                            </span>{" "}
                            {user.phoneNumber}
                        </p>
                        <p>
                            <span className="text-lg font-medium">Role: </span>
                            {user.role}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
