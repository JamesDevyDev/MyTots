'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/utils/zustand/useAuthUserStore";
import usePostStore from "@/utils/zustand/usePostStore";

// Format date like "Sept 18, 2025 - 10:30 AM"
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
        .toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .replace(",", "");
};

type Thought = {
    _id: string;
    posterId: { _id: string; username: string };
    content: string;
    mood: "angry" | "confused" | "excited" | "happy" | "sad" | "scared";
    color: "blue" | "pink" | "purple" | "green";
    createdAt: string;
};

const ProfilePage = () => {
    const router = useRouter();
    const { authUser, getAuthUserFunction } = useAuthStore();
    const { posts, getAllPost } = usePostStore();

    const [loading, setLoading] = useState(true);
    const [icons, setIcons] = useState<Record<string, "pin" | "clip">>({});

    // Fetch auth user
    useEffect(() => {
        getAuthUserFunction();
    }, []);

    // Redirect if not logged in
    useEffect(() => {
        if (!authUser) router.push("/login");
    }, [authUser]);

    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            if (authUser) {
                setLoading(true);
                await getAllPost();
                setLoading(false);
            }
        };
        fetchPosts();
    }, [authUser, getAllPost]);

    // Random icons for posts
    useEffect(() => {
        if (posts.length > 0) {
            const newIcons: Record<string, "pin" | "clip"> = {};
            posts.forEach((t) => {
                newIcons[t._id] = Math.random() < 0.5 ? "pin" : "clip";
            });
            setIcons(newIcons);
        }
    }, [posts]);

    // Filter user posts
    const userPosts = posts.filter(
        (post: Thought) => post.posterId._id === authUser?._id
    );

    return (
        <div className="min-h-screen flex flex-col items-center py-8 px-4 pb-[100px] overflow-x-hidden">
            {/* Background */}
            <img
                src="/assets/test/bg1.png"
                className="w-full h-full object-cover fixed top-0 left-0"
                alt="background"
            />

            <h1 className="text-[32px] font-bold mb-8 text-black bungee-regular z-4">
                Profile
            </h1>

            {/* Profile Card */}
            {authUser && (
                <div className="relative flex justify-center mb-10">
                    <div className="w-[300px] md:w-[400px] bg-orange-300 rounded-xl relative z-3 p-6 text-black bungee-regular flex flex-col gap-3 items-center text-center">
                        <h2 className="text-2xl md:text-3xl">@{authUser.username}</h2>
                        <p className="text-gray-700 text-sm md:text-base">{authUser.email}</p>
                        <p className="text-gray-600 text-xs md:text-sm">
                            Joined {new Date(authUser.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-800 text-sm md:text-base">
                            {authUser.bio || "No bio yet..."}
                        </p>
                    </div>
                    <div className="w-[300px] md:w-[400px] bg-black rounded-xl absolute left-[-5%] bottom-[-10%] z-0 h-full"></div>
                </div>
            )}

            {/* User Posts */}
            <div className="flex flex-col gap-10 max-w-md md:max-w-2xl z-4">
                {loading ? (
                    <p className="text-gray-700 bungee-regular">Loading posts...</p>
                ) : userPosts.length === 0 ? (
                    <p className="text-gray-700 bungee-regular text-center">
                        No posts yet. Start creating!
                    </p>
                ) : (
                    userPosts.map((t: Thought) => (
                        <div key={t._id} className="relative flex justify-center mb-10">
                            {/* Emotion image */}
                            <img
                                src={`/assets/emotions/${t.mood}.png`}
                                className="absolute z-3 right-[-50%] top-[-18%] md:right-[-210px] md:top-[-100px] scale-[2]"
                                alt={t.mood}
                            />

                            {/* Post Card */}
                            <div
                                className={`w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-${t.color}-300 rounded-xl relative z-2 p-5 text-black bungee-regular flex flex-col`}
                            >
                                {/* Header */}
                                <div
                                    className={`flex items-center justify-between px-[20px] rounded-xl text-sm md:text-lg ${t.color === "blue" ? "bg-blue-800" :
                                        t.color === "pink" ? "bg-pink-800" :
                                            t.color === "purple" ? "bg-purple-800" :
                                                t.color === "green" ? "bg-green-800" : ""
                                        }`}
                                >
                                    <div className="font-bold">{t.posterId.username}</div>
                                    <div className="font-bold ">
                                        Feeling {t.mood}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mt-6 md:mt-10 text-xs md:text-sm flex-1 overflow-y-auto break-words">
                                    {t.content}
                                </div>

                                {/* Date */}
                                <div className="text-sm text-gray-700 mt-4 italic">
                                    {formatDate(t.createdAt)}
                                </div>
                            </div>

                            {/* Shadow card */}
                            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-black rounded-xl absolute left-[-5%] bottom-[-5%] z-0"></div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
