import AdminCars from "../components/AdminCars";
import AdminRentals from "../components/AdminRentals";
import AdminUsers from "../components/AdminUsers";

const AdminPage = () => {
    return (
        <div className="container mx-auto max-w-5xl my-14 flex flex-col gap-y-36">
            <AdminRentals />
            <AdminCars />
            <AdminUsers />
        </div>
    );
};

export default AdminPage;
