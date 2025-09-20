"use client";

import React, { useState } from "react";
import Link from "next/link";

interface RegisterForm {
    username: string;
    email: string;
    password: string;
}

const Register = () => {
    const [form, setForm] = useState<RegisterForm>({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Register data:", form);
    };

    return (
        <div className="w-full min-h-screen bg-[#FED6B4] flex items-center justify-center px-4 flex-col">
            <Link href="/" className="italiana-bold text-[64px] text-black cursor-pointer">
                MyTots
            </Link>
            <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
                <h1 className="italiana-bold text-3xl sm:text-4xl text-center text-black mb-6">
                    Create Your Account
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-base sm:text-lg text-black"
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-base sm:text-lg text-black"
                    />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-base sm:text-lg text-black"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition italiana-bold text-base sm:text-lg cursor-pointer"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-700 text-sm sm:text-base">
                    Already have an account?{" "}
                    <Link href="/login" className="text-black font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
