import axios from "axios";
import { useState } from "react";
import { useAuth } from "./useAuth";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuth();

    const login = async (phoneNumber, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const user = {
                phoneNumber,
                password,
            };

            const response = await axios.post(
                "https://localhost:7056/api/auth/login",
                user,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch({ type: "LOGIN", payload: response.data });

            setIsLoading(false);
            console.log(first);
            return user;
        } catch (error) {
            setError(error.response?.data || "An error occurred");
            setIsLoading(false);
        }
    };

    return { login, error, isLoading };
};
