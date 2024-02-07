import React, { useState } from "react";
import feedbackService from "../services/feedbackService";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const RentalModal = ({ carId, rentalId, car }) => {
    const ratings = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");

    const { user } = useAuth();

    const submitHandler = async (e) => {
        e.preventDefault();
        const newFeedback = {
            rating,
            description,
            userId: user.id,
            carId,
        };

        const response = await feedbackService.addFeedback(
            newFeedback,
            user.token
        );

        if (response.data) {
            toast("Feedback sent", {
                type: "success",
                autoClose: 2000,
            });
            setRating(0);
            setDescription("");
        } else {
            toast("Error occurred", {
                type: "error",
                autoClose: 2000,
            });
            setRating(0);
            setDescription("");
        }
    };
    return (
        <>
            <dialog id={`feedback-${rentalId}`} className="modal">
                <div className="modal-box">
                    <form
                        method="dialog"
                        onSubmit={() => {
                            setRating(0);
                            setDescription("");
                        }}
                    >
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <form onSubmit={submitHandler}>
                        <h1 className="text-xl font-bold my-2 mb-5">
                            {car.manufacturer} {car.model}
                        </h1>
                        <div className="flex flex-col gap-y-2 my-2">
                            <label htmlFor="rating">Rating</label>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            >
                                {ratings.map((rating) => (
                                    <option key={rating}>{rating}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-y-2 my-2">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                className="textarea textarea-bordered"
                                placeholder="Bio"
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block my-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default RentalModal;
