import React from "react";
import { FaTimes } from "react-icons/fa";
import SmallButton from "../SmallButton";

const WarningModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm z-50 ">
            <div className="bg-white w-max rounded-lg shadow-lg relative ">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                    <FaTimes size={18} />
                </button>

                <div className=" text-center p-20">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {message}
                    </h2>
                    <p className="text-red-500 font-medium mt-1">
                        You Cannot Undo This Step
                    </p>
                </div>

                <div className="border-t border-gray-200 shadow-sm"></div>

                <div className="flex justify-end space-x-4 p-4">
                    <SmallButton label="Yes" onClick={onConfirm} />
                    <SmallButton label="No" onClick={onClose} />
                </div>
            </div>
        </div>
    );
};

export default WarningModal;
