import { useEffect, useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";

const SaveWorkflowModal = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState({ name: "", description: "" });

    const modalRef = useRef(null);
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            nameInputRef.current?.focus();
        }
    }, [isOpen]);

    const handleSave = () => {
        let errors = {};
        if (!name.trim() || name.length < 3) {
            errors.name = "Workflow name is required and must be at least 3 characters!";
        }
        if (!description.trim()) {
            errors.description = "Workflow description is required!";
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        onSave({ name, description });

        setName("");
        setDescription("");
        setError({ name: "", description: "" });
        onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
        if (e.key === "Enter") {
            handleSave();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm z-50"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            aria-modal="true"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
        >
            <div className="bg-white w-[600px] rounded-lg shadow-lg relative outline-none py-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 mx-6">
                    <h2 id="modal-title" className="text-lg font-semibold">
                        Save your workflow
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer focus:ring focus:ring-gray-300"
                        aria-label="Close Modal"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Name Input */}
                <div className="mb-4 mx-10">
                    <label htmlFor="workflow-name" className="block text-gray-600 text-sm mb-2">
                        Name
                    </label>
                    <input
                        id="workflow-name"
                        type="text"
                        className="w-3/4 px-4 py-1 bg-white border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        placeholder="Enter workflow name"
                        value={name}
                        ref={nameInputRef}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={!!error.name}
                        aria-describedby={error.name ? "error-name" : undefined}
                    />
                    {error.name && (
                        <p id="error-name" className="text-red-500 text-sm mt-1">
                            {error.name}
                        </p>
                    )}
                </div>

                {/* Description Input */}
                <div className="mb-4 mx-10">
                    <label htmlFor="workflow-description" className="block text-gray-600 text-sm mb-2">
                        Description
                    </label>
                    <textarea
                        id="workflow-description"
                        className="w-full px-4 py-1 bg-white border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        placeholder="Enter workflow description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        aria-invalid={!!error.description}
                        aria-describedby={error.description ? "error-description" : undefined}
                    />
                    {error.description && (
                        <p id="error-description" className="text-red-500 text-sm mt-1">
                            {error.description}
                        </p>
                    )}
                </div>

                <div className="border-t border-gray-200 shadow-sm"></div>

                {/* Buttons */}
                <div className="flex justify-end items-center pt-6 px-6">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                        onClick={handleSave}
                        aria-label="Save workflow"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveWorkflowModal;
