import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Showcase = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("https://localhost:7056/api/Cars", { withCredentials: true })
            .then((res) => setData(res.data));
    }, []);

    console.log(data);

    return (
        <div className="container mx-auto max-w-7xl my-10">
            <div className="grid grid-cols-3 justify-items-center">
                {data.map((car) => (
                    <div
                        className="card w-96 bg-base-100 shadow-xl my-16"
                        key={car.id}
                    >
                        <figure className="w-full h-56">
                            <img src={car.images} alt="Car" />
                        </figure>
                        <div className="card-body">
                            <div className="flex flex-col gap-y-2 my-4">
                                <h2 className="card-title text-2xl">
                                    {car.manufacturer} {car.model}
                                </h2>
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

export default Showcase;
