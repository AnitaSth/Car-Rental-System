import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";
import { useAuth } from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useLogout } from "./hooks/useLogout";

function App() {
    const { user } = useAuth();
    const { logout } = useLogout();
    const navigate = useNavigate();

    const token = user ? user.token : "";

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            let timerRef = null;

            const decoded = jwtDecode(token);

            const expiryTime = new Date(decoded.exp * 1000).getTime();
            const currentTime = new Date().getTime();

            const timeout = expiryTime - currentTime;

            const onExpire = () => {
                logout();
            };

            if (timeout > 0) {
                timerRef = setTimeout(onExpire, timeout);
            } else {
                onExpire();
            }

            return () => {
                clearTimeout(timerRef);
            };
        }
    }, [user, navigate, token]);

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
