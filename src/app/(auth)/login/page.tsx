'use client';

import useAuthStore from "@/utils/zustand/useAuthUserStore";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface LoginForm {
    username: string;
    password: string;
}

const Login = () => {
    const { LoginFunction, authUser, getAuthUserFunction } = useAuthStore();
    const router = useRouter();

    const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => { getAuthUserFunction(); }, [getAuthUserFunction]);

    useEffect(() => {
        if (authUser) router.push("/main/browse");
    }, [authUser, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const data = await LoginFunction(form);
        setLoading(false);

        if (data?.error) return setError(data.error);
        router.push('/main/browse');
    };
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-x-hidden">
            {/* Background */}
            <img
                src="/assets/test/bg2.png"
                alt="background"
                className="w-full h-full object-cover fixed top-0 left-0 z-0"
            />

            {/* Logo */}
            <Link
                href='/'
                className="bungee-regular text-[64px] sm:text-[80px] text-white z-10 mb-10 cursor-pointer"
                style={{
                    textShadow: `
                    -5px -5px 0 #000,
                     5px -5px 0 #000,
                    -5px  5px 0 #000,
                     5px  5px 0 #000
                    `,
                }}
            >
                MyTots
            </Link>

            {/* Form card */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-[320px] md:w-[400px] h-[400px] bg-black rounded-xl absolute left-[-5%] bottom-[-5%] z-0"></div>

                <div className="w-[320px] md:w-[400px] bg-purple-300 rounded-xl relative z-10 p-6 sm:p-8 flex flex-col gap-6">
                    <h1 className="bungee-regular text-3xl sm:text-4xl text-center mb-6 text-black">Login</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 text-black text-base sm:text-lg"
                        />

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 text-black text-base sm:text-lg"
                        />

                        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition bungee-regular text-base sm:text-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {loading && <span className="loading loading-spinner loading-sm"></span>}
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="text-center mt-4 text-gray-700 text-sm sm:text-base">
                        Don’t have an account?{" "}
                        <Link href="/register" className="text-black font-semibold hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
