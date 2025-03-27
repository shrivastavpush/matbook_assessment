import React from 'react'

const Input = ({ label, value, setValue, type = "text", placeholder = "Type here..." }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full px-4 py-2 bg-white border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
            />
        </div>
    )
}

export default Input