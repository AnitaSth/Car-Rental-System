import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useAuth } from "../hooks/useAuth";
import carService from "../services/carService";

const CarsPage = () => {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        setIsLoading(true);
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
    }, []);

    return (
        <div className="container mx-auto max-w-7xl my-5 flex flex-col">
            {user &&
                (user.role === "Admin" || user.role === "VehicleOwner") && (
                    <button className="btn btn-outline btn-success w-44 self-end mr-8">
                        <MdAddCircle />
                        Add Car
                    </button>
                )}
            {isLoading && <Loader />}
            {error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : (
                <div className="grid grid-cols-3 justify-items-center">
                    {cars.map((car) => (
                        <div
                            className="card w-96 bg-base-100 shadow-xl my-16"
                            key={car.id}
                        >
                            <figure className="w-full h-56">
                                <img src={car.image} alt="Car" />
                            </figure>
                            <div className="card-body">
                                <div className="flex flex-col gap-y-2 my-4">
                                    <h2 className="card-title text-2xl">
                                        {car.manufacturer} {car.model}
                                    </h2>
                                    <div className="flex gap-x-5">
                                        <span
                                            className={
                                                car.availability
                                                    ? "badge badge-success text-white font-semibold py-3 px-5"
                                                    : "badge badge-error text-white font-semibold py-3 px-5"
                                            }
                                        >
                                            {car.availability
                                                ? "Available"
                                                : "Unavailable"}
                                        </span>

                                        {car.user.role === "VehicleOwner" && (
                                            <span className="badge badge-warning text-white font-semibold py-3 px-5">
                                                Third party
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="card-actions justify-end">
                                    <Link
                                        to={`/cars/${car.id}`}
                                        className="btn btn-primary text-white"
                                    >
                                        More Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CarsPage;
