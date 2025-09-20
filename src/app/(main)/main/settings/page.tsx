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
        <div className="w-full min-h-screen bg-[#FED6B4] flex justify-start items-center px-4 py-8 flex-col">
            <h1 className="text-[64px] font-bold mb-6 text-black italianno-bold">Settings</h1>

            <div className="w-full max-w-lg bg-[#FFF8ED] rounded-2xl shadow-lg p-8 space-y-6">
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Username */}
                    <div>
                        <label className="block text-gray-800 font-semibold mb-2 italiana-bold">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm placeholder-gray-400 text-gray-900"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-800 font-semibold mb-2 italiana-bold">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter new password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm placeholder-gray-400 text-gray-900"
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#FFDA5C] text-black font-semibold rounded-xl hover:bg-yellow-400 transition shadow-md italiana-bold cursor-pointer"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;
