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
        <div className="relative w-full max-w-sm">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search By Workflow Name/ID"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
    );
};

export default SearchBar;
