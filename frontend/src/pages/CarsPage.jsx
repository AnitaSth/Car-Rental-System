import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import carService from "../services/carService";

const CarsPage = () => {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const filterTypes = ["All", "Only CRS", "Third Party"];
    const [filterType, setFilterType] = useState(filterTypes[0]);

    useEffect(() => {
        setIsLoading(true);
        if (filterType == filterTypes[1]) {
            carService
                .getCRSCars()
                .then((res) => {
                    setCars(res.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setIsLoading(false);
                });
        } else if (filterType == filterTypes[2]) {
            carService
                .getThirdParty()
                .then((res) => {
                    setCars(res.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setIsLoading(false);
                });
        } else {
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
        }
    }, [filterType]);

    return (
        <div className="container mx-auto max-w-7xl my-5 flex flex-col">
            <select
                className="select select-bordered w-full max-w-xs mt-7 ml-7"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
            >
                {filterTypes.map((type) => (
                    <option>{type}</option>
                ))}
            </select>
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
