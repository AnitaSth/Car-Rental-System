import { useState, useEffect } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLogout } from "../../hooks/useLogout";
import { IoIosNotifications } from "react-icons/io";
import notificationService from "../../services/notificationService";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user } = useAuth();
    const { logout } = useLogout();

    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            notificationService.getAllNotifications(user.token).then((res) => {
                setNotifications(res.data);
            });
        } else {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        let count = 0;
        for (let x of notifications) {
            if (!x.isSeen) {
                count += 1;
            }
        }

        setNotificationCount(count);
    }, [notifications]);

    return (
        <nav className="flex items-center justify-between px-10 py-4 bg-blue-500 text-white">
            <div>
                <h1 className="font-bold text-2xl">CRS</h1>
            </div>
            <ul className="flex gap-x-12 text-lg font-semibold items-center">
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
                    <li className="indicator">
                        {notificationCount > 0 && (
                            <div className="indicator-item badge badge-secondary">
                                {notificationCount}
                            </div>
                        )}

                        <div className="dropdown">
                            <div tabIndex={0} role="button">
                                <IoIosNotifications />
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-black"
                                >
                                    {notifications.map((x) => (
                                        <li key={x.id}>
                                            <button
                                                to="/admin"
                                                className="p-2 hover:bg-gray-200 rounded-md"
                                                onClick={async () => {
                                                    await notificationService.updateNofication(
                                                        x.id,
                                                        user.token
                                                    );
                                                    navigate("/admin");
                                                }}
                                            >
                                                {x.title} - {x.user.fullName}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
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
