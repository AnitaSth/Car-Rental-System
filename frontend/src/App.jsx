import Showcase from "./components/Showcase";
import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;
