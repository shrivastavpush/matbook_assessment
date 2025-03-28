import { FaUserCircle, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { useEffect } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        localStorage.clear();
        navigate("/login");
    };

    // Close sidebar on 'Escape' key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                toggleSidebar();
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, toggleSidebar]);

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/10 backdrop-blur-sm z-10"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg p-6 transform transition-transform duration-300 z-20 
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                aria-label="User Sidebar"
                role="dialog"
            >
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-label="Close Sidebar"
                >
                    <FaTimes size={20} />
                </button>

                <div className="flex flex-col items-center mt-10">
                    <FaUserCircle className="text-5xl text-gray-700" />
                    <h3 className="text-lg font-semibold mt-2">
                        {user?.email || "User"}
                    </h3>
                </div>

                <div className="mt-6 space-y-4">
                    <Button
                        label="Logout"
                        className="bg-red-500 w-full flex items-center justify-center gap-2 cursor-pointer"
                        onClick={handleLogout}
                    />
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
