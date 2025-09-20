import React from "react";
import Link from "next/link";
import { Menu, User, BookOpen, PlusSquare, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
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
                    <ul className="menu space-y-2 flex-1 w-full italiana-bold ">
                        {/* Username placeholder */}
                        <li className="mb-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 w-full">
                                <User size={24} />
                                <span className="font-semibold">Username</span>
                            </div>
                        </li>

                        {/* Menu items */}
                        <li>
                            <Link
                                href="/main/browse"
                                className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-200 transition w-full"
                            >
                                <BookOpen size={20} /> Browse Thoughts
                            </Link>
                        </li>
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
                    </ul>

                    {/* Logout at the bottom */}
                    <div className="mt-auto">
                        <Link
                            href="/logout"
                            className="flex items-center gap-2 p-3 rounded-lg text-red-600 hover:bg-red-100 transition cursor-pointer w-full"
                        >
                            <LogOut size={20} /> Logout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar
