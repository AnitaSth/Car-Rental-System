import AdminCars from "../components/AdminCars";
import AdminPayments from "../components/AdminPayments";
import AdminRentals from "../components/AdminRentals";
import AdminUsers from "../components/AdminUsers";

const AdminPage = () => {
    return (
        <div className="container mx-auto max-w-5xl my-14 flex flex-col gap-y-36">
            <AdminCars />
            <AdminRentals />
            <AdminPayments />
            <AdminUsers />
        </div>
    );
};

export default AdminPage;
