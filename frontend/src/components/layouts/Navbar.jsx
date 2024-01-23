import { IoMenuSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
    const { user, dispatch } = useAuth();

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (
        <nav className="flex items-center justify-between px-10 py-4 bg-blue-500 text-white">
            <div>
                <h1 className="font-bold text-2xl">CRS</h1>
            </div>
            <ul className="flex gap-x-12 text-lg font-semibold">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/cars">Cars</Link>
                </li>
                <li>
                    <Link to="/booking">Booking</Link>
                </li>
                {user ? (
                    <li>
                        <button to="/logout" onClick={logoutHandler}>
                            Logout
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
            </ul>
            <div className="block lg:hidden">
                <IoMenuSharp className="text-3xl" />
            </div>
        </nav>
    );
};

export default Navbar;
