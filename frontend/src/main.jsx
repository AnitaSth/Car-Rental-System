import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CarsPage from "./pages/CarsPage.jsx";
import CarDetailsPage from "./pages/CarDetailsPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                index: true,
                element: <HomePage />,
            },
            {
                path: "/cars",
                element: <CarsPage />,
            },
            {
                path: "/cars/:id",
                element: <CarDetailsPage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
