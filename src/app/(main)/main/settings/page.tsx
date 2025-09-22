'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/utils/zustand/useAuthUserStore";

const SettingsPage = () => {
    const router = useRouter();
    const { authUser, getAuthUserFunction } = useAuthStore();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    // Fetch auth user on mount
    useEffect(() => {
        getAuthUserFunction();
    }, []);

    // Redirect if not logged in
    useEffect(() => {
        if (!authUser) {
            router.push("/login");
        } else {
            setFormData({
                username: authUser.username || "",
                password: "",
            });
        }
    }, [authUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated settings:", formData);
        // Later: send to backend API
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-8 px-4 pb-[100px] overflow-x-hidden">
            {/* Background */}
            <img
                src="/assets/test/bg2.png"
                className="w-full h-full object-cover fixed top-0 left-0"
                alt="background"
            />

            {/* Title */}
            <h1 className="text-[32px] md:text-[40px] font-bold mb-8 text-black bungee-regular z-2">
                Settings
            </h1>

            {/* Form with shadow (responsive) */}
            <div className="relative flex justify-center">
                {/* Actual Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-[300px] md:w-[400px] bg-blue-300 rounded-xl relative z-3 p-4 sm:p-6 text-black bungee-regular flex flex-col gap-6"
                >
                    {/* Username */}
                    <div>
                        <label className="block text-gray-800 font-medium mb-2 bungee-regular">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-gray-900 placeholder-gray-500 text-sm md:text-base"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-800 font-medium mb-2 bungee-regular">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter new password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-gray-900 placeholder-gray-500 text-sm md:text-base"
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-full py-2 sm:py-3 font-semibold rounded-lg transition flex justify-center items-center bungee-regular bg-gray-900 text-white hover:bg-gray-800"
                    >
                        Save Changes
                    </button>
                </form>

                {/* Shadow card */}
                <div className="w-[300px] md:w-[400px] bg-black rounded-xl absolute left-[-5%] top-[20px] z-0 h-full"></div>
            </div>
        </div>
    );
};

export default SettingsPage;
