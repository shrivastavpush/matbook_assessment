import { FaUserCircle, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className={`fixed top-0 left-0 h-full w-64 bg-gray-300 shadow-lg p-6 transform transition-transform duration-300 z-10 ${isOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
            <button
                onClick={toggleSidebar}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer">
                <FaTimes />
            </button>

            <div className="flex flex-col items-center mt-10">
                <FaUserCircle className="text-5xl text-gray-700" />
                <h3 className="text-lg font-semibold mt-2">{user?.email || "User"}</h3>
            </div>

            <div className="mt-6 space-y-4">
                <Button
                    label="Logout"
                    className="bg-red-500 w-full flex items-center justify-center gap-2 cursor-pointer"
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
};

export default Sidebar;
