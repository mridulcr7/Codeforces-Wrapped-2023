import React from "react";
import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";

const Login = () => {
    const [username, setUsername] = useState("");
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
       // console.log(username);
        await login(username);
    };
    return (
        <div className="relative">
            <div
                className="bg-cover bg-center h-screen flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://images.pexels.com/photos/259165/pexels-photo-259165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
                }}
            >
                <div className="bg-gray-800 bg-opacity-75 p-8 rounded-lg w-96 text-white">
                    <h1 className="text-3xl font-bold mb-4">Enter Username</h1>
                    <input
                        type="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        placeholder="Enter Your Username"
                        className="mb-4 p-3 w-full border border-gray-600 rounded-md bg-gray-700 placeholder-gray-300"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >
                        Get Your Wrapped for 2023
                    </button>
                    {/* <div>{error && <div className="error">{error}</div>}</div> */}
                </div>
            </div>
        </div>
    );
};

export default Login;
