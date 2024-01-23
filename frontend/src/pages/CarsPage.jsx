import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MdAddCircle } from "react-icons/md";

const CarsPage = () => {
    const [data, setData] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        axios
            .get("https://localhost:7056/api/Cars", {
                withCredentials: true,
                //headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => setData(res.data))
            .catch((error) => console.log("Error fetching car data: ", error));
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

            <div className="grid grid-cols-3 justify-items-center">
                {data.map((car) => (
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
        </div>
    );
};

export default CarsPage;
