import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import RentModal from "../components/RentModal";

const CarDetailsPage = () => {
    const [car, setCar] = useState([]);

    const { id: carId } = useParams();

    useEffect(() => {
        axios
            .get(`https://localhost:7056/api/Cars/${carId}`, {
                withCredentials: true,
            })
            .then((res) => setCar(res.data));
    }, [carId]);

    return (
        <div>
            <div className="container mx-auto max-w-[1100px] my-20">
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
                                {car.availability ? "Available" : "Unavailable"}
                            </p>
                        </div>

                        <ul className="mt-5 text-lg font-semibold flex flex-col gap-y-2">
                            <li>
                                Color:{" "}
                                <span className="font-bold">{car.color}</span>
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
                                <span className="font-bold">{car.mileage}</span>{" "}
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
                            onClick={() =>
                                document
                                    .getElementById("my_modal_1")
                                    .showModal()
                            }
                        >
                            Rent
                        </button>
                        <RentModal car={car} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetailsPage;
