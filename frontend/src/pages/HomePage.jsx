import heroImg from "../assets/hero-img.jpeg";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${heroImg})`,
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-2xl">
                    <h1 className="mb-5 text-5xl font-bold">
                        Welcome to CRS: Where Your Journey Begins
                    </h1>
                    <p className="mb-5 text-lg font-semibold">
                        CRS makes it easy with multiple pickup and drop-off
                        locations, including airports and city centers. Your
                        journey, your convenience.
                    </p>
                    <Link to="/cars" className="btn btn-primary">
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
