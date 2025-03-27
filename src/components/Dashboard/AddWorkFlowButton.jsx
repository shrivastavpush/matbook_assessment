import React from "react";

const AddWorkflowButton = ({ onClick }) => {
  return (
    <button
      className="bg-[#221F20] text-white text-[12px] px-3 py-1.5 rounded-lg shadow-md hover:bg-[#221F20]/80 transition-all cursor-pointer"
      onClick={onClick}
    > + Create New Process
    </button>
  );
};

export default AddWorkflowButton;
