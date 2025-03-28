import React from "react";

const AddWorkflowButton = ({ onClick }) => {
    return (
        <button
            className="bg-[#221F20] text-white text-sm px-4 py-2 rounded-lg shadow-md hover:bg-[#221F20]/80 focus:ring-2 focus:ring-gray-500/50 transition-all cursor-pointer"
            onClick={onClick}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
            aria-label="Create a new workflow process"
        >
            + Create New Process
        </button>
    );
};

export default AddWorkflowButton;
