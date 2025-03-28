import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { IoTrashOutline } from "react-icons/io5";

const CustomNode = ({ data, id }) => {
    const [label, setLabel] = useState(data.label);
    const [isEditing, setIsEditing] = useState(false);

    const handleDoubleClick = () => {
        // Prevent editing Start and End nodes
        if (id === '1' || id === '2') return;
        setIsEditing(true);
    };

    const handleBlur = () => setIsEditing(false);
    const handleChange = (e) => setLabel(e.target.value);

    return (
        <div className={`
            rounded-lg shadow-md px-4 py-2 min-w-[150px]
            ${id === '1' ? 'bg-green-500 text-white' :
                id === '2' ? 'bg-red-500 text-white' :
                    'bg-white text-gray-800'}
        `}>
            <Handle
                type="target"
                position={Position.Top}
                className="!bg-gray-400 !w-3 !h-3"
            />

            <div className="flex items-center justify-between">
                {isEditing ? (
                    <input
                        type="text"
                        value={label}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                        className="border p-1 rounded text-sm w-full text-gray-800"
                    />
                ) : (
                    <p
                        onDoubleClick={handleDoubleClick}
                        className={`text-sm cursor-pointer font-medium py-1
                            ${id === '1' || id === '2' ? 'cursor-default' : 'cursor-pointer'}
                        `}
                    >
                        {label}
                    </p>
                )}

                {id !== '1' && id !== '2' && (
                    <div className="ml-2 text-gray-400 hover:text-red-500">
                        <IoTrashOutline size={18} />
                    </div>
                )}
            </div>

            <Handle
                type="source"
                position={Position.Bottom}
                className="!bg-gray-400 !w-3 !h-3"
            />
        </div>
    );
};

export default CustomNode;