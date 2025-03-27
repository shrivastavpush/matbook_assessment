import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Auth/Input";
import AuthLayout from "../components/Layouts/AuthLayout";
import SocialContainer from "../components/Auth/SocialContainer";
import Button from "../components/Auth/Button";

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

        if (!validateForm()) return; // Stop submission if validation fails

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (error) {
            setError("Invalid email or password", error);
        }
    };

    return (
        <AuthLayout>
            <div className="bg-gray-50 shadow-lg rounded-lg p-8 w-full max-w-md">
                <div className="flex flex-col items-start mb-6">
                    <p className="text-black text-[14px]">Welcome Back!</p>
                    <p className="text-[26px] font-semibold">Log In to your Account</p>
                </div>

                {/* Display global login error */}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleLogin}>
                    {/* Email Input */}
                    <Input
                        label="Email"
                        value={email}
                        setValue={setEmail}
                        type="email"
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email}</p>}

                    {/* Password Input */}
                    <Input
                        label="Password"
                        value={password}
                        setValue={setPassword}
                        type="password"
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password}</p>}

                    <div className="flex justify-between items-center mb-6">
                        <label className="flex items-center text-gray-600 text-sm cursor-pointer">
                            <input type="checkbox" className="mr-2 accent-red-500" /> Remember me
                        </label>
                        <Link to="/forgot-password" className="text-sm hover:underline">Forgot Password?</Link>
                    </div>

                    <Button type="submit" className="cursor-pointer" label="Log In" />
                </form>

                <div className="my-6 flex items-center justify-center">
                    <span className="border-t w-1/3 border-gray-300"></span>
                    <span className="px-3 text-black text-sm font-bold">Or</span>
                    <span className="border-t w-1/3 border-gray-300"></span>
                </div>

                <SocialContainer />

                <p className="text-center mt-6 text-gray-900 text-sm">
                    New User? <Link to="/signup" className="font-semibold underline hover:text-gray-600">SIGN UP HERE</Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Login;
