import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import side_login from "../images/loginsidebg.gif";
import { toast } from "react-toastify";
import { BaseUrl } from "../Config/Constant";

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!email || !password) {
            alert("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BaseUrl}/api/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Login Successful");
                localStorage.setItem("userInfo", JSON.stringify(data));
                navigate("/");
            } else {
                alert(`Error: ${data.message}`);
            }
            setLoading(false);
        } catch (error) {
            alert("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-row min-h-screen bg-white text-gray-900">
            {/* Left Side */}
            <div className="w-full items-center justify-center hidden lg:block lg:max-w-[952px]">
                <img src={side_login} alt="Login Illustration" className="object-cover h-full w-full" />
            </div>

            {/* Right Side */}
            <div className="w-full flex justify-center p-8">
                <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
                    <div className="mb-6 text-center">
                        <img src={logo} alt="Logo" className="mx-auto pb-2" width="150px" />
                        <p className="text-xl font-semibold text-gray-600">Login to Chat-Boat</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-4">
                            <label className="block">
                                <span className="text-lg font-medium text-gray-700">Email Address</span>
                                <input
                                    type="email"
                                    placeholder="Enter Your Email Address"
                                    className="mt-2 block w-full py-2 px-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="block">
                                <span className="text-lg font-medium text-gray-700">Password</span>
                                <div className="relative mt-2">
                                    <input
                                        type={show ? "text" : "password"}
                                        placeholder="Enter Password"
                                        className="block w-full py-2 px-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <button
                            type="button"
                            className="w-full py-3 px-4 mt-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            onClick={() => {
                                setEmail("test@gmail.com");
                                setPassword("12345");
                            }}
                        >
                            Get Guest User Credentials
                        </button>
                    </form>

                    <div className="flex justify-center items-center mt-6">
                        <p className="text-lg text-gray-600">
                            Don't have an account?{" "}
                            <a href="/register" className="text-blue-600 hover:underline">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
