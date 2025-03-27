import React from 'react'

const Button = ({ label, className, ...props }) => {
    return (
        <button className={`w-full bg-red-500 text-white py-4 rounded-lg font-semibold hover:bg-red-600 transition ${className}`} {...props}>
            {label}
        </button>
    )
}

export default Button