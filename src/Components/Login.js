import React from "react";
import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";

const Login = () => {
    const [username, setUsername] = useState("");
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-400">
                    Codeforces Wrapped 2023
                </h1>
                <p className="text-gray-400 text-center mb-6">
                    Explore your Codeforces contest insights for 2023.
                </p>
                <form onSubmit={handleSubmit} className="mb-6">
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        placeholder="Enter Your Codeforces Handle"
                        className="p-3 w-full border border-gray-600 rounded-md focus:outline-none focus:border-blue-400 text-gray-800"
                    />
                    <button
                        type="submit"
                        className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue w-full mt-4 transition-all duration-300"
                    >
                        Get Your Codeforces Wrap 2023
                    </button>
                </form>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mt-8 text-gray-400 text-center">
                    <p className="text-sm">
                        ❤️ Made by Mridul and Anuj
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
