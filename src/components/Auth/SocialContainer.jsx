import React from 'react'
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

const socialData = [
    { label: "Google", icon: <FaGoogle className="text-red-500 w-4.5 h-4.5" /> },
    { label: "Facebook", icon: <FaFacebook className="text-blue-500 w-4.5 h-4.5" /> },
    { label: "Apple", icon: <FaApple className="text-black w-4.5 h-4.5" /> }
]

const SocialButton = ({ label, icon, type }) => {
    return (
        <button className="w-full flex items-center justify-start gap-15 py-3 px-10 bg-white border border-gray-300/50 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
            {icon}
            {type === "login" ? `Log In with ${label}` : `Sign Up with ${label}`}
        </button>
    )
}

const SocialContainer = ({ type }) => {
    return (
        <div className="space-y-3" >
            {
                socialData.map((item, index) => (
                    <SocialButton key={index} label={item.label} icon={item.icon} type={type} />
                ))
            }
        </div >
    )
}

export default SocialContainer