import React from 'react';
import Logo from '../../assets/logo_highbridge.svg';
import Background from '../../assets/bg-img.png';

const AuthLayout = ({ children }) => {
    return (
        <div
            className="flex min-h-screen bg-cover bg-center relative flex-col md:flex-row"
            style={{ backgroundImage: `url(${Background})` }}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            <div className="relative hidden md:flex w-1/2 text-white flex-col justify-center items-start pl-52">
                <img src={Logo} alt="HighBridge" />

                <div className="mt-28 flex flex-col gap-4 w-3/4">
                    <h2 className="text-4xl font-bold">Building the Future...</h2>
                    <p className="text-lg text-gray-300">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>

            <div className="relative flex w-full md:w-1/2 justify-center items-center p-6 sm:p-10">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
