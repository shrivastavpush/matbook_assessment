import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const clearSearch = () => {
        setSearchTerm("");
        onSearch("");
    };

    return (
        <div className="relative w-full max-w-[340px]">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by Workflow Name/ID"
                aria-label="Search Workflows"
                className="w-full border bg-white border-gray-300 rounded-lg pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#88CAD1]"
                onKeyDown={(e) => e.key === "Enter" && onSearch(searchTerm)}
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            {searchTerm && (
                <button
                    onClick={clearSearch}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Clear search"
                >
                    <FaTimes />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
