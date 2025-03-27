import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Auth/Input";
import AuthLayout from "../components/Layouts/AuthLayout";
import SocialContainer from "../components/Auth/SocialContainer";
import Button from "../components/Button";

const Signup = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const { signup } = useAuth();
    const navigate = useNavigate();

    // Form Validation
    const validateForm = () => {
        let newErrors = {};
        if (!user.email) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) newErrors.email = "Invalid email format";

        if (!user.password) newErrors.password = "Password is required";
        else if (user.password.length < 6) newErrors.password = "Password must be at least 6 characters long";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Signup
    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) return;

        try {
            await signup(user.email, user.password);
            navigate("/dashboard");
        } catch (error) {
            setError("Signup failed. Try again later.", error);
        }
    };

    return (
        <AuthLayout>
            <div className="bg-gray-50 shadow-lg rounded-lg p-8 w-full max-w-md">
                <div className="flex flex-col items-start mb-6">
                    <p className="text-black text-[14px]">Join Us Today!</p>
                    <p className="text-[26px] font-semibold">Create Your Account</p>
                </div>

                {/* Global Error Message */}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSignup}>

                    {/* Email Input */}
                    <Input
                        label="Email"
                        value={user.email}
                        setValue={(val) => setUser({ ...user, email: val })}
                        type="email"
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

                    {/* Password Input */}
                    <Input
                        label="Password"
                        value={user.password}
                        setValue={(val) => setUser({ ...user, password: val })}
                        type="password"
                        placeholder="Create a strong password"
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

                    <div className="flex justify-between items-center mb-6">
                        <label className="flex items-center text-gray-600 text-sm cursor-pointer">
                            <input type="checkbox" className="mr-2 accent-red-500" /> I agree to the Terms & Conditions
                        </label>
                    </div>

                    <Button type="submit" className="cursor-pointer" label="Sign Up" />
                </form>

                <div className="my-6 flex items-center justify-center">
                    <span className="border-t w-1/3 border-gray-300"></span>
                    <span className="px-3 text-black text-sm font-bold">Or</span>
                    <span className="border-t w-1/3 border-gray-300"></span>
                </div>

                {/* Social Signup Options */}
                <SocialContainer type="signup" />

                <p className="text-center mt-6 text-gray-900 text-sm">
                    Already have an account? <Link to="/login" className="font-semibold underline hover:text-gray-600">LOG IN</Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Signup;
