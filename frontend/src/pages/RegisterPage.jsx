import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Customer");
    const { register, isLoading, error } = useRegister();

    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const registerHandler = async (e) => {
        e.preventDefault();
        await register(phoneNumber, password, role);
        setPhoneNumber("");
        setPassword("");
        setRole("Customer");
        navigate("/login");
    };

    return (
        <div className="max-w-sm mx-auto my-20">
            <h1 className="my-5 text-3xl font-semibold">Register</h1>
            <form
                className="flex flex-col gap-y-2 items-center"
                onSubmit={registerHandler}
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

                <div className="flex flex-col gap-y-4 self-start my-3 mb-7">
                    <div className="flex items-center gap-x-2">
                        <input
                            id="customer"
                            type="radio"
                            name="role"
                            className="radio"
                            value="Customer"
                            checked={role === "Customer"}
                            onChange={handleRoleChange}
                        />
                        <label htmlFor="customer" className="cursor-pointer">
                            Customer
                        </label>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <input
                            id="vehicleOwner"
                            type="radio"
                            name="role"
                            className="radio"
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

                <button type="submit" className="btn btn-neutral w-32">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
