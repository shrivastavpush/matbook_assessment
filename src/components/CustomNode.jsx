import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { IoTrashOutline } from "react-icons/io5";

const CustomNode = ({ data, id }) => {
    const [label, setLabel] = useState(data.label);
    const [isEditing, setIsEditing] = useState(false);

    const handleDoubleClick = () => {
        if (id === '1' || id === '2') return;
        setIsEditing(true);
    };

    const handleBlur = () => setIsEditing(false);
    const handleChange = (e) => setLabel(e.target.value);

    // Determine if node is Start or End
    const isStart = id === '1';
    const isEnd = id === '2';
    const isSpecialNode = isStart || isEnd;

    return (
        <div className={`
            ${isSpecialNode
                ? `w-[80px] h-[80px] rounded-full flex items-center justify-center border-6
                ${isStart ? 'border-[#849E4C]' : 'border-[#EE3425]'} text-white`
                : 'bg-[#F7FAEF] border border-[#849E4C] rounded-lg px-6 py-3 min-w-[200px]'
            }
            relative
        `}>
            <Handle
                type="target"
                position={Position.Top}
                className="!bg-[#849E4C] !w-2 !h-2"
            />

            <div className={`flex ${isSpecialNode ? 'justify-center' : 'justify-between '} items-center w-full`}>
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
                    <div className={`flex items-center w-full ${isSpecialNode ? `rounded-full justify-center !w-[60px] !h-[60px] ${isStart ? 'bg-[#849E4C]' : 'bg-[#EE3425]'}` : 'justify-between'}`}>
                        <p
                            onDoubleClick={handleDoubleClick}
                            className={`text-sm font-medium
                                ${isSpecialNode ? 'cursor-default' : 'cursor-pointer'}
                            `}
                        >
                            {label}
                        </p>
                        {!isSpecialNode && (
                            <button className="text-[#EE3425] ml-4">
                                <IoTrashOutline size={18} />
                            </button>
                        )}
                    </div>
                )}
            </div>

            <Handle
                type="source"
                position={isSpecialNode ? isStart ? Position.Bottom : isEnd ? Position.Top : Position.Bottom : Position.Bottom}
            />
        </div>
    );
};

export default CustomNode;