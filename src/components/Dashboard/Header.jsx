import React, { useState } from "react";
import Sidebar from "./SideBar";
import HamburgerDefault from '../../assets/hamburger-default.svg'
import HamburgerActive from '../../assets/hamburger-active.svg'

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <div className="flex items-center p-4">

                <img
                    src={isHovered ? HamburgerActive : HamburgerDefault}
                    alt="hamburger"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="cursor-pointer" />

                <h1 className="text-2xl font-bold ml-6">Workflow Builder</h1>
            </div>

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />
        </>
    );
};

export default Header;
