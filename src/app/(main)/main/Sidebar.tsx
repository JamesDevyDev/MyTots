'use client'

import useAuthStore from "@/utils/zustand/useAuthUserStore";
import React, { useEffect } from "react";
import Link from "next/link";
import { Menu, User, BookOpen, PlusSquare, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";




const Sidebar = () => {

    const { authUser, getAuthUserFunction, LogoutFunction } = useAuthStore()

    const router = useRouter()

    useEffect(() => {
        getAuthUserFunction()
    }, [])



    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content px-[25px] py-[25px] absolute z-[2] fixed">
                {/* Burger menu button */}
                <label
                    htmlFor="my-drawer"
                    className="btn btn-ghost drawer-button bg-black"
                >
                    <Menu size={28} color={"white"} />
                </label>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="bg-[#C4C4C4] text-black min-h-full w-60 p-4 flex flex-col">
                    {/* Top menu */}
                    <ul className="menu space-y-2 flex-1 w-full italiana-bold">
                        {/* Username placeholder */}
                        {authUser ? (
                            <li className="mb-4">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 w-full">
                                    <User size={24} />
                                    <span className="font-semibold">{authUser?.username}</span>
                                </div>
                            </li>
                        ) : null}

                        {/* Menu items */}
                        <li>
                            <Link
                                href="/main/browse"
                                className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-200 transition w-full"
                            >
                                <BookOpen size={20} /> Browse Thoughts
                            </Link>
                        </li>

                        {authUser ? (
                            <>
                                <li>
                                    <Link
                                        href="/main/create"
                                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-200 transition w-full"
                                    >
                                        <PlusSquare size={20} /> Create Thought
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/main/profile"
                                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-200 transition w-full"
                                    >
                                        <User size={20} /> My Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/main/settings"
                                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-200 transition w-full"
                                    >
                                        <Settings size={20} /> Settings
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href="/login"
                                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-200 transition w-full"
                                    >
                                        <User size={20} /> Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/register"
                                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-200 transition w-full"
                                    >
                                        <PlusSquare size={20} /> Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>


                    {/* Logout at the bottom */}
                    {authUser &&
                        < div className="mt-auto">
                            <div
                                className="flex items-center gap-2 p-3 rounded-lg text-red-600 hover:bg-red-100 transition cursor-pointer w-full"
                                onClick={() => {
                                    LogoutFunction()
                                    router.push('/')
                                }}
                            >
                                <LogOut size={20} /> Logout
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar
