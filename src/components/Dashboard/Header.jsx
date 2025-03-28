import React, { useState } from "react";
import Sidebar from "./SideBar";
import HamburgerDefault from "../../assets/hamburger-default.svg";
import HamburgerActive from "../../assets/hamburger-active.svg";

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <>
            <header className="flex items-center p-4">
                <button
                    onClick={toggleSidebar}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onKeyDown={(e) => e.key === "Enter" && toggleSidebar()}
                    className="cursor-pointer focus:outline-none"
                    aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                >
                    <img
                        src={isHovered ? HamburgerActive : HamburgerDefault}
                        alt="hamburger menu"
                        className="w-8 h-8"
                    />
                </button>

                <h1 className="text-2xl font-bold ml-6">Workflow Builder</h1>
            </header>

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </>
    );
};

export default Header;
