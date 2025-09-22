'use client';

import React, { useEffect, useState } from "react";
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
    updatedAt: string;
};

const BrowsePage = () => {
    const { posts, getAllPost } = usePostStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            await getAllPost(); // fetch real data from store
            setLoading(false);
        };
        loadPosts();
    }, [getAllPost]);

    return (
        <div className="min-h-screen flex flex-col items-center py-8 px-4 pb-[100px] overflow-x-hidden">
            {/* Background */}
            <img
                src="/assets/test/bg1.png"
                className="w-full h-full object-cover fixed top-0 left-0"
                alt="background"
            />

            <h1 className="text-[32px] font-bold mb-8 text-black bungee-regular z-4">
                Browse Thoughts
            </h1>

            {/* Cards list */}
            <div className="flex flex-col gap-15 max-w-md md:max-w-2xl z-4">
                {loading ? (
                    <p className="text-gray-700 bungee-regular">Loading thoughts...</p>
                ) : posts.length === 0 ? (
                    <p className="text-gray-700 bungee-regular">No thoughts yet.</p>
                ) : (
                    posts.map((t: Thought) => (
                        <div key={t._id} className="relative flex justify-center mb-10">
                            {/* Emotion image */}
                            <img
                                src={`/assets/emotions/${t.mood}.png`}
                                className="absolute z-3 right-[-50%] top-[-18%] md:right-[-210px] md:top-[-100px] scale-[2]"
                                alt={t.mood}
                            />

                            {/* Card */}
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

export default BrowsePage;
