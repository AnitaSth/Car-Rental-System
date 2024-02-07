import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useAuth } from "../hooks/useAuth";
import carService from "../services/carService";

const CarDetailsPage = () => {
    const [car, setCar] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);

    const { user } = useAuth();

    const { id: carId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        carService
            .getSingleCar(carId)
            .then((res) => {
                setCar(res.data);
                setIsLoading(false);
                setFeedbacks(res.data.feedbacks);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [carId]);

    const rentHandler = () => {
        if (!user) {
            navigate(`/login?redirect=/cars/${carId}`, { replace: false });
        } else {
            navigate(`/cars/${carId}/rent`);
        }
    };

    return (
        <div>
            <div className="container mx-auto max-w-[1100px] my-20">
                {isLoading && <Loader />}
                {error ? (
                    <ErrorMessage>{error}</ErrorMessage>
                ) : (
                    <>
                        <div className="flex gap-x-12">
                            <img src={car.image} className="w-[600px] h-full" />
                            <div>
                                <div className="flex flex-col gap-y-2">
                                    <h1 className="text-4xl font-bold">
                                        {car.manufacturer} {car.model}
                                    </h1>
                                    <p
                                        className={
                                            car.availability
                                                ? "badge badge-success text-white font-semibold py-3 px-5"
                                                : "badge badge-error text-white font-semibold py-3 px-5"
                                        }
                                    >
                                        {car.availability
                                            ? "Available"
                                            : "Unavailable"}
                                    </p>
                                </div>

                                <ul className="mt-5 text-lg font-semibold flex flex-col gap-y-2">
                                    {user && user.role === "Admin" && (
                                        <li>
                                            License Plate No:{" "}
                                            <span className="font-bold">
                                                {car.licensePlate}
                                            </span>
                                        </li>
                                    )}

                                    <li>
                                        Color:{" "}
                                        <span className="font-bold">
                                            {car.color}
                                        </span>
                                    </li>
                                    <li>
                                        Fuel Type:{" "}
                                        <span className="font-bold">
                                            {car.fuelType}
                                        </span>
                                    </li>
                                    <li>
                                        Transmission Type:{" "}
                                        <span className="font-bold">
                                            {car.transmissionType}
                                        </span>
                                    </li>
                                    <li>
                                        Mileage:{" "}
                                        <span className="font-bold">
                                            {car.mileage}
                                        </span>{" "}
                                        {car.fuelType == "Electric"
                                            ? "km / single charge"
                                            : "km / litre"}
                                    </li>
                                    <li>
                                        Number of passenger seat:{" "}
                                        <span className="font-bold">
                                            {car.passengerSeat}
                                        </span>
                                    </li>
                                    <li>
                                        Rental Price:{" "}
                                        <span className="font-bold">
                                            {car.rentalPrice}
                                        </span>{" "}
                                        / day
                                    </li>
                                    <li>
                                        Condition:{" "}
                                        <span className="font-bold">
                                            {car.condition}
                                        </span>
                                    </li>
                                </ul>
                                <button
                                    disabled={!car.availability}
                                    className={`text-white px-9 py-2 rounded-lg font-bold mt-5 ${
                                        car.availability
                                            ? "bg-red-500 cursor-pointer"
                                            : "bg-red-300"
                                    }`}
                                    onClick={rentHandler}
                                >
                                    Rent
                                </button>
                            </div>
                        </div>
                        {feedbacks.length > 0 && (
                            <div className="bg-white p-3 mt-8">
                                <h1 className="text-center font-bold text-xl mb-10">
                                    Feedbacks
                                </h1>
                                <div className="flex my-5 ml-2 gap-x-5 flex-wrap">
                                    {feedbacks.map((feedback) => (
                                        <div
                                            key={feedback.id}
                                            className="bg-gray-200 rounded-md w-60 p-3 flex flex-col gap-y-3"
                                        >
                                            <p>Rating: {feedback.rating}</p>
                                            <p>
                                                Description:{" "}
                                                {feedback.description}
                                            </p>
                                            <p>
                                                By:{" "}
                                                {feedback.user
                                                    ? feedback.user.fullName
                                                    : "Unknown"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CarDetailsPage;
