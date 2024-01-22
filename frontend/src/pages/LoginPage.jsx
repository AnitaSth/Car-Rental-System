import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error } = useLogin();

    const { user } = useAuth();

    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [user, redirect, navigate]);

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const user = await login(phoneNumber, password);
            navigate(redirect);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-sm mx-auto my-20">
            <h1 className="my-5 text-3xl font-semibold">Login</h1>
            <form
                className="flex flex-col gap-y-2 items-center"
                onSubmit={loginHandler}
            >
                <input
                    type="text"
                    placeholder="Enter phone number"
                    className="input input-bordered w-full"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    className="input input-bordered w-full"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="btn btn-neutral w-32">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
