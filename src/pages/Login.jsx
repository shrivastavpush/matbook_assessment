import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Auth/Input";
import AuthLayout from "../components/Layouts/AuthLayout";
import SocialContainer from "../components/Auth/SocialContainer";
import Button from "../components/Button";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    // Form Validation
    const validateForm = () => {
        let newErrors = {};
        if (!email) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) return;

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (error) {
            setError("Invalid email or password", error);
        }
    };

    return (
        <AuthLayout>
            <div className="bg-gray-50 shadow-lg rounded-lg p-6 md:p-8 w-full max-w-md mx-auto">
                <div className="flex flex-col items-start mb-6">
                    <p className="text-black text-[14px]">Welcome Back!</p>
                    <p className="text-[26px] font-semibold">Log In to Your Account</p>
                </div>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <Input
                            label="Email"
                            value={email}
                            setValue={setEmail}
                            type="email"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Password Input */}
                    <div>
                        <Input
                            label="Password"
                            value={password}
                            setValue={setPassword}
                            type="password"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <label className="flex items-center text-gray-600 text-sm cursor-pointer">
                            <input type="checkbox" className="mr-2 accent-red-500" /> Remember me
                        </label>
                        <Link to="/forgot-password" className="text-sm hover:underline">Forgot Password?</Link>
                    </div>

                    <Button type="submit" className="cursor-pointer w-full" label="Log In" />
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center justify-center">
                    <span className="border-t w-1/3 border-gray-300"></span>
                    <span className="px-3 text-black text-sm font-bold">Or</span>
                    <span className="border-t w-1/3 border-gray-300"></span>
                </div>

                {/* Social Login */}
                <SocialContainer type="login" />

                <p className="text-center mt-6 text-gray-900 text-sm">
                    New User? <Link to="/signup" className="font-semibold underline hover:text-gray-600">SIGN UP FREE</Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Login;
