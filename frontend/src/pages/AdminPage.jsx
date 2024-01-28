import AdminCars from "../components/AdminCars";
import AdminRentals from "../components/AdminRentals";

const AdminPage = () => {
    return (
        <div className="container mx-auto max-w-5xl my-14 flex flex-col gap-y-36">
            <AdminRentals />
            <AdminCars />
        </div>
    );
};

export default AdminPage;
