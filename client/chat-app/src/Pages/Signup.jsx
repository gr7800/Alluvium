import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import side_login from "../images/loginsidebg.gif";
import { toast } from "react-toastify";
import { BaseUrl } from "../Config/Constant";

const SignUp = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ name: "", email: "", password: "", confirmPassword: "" });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        let validationError = {};

        // Name validation
        if (!name) {
            validationError.name = "Name is required";
        }

        // Email validation
        if (!email) {
            validationError.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationError.email = "Email address is invalid";
        }

        // Password validation
        if (!password) {
            validationError.password = "Password is required";
        } else if (password.length < 5) {
            validationError.password = "Password must be at least 5 characters long";
        }

        // Confirm Password validation
        if (!confirmPassword) {
            validationError.confirmPassword = "Confirm Password is required";
        } else if (password !== confirmPassword) {
            validationError.confirmPassword = "Passwords do not match";
        }

        setError(validationError);

        if (Object.keys(validationError).length > 0) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BaseUrl}/api/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Registration Successful");
                localStorage.setItem("userInfo", JSON.stringify(data));
                navigate("/");
            } else {
                toast.error(`Error: ${data.message}`);
            }
            setLoading(false);
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-row min-h-screen bg-white text-gray-900">
            {/* Left Side */}
            <div className="w-full items-center justify-center hidden lg:block lg:max-w-[952px]">
                <img src={side_login} alt="Sign Up Illustration" className="object-cover h-full w-full" />
            </div>

            {/* Right Side */}
            <div className="w-full flex justify-center p-8">
                <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
                    <div className="mb-6 text-center">
                        <img src={logo} alt="Logo" className="mx-auto pb-2" width="150px" />
                        <p className="text-xl font-semibold text-gray-600">Sign Up for Chat-Boat</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-4">
                            <label className="block">
                                <span className="text-lg font-medium text-gray-700">Name</span>
                                <input
                                    type="text"
                                    placeholder="Enter Your Name"
                                    className={`mt-2 block w-full py-2 px-3 rounded-lg border ${error.name ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
                            </label>
                            <label className="block">
                                <span className="text-lg font-medium text-gray-700">Email Address</span>
                                <input
                                    type="email"
                                    placeholder="Enter Your Email Address"
                                    className={`mt-2 block w-full py-2 px-3 rounded-lg border ${error.email ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
                            </label>
                            <label className="block">
                                <span className="text-lg font-medium text-gray-700">Password</span>
                                <div className="relative mt-2">
                                    <input
                                        type={show ? "text" : "password"}
                                        placeholder="Enter Password"
                                        className={`block w-full py-2 px-3 rounded-lg border ${error.password ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600"
                                        onClick={() => setShow(!show)}
                                    >
                                        {show ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
                            </label>
                            <label className="block">
                                <span className="text-lg font-medium text-gray-700">Confirm Password</span>
                                <div className="relative mt-2">
                                    <input
                                        type={show ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        className={`block w-full py-2 px-3 rounded-lg border ${error.confirmPassword ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600"
                                        onClick={() => setShow(!show)}
                                    >
                                        {show ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {error.confirmPassword && <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>}
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="flex justify-center items-center mt-6">
                        <p className="text-lg text-gray-600">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-600 hover:underline">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
