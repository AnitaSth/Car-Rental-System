import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";

const RentModal = ({ car }) => {
    let today = new Date();
    const [rentValue, setRentValue] = useState(new Date());
    const [returnValue, setReturnValue] = useState(new Date());
    const [rentDetails, setRentDetails] = useState(null);
    const [cost, setCost] = useState(car && car.rentalPrice);
    const [rentalDuration, setRentalDuration] = useState(0);

    const rentCar = () => {
        const details = {
            id: car.id,
            manufacturer: car.manufacturer,
            model: car.model,
            licensePlate: car.licensePlate,
            color: car.color,
        };
        console.log(details);
    };

    useEffect(() => {
        const calculateCost = () => {
            let difference = returnValue.getTime() - rentValue.getTime();
            let days = Math.floor(difference / (1000 * 60 * 60 * 24));

            if (days > 1) {
                setCost(days * car.rentalPrice);
            } else {
                setCost(car && car.rentalPrice);
            }

            setRentalDuration(days);
        };
        calculateCost();
    }, [returnValue, rentValue, rentalDuration]);

    function resetDate() {
        setRentValue(today);
        setReturnValue(today);
        setCost(car && car.rentalPrice);
        setRentalDuration(0);
    }

    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box h-full flex justify-between items-start">
                <div className="flex flex-col h-full">
                    <h1 className="text-2xl font-semibold">
                        Car: {car.manufacturer} {car.model}
                    </h1>
                    <div className="flex flex-col gap-y-1 text-lg">
                        <p>
                            Rent Date:{" "}
                            {rentValue
                                .toUTCString()
                                .substring(
                                    0,
                                    rentValue.toUTCString().length - 7
                                )}
                        </p>
                        <p>
                            Return Date:{" "}
                            {returnValue
                                .toUTCString()
                                .substring(
                                    0,
                                    rentValue.toUTCString().length - 7
                                )}
                        </p>
                        <p>
                            Rental Duration:{" "}
                            {rentalDuration < 1 ? 1 : rentalDuration} days
                        </p>
                        <p>Cost: Rs. {cost}</p>
                    </div>

                    <div className="mt-7 flex flex-col gap-y-3">
                        <div>
                            <label htmlFor="rentDate">
                                Select renting date
                            </label>
                            <DateTimePicker
                                onChange={setRentValue}
                                value={rentValue}
                                minDate={today}
                                id="rentDate"
                            />
                        </div>
                        <div>
                            <label htmlFor="returnDate">
                                Select returning date
                            </label>
                            <DateTimePicker
                                onChange={setReturnValue}
                                value={returnValue}
                                minDate={today}
                                id="returnDate"
                            />
                        </div>
                    </div>
                </div>
                <button
                    className="bg-red-500 cursor-pointer text-white px-9 py-2 rounded-lg font-bold"
                    onClick={rentCar}
                >
                    Rent
                </button>
            </div>

            <form
                method="dialog"
                className="modal-backdrop"
                onSubmit={resetDate}
            >
                <button>close</button>
            </form>
        </dialog>
    );
};

export default RentModal;
