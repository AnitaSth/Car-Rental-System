import { useEffect, useState } from "react";
import carService from "../services/carService";
import { useLocation } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import DateTimePicker from "react-datetime-picker";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import rentalService from "../services/rentalService";
import paymentService from "../services/paymentService";

const RentPage = () => {
  const [car, setCar] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let today = new Date();
  const [rentValue, setRentValue] = useState(today);
  const [returnValue, setReturnValue] = useState(today);
  const [cost, setCost] = useState(0);
  const [rentalDuration, setRentalDuration] = useState(1);
  const [disable, setDisable] = useState(false);

  const paymentMethods = ["Cash", "Khalti"];
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  const location = useLocation();
  const carId = location.pathname.split("/")[2];

  const { user } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    carService
      .getSingleCar(carId)
      .then((res) => {
        setCar(res.data);
        setCost(res.data.rentalPrice);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [carId]);

  useEffect(() => {
    const calculateCost = () => {
      let difference = returnValue.getTime() - rentValue.getTime();
      let days = Math.floor(difference / (1000 * 60 * 60 * 24));

      if (days > 1) {
        setCost(days * car.rentalPrice);
      } else {
        setCost(car.rentalPrice);
      }

      setRentalDuration(days);
    };
    calculateCost();
  }, [returnValue, rentValue, rentalDuration]);

  useEffect(() => {
    if (rentValue.getTime() > returnValue.getTime()) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [rentValue, returnValue]);

  const handleRent = async () => {
    if (user) {
      const newRental = {
        userId: user.id,
        carId: carId,
        startDate: rentValue,
        endDate: returnValue,
        duration: rentalDuration < 1 ? 1 : rentalDuration,
        totalCost: cost,
      };

      const rentalResponse = await rentalService.addRental(
        newRental,
        user.token
      );

      const rentalId = rentalResponse.data.id;

      if (paymentMethod == "Cash") {
        const payload = {
          userId: user.id,
          rentalId,
          paymentAmount: cost,
          paymentMethod,
        };

        const paymentResponse = await paymentService.pay(payload, user.token);

        if (paymentResponse.data) {
          toast("The car is rented", { type: "success" });
          navigate("/rentals");
        } else {
          toast("An error occurred", { type: "error" });
        }
      } else {
        const unit_price = car.rentalPrice;
        const name = user.fullName;
        const phone = user.phoneNumber;
        const identity = car.id;
        const productName = `${car.manufacturer} ${car.model}`;
        const purchase_order_id = `${car.id}-${
          user.id
        }-${new Date().getTime()}`;

        const payload = {
          return_url: "http://localhost:5173/rentals",
          website_url: "http://localhost:5173",
          amount: cost,
          purchase_order_id,
          purchase_order_name: productName,
          customer_info: {
            name,
            email: "example@gmail.com",
            phone: "9862990797",
          },
          product_details: [
            {
              identity,
              name: productName,
              total_price: cost,
              quantity: rentalDuration < 1 ? 1 : rentalDuration,
              unit_price,
            },
          ],

          userId: user.id,
          rentalId,
          paymentAmount: cost,
          paymentMethod,
        };

        const paymentResponse = await paymentService.pay(payload, user.token);

        if (paymentResponse.data) {
          window.location.href = `${paymentResponse?.data?.data?.payment_url}`;
        }
      }
    } else {
      navigate(`/login?redirect=/cars/${carId}`, { replace: false });
    }
  };

  return (
    <div>
      <div className="container mx-auto max-w-[1100px] my-7 max-h-screen py-7">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <div className="grid grid-cols-2 justify-between gap-x-10">
            <div>
              <img src={car.image} className="w-96 rounded-md h-56" />
              <div className="mt-5">
                <h1 className="text-3xl font-bold">
                  {car.manufacturer} {car.model}
                </h1>
                <ul className="mt-3 text-lg font-semibold flex flex-col gap-y-2">
                  <li>
                    Color: <span className="font-bold">{car.color}</span>
                  </li>
                  <li>
                    Fuel Type: <span className="font-bold">{car.fuelType}</span>
                  </li>
                  <li>
                    Transmission Type:{" "}
                    <span className="font-bold">{car.transmissionType}</span>
                  </li>
                  <li>
                    Mileage: <span className="font-bold">{car.mileage}</span>{" "}
                    {car.fuelType == "Electric"
                      ? "km / single charge"
                      : "km / litre"}
                  </li>
                  <li>
                    Number of passenger seat:{" "}
                    <span className="font-bold">{car.passengerSeat}</span>
                  </li>
                  <li>
                    Rental Price:{" "}
                    <span className="font-bold">{car.rentalPrice}</span> / day
                  </li>
                  <li>
                    Condition:{" "}
                    <span className="font-bold">{car.condition}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="mt-7 flex flex-col gap-y-3">
                <div className="flex flex-col w-52 gap-y-1">
                  {disable && (
                    <p className="text-red-500">* Fix the renting date</p>
                  )}
                  <label htmlFor="rentDate" className="font-semibold text-lg">
                    Select Renting Date
                  </label>
                  <DateTimePicker
                    onChange={setRentValue}
                    value={rentValue}
                    minDate={today}
                    id="rentDate"
                  />
                </div>
                <div className="flex flex-col w-52 gap-y-1">
                  <label htmlFor="returnDate" className="font-semibold text-lg">
                    Select Returning Date
                  </label>
                  <DateTimePicker
                    onChange={setReturnValue}
                    value={returnValue}
                    minDate={today}
                    id="returnDate"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label
                    htmlFor="paymentMethod"
                    className="font-semibold text-lg"
                  >
                    Select Payment
                  </label>
                  <select
                    className="select w-full max-w-xs select-sm select-bordered"
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    {paymentMethods.map((payment) => (
                      <option key={payment}>{payment}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-y-1 text-lg mt-8">
                <p className="text-lg">
                  <span className="font-semibold mr-3">Rent Date:</span>
                  {rentValue.toDateString()} {rentValue.toLocaleTimeString()}
                </p>
                <p>
                  <span className="font-semibold mr-3">Return Date:</span>
                  {returnValue.toDateString()}{" "}
                  {returnValue.toLocaleTimeString()}
                </p>
                <p>
                  <span className="font-semibold ">Rental Duration: </span>

                  {rentalDuration < 1 ? "1 day" : `${rentalDuration} days`}
                </p>
                <p>
                  <span className="font-semibold">Cost: </span>
                  Rs. {cost}
                </p>
                <p>
                  <span className="font-semibold">Payment Method: </span>
                  {paymentMethod}
                </p>
              </div>
              <button
                disabled={disable}
                className={`${
                  disable ? "bg-gray-500" : "bg-red-500 cursor-pointer"
                }  text-white px-9 py-2 rounded-lg font-bold mt-8`}
                onClick={handleRent}
              >
                Rent
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentPage;
