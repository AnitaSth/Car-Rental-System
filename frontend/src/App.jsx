import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";
import { useAuth } from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);

    return (
        <>
            <Navbar />
            <main>
                <Outlet />
                <ToastContainer />
            </main>
            <Footer />
        </>
    );
}

export default App;
