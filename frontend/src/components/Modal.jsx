import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import carService from "../services/carService";
import ErrorMessage from "./ErrorMessage";

const Modal = ({ edit, carId, setCars }) => {
    const fuelTypes = ["Petrol", "Diesel", "Electric"];
    const transmissionTypes = ["Automatic", "Manual"];
    const conditions = ["Excellent", "Good", "Average", "Bad"];

    const [manufacturer, setManuFacturer] = useState("");
    const [model, setModel] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [color, setColor] = useState("");
    const [fuelType, setFuelType] = useState("Petrol");
    const [transmissionType, setTransmissionType] = useState("Manual");
    const [mileage, setMileage] = useState(0);
    const [passengerSeat, setPassengerSeat] = useState(0);
    const [condition, setCondition] = useState("Excellent");
    const [image, setImage] = useState("");
    const [rentalPrice, setRentalPrice] = useState(0);

    const [error, setError] = useState("");

    const { user } = useAuth();

    useEffect(() => {
        if (edit) {
            if (carId) {
                async function getCar(carId) {
                    const { data } = await carService.getSingleCar(carId);
                    if (data) {
                        setManuFacturer(data.manufacturer);
                        setModel(data.model);
                        setLicensePlate(data.licensePlate);
                        setColor(data.color);
                        setFuelType(data.fuelType);
                        setTransmissionType(data.transmissionType);
                        setMileage(data.mileage);
                        setPassengerSeat(data.passengerSeat);
                        setCondition(data.condition);
                        setImage(data.image);
                        setRentalPrice(data.rentalPrice);
                    }
                }
                getCar(carId);
            }
        } else {
            clearInput();
        }
    }, [edit, carId]);

    const clearInput = () => {
        setError("");
        setManuFacturer("");
        setModel("");
        setLicensePlate("");
        setColor("");
        setFuelType("Petrol");
        setTransmissionType("Manual");
        setMileage(0);
        setPassengerSeat(0);
        setCondition("Excellent");
        setImage("");
        setRentalPrice(0);
    };

    const addCarHandler = async (e) => {
        e.preventDefault();

        const newCar = {
            manufacturer,
            model,
            licensePlate,
            color,
            fuelType,
            transmissionType,
            mileage,
            passengerSeat,
            condition,
            image,
            rentalPrice,
            userId: user.id,
        };

        try {
            const response = await carService.addCar(newCar, user.token);
            if (response.data) {
                const { data: updatedCars } = await carService.getAllCars();

                if (updatedCars) {
                    setCars(updatedCars);
                }

                document.getElementById("car_modal").close();
                clearInput();
            }
        } catch (error) {
            setError("An error occurred");
        }
    };

    const updateCarHandler = async (e) => {
        e.preventDefault();

        const car = {
            manufacturer,
            model,
            licensePlate,
            color,
            fuelType,
            transmissionType,
            mileage,
            passengerSeat,
            condition,
            image,
            rentalPrice,
            userId: user.id,
        };

        try {
            const response = await carService.updateCar(carId, car, user.token);
            if (response.data) {
                const { data: updatedCars } = await carService.getAllCars();

                if (updatedCars) {
                    setCars(updatedCars);
                }

                document.getElementById("car_modal").close();
                clearInput();
            }
        } catch (error) {
            setError("An error occurred");
        }
    };

    return (
        <dialog id="car_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>

                <div className="p-3">
                    <h3 className="font-bold text-2xl mb-7 uppercase text-center">
                        {edit ? "Update" : "Add"} Car
                    </h3>
                    <form onSubmit={edit ? updateCarHandler : addCarHandler}>
                        <div className="grid grid-cols-2 gap-x-10 gap-y-5 mb-7">
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="manufacturer">
                                    Manufacturer
                                </label>
                                <input
                                    id="manufacturer"
                                    type="text"
                                    className="input input-bordered w-full max-w-xs"
                                    value={manufacturer}
                                    onChange={(e) =>
                                        setManuFacturer(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="model">Model</label>
                                <input
                                    id="model"
                                    type="text"
                                    className="input input-bordered w-full max-w-xs"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="licensePlate">
                                    License Plate
                                </label>
                                <input
                                    id="licensePlate"
                                    type="text"
                                    className="input input-bordered w-full max-w-xs"
                                    value={licensePlate}
                                    onChange={(e) =>
                                        setLicensePlate(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="color">Color</label>
                                <input
                                    id="color"
                                    type="text"
                                    className="input input-bordered w-full max-w-xs"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="fuelType">Fuel Type</label>
                                <select
                                    className="select w-full max-w-xs"
                                    id="fuelType"
                                    value={fuelType}
                                    onChange={(e) =>
                                        setFuelType(e.target.value)
                                    }
                                >
                                    {fuelTypes.map((item) => (
                                        <option key={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="transmissionType">
                                    Transmission Type
                                </label>
                                <select
                                    className="select w-full max-w-xs"
                                    id="transmissionType"
                                    value={transmissionType}
                                    onChange={(e) =>
                                        setTransmissionType(e.target.value)
                                    }
                                >
                                    {transmissionTypes.map((item) => (
                                        <option key={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="mileage">Mileage</label>
                                <input
                                    id="mileage"
                                    type="number"
                                    className="input input-bordered w-full max-w-xs"
                                    value={mileage}
                                    onChange={(e) => setMileage(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="passengerSeat">
                                    Passenger Seat
                                </label>
                                <input
                                    id="passengerSeat"
                                    type="number"
                                    className="input input-bordered w-full max-w-xs"
                                    value={passengerSeat}
                                    onChange={(e) =>
                                        setPassengerSeat(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="condition">Condition</label>
                                <select
                                    className="select w-full max-w-xs"
                                    id="condition"
                                    value={condition}
                                    onChange={(e) =>
                                        setCondition(e.target.value)
                                    }
                                >
                                    {conditions.map((item) => (
                                        <option key={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="image">Image</label>
                                <input
                                    id="image"
                                    type="text"
                                    className="input input-bordered w-full max-w-xs"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="rentalPrice">
                                    Rental Price
                                </label>
                                <input
                                    id="rentalPrice"
                                    type="number"
                                    className="input input-bordered w-full max-w-xs"
                                    value={rentalPrice}
                                    onChange={(e) =>
                                        setRentalPrice(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        <button
                            type="submit"
                            className="btn btn-outline btn-primary btn-block"
                        >
                            {edit ? "Update" : "Add"}
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default Modal;
