const Footer = () => {
    let currentDate = new Date();

    return (
        <footer className="py-5 bg-blue-500 text-white">
            <p className="text-center font-bold">
                CRS &copy; {currentDate.getFullYear()}
            </p>
        </footer>
    );
};

export default Footer;
