import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
            await login(phoneNumber, password);
            if (user) {
                navigate(redirect);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div
            id="auth-container"
            className="w-full h-lvh flex flex-col justify-center"
        >
            <div className="max-w-sm mx-auto bg-white p-16 rounded-lg">
                <h1 className="text-2xl text-center font-semibold uppercase">
                    Login
                </h1>
                <form
                    className="flex flex-col gap-y-3 items-center mt-5"
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

                    <button
                        type="submit"
                        className="btn btn-neutral w-28 mt-1 btn-sm"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-10">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-gray-800 font-semibold hover:text-gray-500"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
