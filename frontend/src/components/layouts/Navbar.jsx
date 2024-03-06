import { IoMenuSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuth();
  const { logout } = useLogout();

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
                {user && (
                    <li>
                        <Link to="/rentals">Rentals</Link>
                    </li>
                )}
                {user && (
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                )}

                {user?.role === "Admin" && (
                    <li>
                        <Link to="/admin">Admin</Link>
                    </li>
                )}
                {user ? (
                    <li>
                        <button to="/logout" onClick={logout}>
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
