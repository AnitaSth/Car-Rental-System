import { useEffect, useState } from "react";
import rentalService from "../services/rentalService";
import { useAuth } from "../hooks/useAuth";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import carService from "../services/carService";
import { MdAddCircle } from "react-icons/md";
import Modal from "./Modal";
import { toast } from "react-toastify";

const AdminCars = () => {
    const { user } = useAuth();
    const [cars, setCars] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [edit, setEdit] = useState(false);
    const [carId, setCarId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (user) {
            if (user.role === "Admin") {
                carService
                    .getAllCars()
                    .then((res) => {
                        setCars(res.data);
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

    const deleteCarHandler = async (carId) => {
        const confirm = window.confirm("Are you sure you want to delete?");

        if (confirm) {
            try {
                const response = await carService.deleteCar(carId, user.token);
                if (response) {
                    setCars((prev) => prev.filter((car) => car.id !== carId));

                    toast(`Car of Id ${carId} is deleted.`, {
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
                <div className="overflow-x-auto bg-white p-5 rounded-lg flex flex-col">
                    <button
                        className="btn btn-outline btn-success w-44 self-end mr-8"
                        onClick={() => {
                            document.getElementById("car_modal").showModal();
                            setEdit(false);
                        }}
                    >
                        <MdAddCircle />
                        Add Car
                    </button>
                    <h1 className="text-center mb-5 text-2xl font-semibold uppercase">
                        Cars
                    </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Car</th>
                                <th>License Plate</th>
                                <th>Color</th>
                                <th>Rental Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car, index) => (
                                <tr key={car.id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        {car.manufacturer} - {car.model}
                                    </td>
                                    <td>{car.licensePlate}</td>
                                    <td>{car.color}</td>
                                    <td>Rs. {car.rentalPrice}</td>
                                    <td className="flex gap-x-2 justify-center">
                                        <button
                                            className="btn btn-success btn-sm text-white"
                                            onClick={() => {
                                                document
                                                    .getElementById("car_modal")
                                                    .showModal();
                                                setEdit(true);
                                                setCarId(car.id);
                                            }}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-error btn-sm text-white"
                                            onClick={() =>
                                                deleteCarHandler(car.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Modal edit={edit} carId={carId} setCars={setCars} />
                </div>
            )}
        </div>
    );
};

export default AdminCars;
