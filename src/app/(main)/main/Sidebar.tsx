'use client';

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import useAuthStore from "@/utils/zustand/useAuthUserStore";
import { Menu, User, BookOpen, PlusSquare, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
    const { authUser, getAuthUserFunction, LogoutFunction } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname(); // current route

    useEffect(() => {
        getAuthUserFunction();
    }, []);

    // Close sidebar helper
    const closeDrawer = () => {
        const drawer = document.getElementById("my-drawer") as HTMLInputElement;
        if (drawer) drawer.checked = false;
    };

    // Utility to check if link is active
    const isActive = (path: string) => pathname === path;

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            {/* Burger button */}
            <div className="drawer-content px-6 py-6 fixed z-7">
                <label
                    htmlFor="my-drawer"
                    className="btn btn-ghost drawer-button bg-black/70"
                >
                    <Menu size={28} color="white" />
                </label>
            </div>

            {/* Sidebar content */}
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <div className="bg-[#C4C4C4] min-h-full w-60 p-4 flex flex-col text-black bungee-regular">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="w-full h-[50px] text-center text-[35px] mb-6"
                        onClick={closeDrawer}
                    >
                        MyTots
                    </Link>

                    {/* User info */}
                    {authUser && (
                        <div className="mb-6 flex items-center gap-3 p-3 rounded-lg bg-gray-100">
                            <User size={24} />
                            <span className="font-semibold">{authUser.username}</span>
                        </div>
                    )}

                    {/* Menu items */}
                    <ul className="flex-1 space-y-2 text-sm">
                        <li>
                            <Link
                                href="/main/browse"
                                onClick={closeDrawer}
                                className={`flex items-center gap-2 p-3 rounded-lg  transition w-full ${isActive("/main/browse") ? "bg-gray-300 font-bold" : "hover:bg-gray-200"
                                    }`}
                            >
                                <BookOpen size={20} /> Browse Thoughts
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/main/create"
                                onClick={closeDrawer}
                                className={`flex items-center gap-2 p-3 rounded-lg transition w-full ${isActive("/main/create") ? "bg-gray-300 font-bold" : "hover:bg-gray-200"
                                    }`}
                            >
                                <PlusSquare size={20} /> Create Thought
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/main/profile"
                                onClick={closeDrawer}
                                className={`flex items-center gap-2 p-3 rounded-lg transition w-full ${isActive("/main/profile") ? "bg-gray-300 font-bold" : "hover:bg-gray-200"
                                    }`}
                            >
                                <User size={20} /> My Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/main/settings"
                                onClick={closeDrawer}
                                className={`flex items-center gap-2 p-3 rounded-lg transition w-full ${isActive("/main/settings") ? "bg-gray-300 font-bold" : "hover:bg-gray-200"
                                    }`}
                            >
                                <Settings size={20} /> Settings
                            </Link>
                        </li>

                        {/* Login/Register if not authenticated */}
                        {!authUser && (
                            <>
                                <li>
                                    <Link
                                        href="/login"
                                        onClick={closeDrawer}
                                        className={`flex items-center gap-2 p-3 rounded-lg transition w-full ${isActive("/login") ? "bg-gray-300 font-bold" : "hover:bg-gray-200"
                                            }`}
                                    >
                                        <User size={20} /> Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/register"
                                        onClick={closeDrawer}
                                        className={`flex items-center gap-2 p-3 rounded-lg transition w-full ${isActive("/register") ? "bg-gray-300 font-bold" : "hover:bg-gray-200"
                                            }`}
                                    >
                                        <PlusSquare size={20} /> Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Logout at bottom */}
                    {authUser && (
                        <div className="mt-auto">
                            <div
                                className="flex items-center gap-2 p-3 rounded-lg text-red-600 hover:bg-red-100 transition cursor-pointer"
                                onClick={() => {
                                    LogoutFunction();
                                    closeDrawer();
                                    router.push("/");
                                }}
                            >
                                <LogOut size={20} /> Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
