import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl">Welcome, {user?.email}!</h2>
            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
