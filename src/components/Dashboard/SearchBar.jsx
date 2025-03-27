import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="relative w-full max-w-[340px]">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search By Workflow Name/ID"
                className="w-full border bg-white border-gray-300/50 rounded-lg pl-4 py-1 text-gray-700 focus:outline-none focus:border-[#88CAD1]/50"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500/50" />
        </div>
    );
};

export default SearchBar;
