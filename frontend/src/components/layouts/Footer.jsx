import { MdEmail } from "react-icons/md";
import khaltiLogo from "../../assets/khalti.png";
import {
    FaCcMastercard,
    FaCcVisa,
    FaFacebook,
    FaInstagram,
} from "react-icons/fa";

const Footer = () => {
    let currentDate = new Date();

    return (
        <footer className="py-5 bg-blue-500 text-white px-36">
            <div className=" flex justify-between  items-center">
                <div className="flex flex-col gap-y-1">
                    <h3 className="font-bold text-lg">CRS</h3>
                    <ul>
                        <li>About CRS</li>
                        <li>Privacy Policy</li>
                        <li>Code of Conduct</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-y-1">
                    <h3 className="font-bold text-lg">Customer Care</h3>
                    <ul>
                        <li>Help Center</li>
                        <li>How to Rent</li>
                        <li>Contact Us</li>
                        <li>Terms & Condition</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-2">
                        <h3 className="font-bold">Follow Us</h3>
                        <ul className="text-2xl flex gap-x-3 items-center">
                            <li>
                                <FaInstagram />
                            </li>
                            <li>
                                <FaFacebook />
                            </li>
                            <li>
                                <MdEmail />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h3 className="font-bold">Payment Methods</h3>
                    <ul className="text-3xl flex gap-x-3 items-center">
                        <li>
                            <img
                                src={khaltiLogo}
                                alt="Khalti Logo"
                                className="w-12"
                            />
                        </li>
                    </ul>
                </div>
            </div>

            <p className="text-center font-bold mt-4">
                CRS &copy; {currentDate.getFullYear()}
            </p>
        </footer>
    );
};

export default Footer;
