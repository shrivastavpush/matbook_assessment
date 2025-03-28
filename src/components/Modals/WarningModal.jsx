import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import SmallButton from "../SmallButton";

const WarningModal = ({ isOpen, onClose, onConfirm, message }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.focus();
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm z-50"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            aria-modal="true"
        >
            <div
                ref={modalRef}
                className="bg-white w-max rounded-lg shadow-lg relative outline-none"
                tabIndex="-1"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer focus:ring focus:ring-gray-300"
                    aria-label="Close Modal"
                >
                    <FaTimes size={18} />
                </button>

                <div className="text-center p-16">
                    <h2 id="modal-title" className="text-sm font-semibold text-gray-900">
                        {message}
                    </h2>
                    <p id="modal-desc" className="text-red-500 font-medium mt-2 text-[12px]">
                        You cannot undo this step.
                    </p>
                </div>

                <div className="border-t border-gray-200 shadow-sm"></div>

                <div className="flex justify-end space-x-4 p-4">
                    <SmallButton label="Yes" onClick={onConfirm} aria-label="Confirm action" />
                    <SmallButton label="No" onClick={onClose} aria-label="Cancel action" />
                </div>
            </div>
        </div>
    );
};

export default WarningModal;
