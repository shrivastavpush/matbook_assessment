import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/Layouts/DashboardLayout";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <DashboardLayout>
            <div className="p-6 container mx-auto">
                <h2 className="text-2xl">Welcome, {user?.email}!</h2>
                <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer">
                    Logout
                </button>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
