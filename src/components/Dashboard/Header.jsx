import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./SideBar";

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <div className="flex items-center p-4">
                <button
                    className={`flex items-center justify-center w-10 h-10 border rounded-lg shadow cursor-pointer ${isSidebarOpen ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
                        }`}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <FaBars className={`${isSidebarOpen ? "text-red-500" : "text-gray-300"} text-xl`} />
                </button>
                <h1 className="text-2xl font-bold ml-6">Workflow Builder</h1>
            </div>

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />
        </>
    );
};

export default Header;
