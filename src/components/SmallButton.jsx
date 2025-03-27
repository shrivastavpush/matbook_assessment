import React from 'react'

const SmallButton = ({ label, onClick }) => {
    return (
        <button
            className=" bg-white text-[#221F20] px-3 py-1 rounded-md border border-gray-300 cursor-pointer"
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default SmallButton