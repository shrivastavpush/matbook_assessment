import React from "react";

const AddWorkflowButton = ({ onClick }) => {
  return (
    <button
      className="bg-black text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-800 transition-all cursor-pointer"
      onClick={onClick}
    >
      + Create New Process
    </button>
  );
};

export default AddWorkflowButton;
