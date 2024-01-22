import { useState } from "react";
import axios from "axios";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const register = async (phoneNumber, password, role) => {
        setIsLoading(true);
        setError(null);

        try {
            const user = {
                phoneNumber,
                password,
                role,
            };

            await axios.post("https://localhost:7056/api/auth/register", user, {
                headers: { "Content-Type": "application/json" },
            });

            setIsLoading(false);
        } catch (error) {
            setError(error.response?.data || "An error occurred");
            setIsLoading(false);
        }
    };

    return { register, error, isLoading };
};
