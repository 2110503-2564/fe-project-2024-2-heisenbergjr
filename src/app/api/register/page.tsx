'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";

export default function RegisterPage() {
    const [userName, setUserName] = useState("");
    const [telephoneNumber, setTelephoneNumber] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        try {
            const response = await userRegister(userName, telephoneNumber, userEmail, userPassword);
            setSuccess("Registration successful! Redirecting...");
            setTimeout(() => router.push("/api/auth/signin"), 2000);
        } catch (error: any) {
            setError(error.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Telephone Number</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={telephoneNumber}
                            onChange={(e) => setTelephoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
                <h2 className="text-md mt-5 mb-6 text-center text-black">
                    Already have an account? <a href="/api/auth/signin" className="text-blue-500 hover:underline">Sign In</a>
                </h2>
            </div>
        </div>
    );
}
