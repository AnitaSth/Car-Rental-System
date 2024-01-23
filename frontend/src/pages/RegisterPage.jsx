import { useState, useEffect } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("Customer");
    const { register, isLoading, error } = useRegister();

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

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const registerHandler = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            await register(phoneNumber, fullName, password, role);
            setPhoneNumber("");
            setFullName("");
            setPassword("");
            setConfirmPassword("");
            setRole("Customer");
            navigate("/login");
        } else {
            console.log("Passwords do not match");
        }
    };

    return (
        <div
            id="auth-container"
            className="w-full h-lvh flex flex-col justify-center"
        >
            <div className="max-w-sm mx-auto bg-white p-12 px-16 rounded-lg">
                <h1 className="text-2xl text-center font-semibold uppercase">
                    Register
                </h1>
                <form
                    className="flex flex-col gap-y-3 items-center mt-5"
                    onSubmit={registerHandler}
                >
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        className="input input-bordered w-full"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter full name"
                        className="input input-bordered w-full"
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="input input-bordered w-full"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        className="input input-bordered w-full"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <div className="flex flex-col gap-y-4 self-start my-3">
                        <div className="flex items-center gap-x-2">
                            <input
                                id="customer"
                                type="radio"
                                name="role"
                                className="radio radio-sm"
                                value="Customer"
                                checked={role === "Customer"}
                                onChange={handleRoleChange}
                            />
                            <label
                                htmlFor="customer"
                                className="cursor-pointer"
                            >
                                Customer
                            </label>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <input
                                id="vehicleOwner"
                                type="radio"
                                name="role"
                                className="radio radio-sm"
                                value="VehicleOwner"
                                checked={role === "VehicleOwner"}
                                onChange={handleRoleChange}
                            />
                            <label
                                htmlFor="vehicleOwner"
                                className="cursor-pointer"
                            >
                                Vehcile Owner
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-neutral w-28 mt-1 btn-sm"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-8">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-gray-800 font-semibold hover:text-gray-500"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
