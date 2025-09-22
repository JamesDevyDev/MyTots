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
            <div className="flex flex-col gap-20 max-w-md md:max-w-2xl z-4">
                {loading ? (
                    <p className="text-gray-700 bungee-regular">Loading thoughts...</p>
                ) : posts.length === 0 ? (
                    <p className="text-gray-700 bungee-regular">No thoughts yet.</p>
                ) : (
                    posts.map((t: Thought) => (
                        <div key={t._id} className="w-[300px] md:w-[400px] ">
                            {/* Main Card wrapper */}
                            <div className="relative w-full">
                                {/* Shadow Card */}
                                <div className="absolute left-[-5%] bottom-[-5%] w-full bg-black rounded-xl z-0 h-full"></div>

                                {/* Emotion image */}
                                <img
                                    src={`/assets/emotions/${t.mood}.png`}
                                    className="absolute z-20 right-[-50%] top-[-18%] md:right-[-210px] md:top-[-100px] scale-[2]"
                                    alt={t.mood}
                                />

                                {/* Main Card */}
                                <div
                                    className={`relative z-10 w-full rounded-xl p-5 flex flex-col bungee-regular ${t.color === "blue"
                                        ? "bg-blue-300 text-black"
                                        : t.color === "pink"
                                            ? "bg-pink-300 text-black"
                                            : t.color === "purple"
                                                ? "bg-purple-300 text-black"
                                                : t.color === "green"
                                                    ? "bg-green-300 text-black"
                                                    : t.color === "yellow"
                                                        ? "bg-yellow-300 text-black"
                                                        : t.color === "orange"
                                                            ? "bg-orange-300 text-black"
                                                            : t.color === "red"
                                                                ? "bg-red-300 text-black"
                                                                : t.color === "teal"
                                                                    ? "bg-teal-300 text-black"
                                                                    : t.color === "lime"
                                                                        ? "bg-lime-300 text-black"
                                                                        : t.color === "indigo"
                                                                            ? "bg-indigo-300 text-black"
                                                                            : "bg-gray-300 text-black"
                                        }`}
                                >
                                    {/* Header */}
                                    <div
                                        className={`flex items-center justify-between px-[20px] rounded-xl text-sm md:text-lg ${t.color === "blue"
                                            ? "bg-blue-800 text-black"
                                            : t.color === "pink"
                                                ? "bg-pink-800 text-black"
                                                : t.color === "purple"
                                                    ? "bg-purple-800 text-black"
                                                    : t.color === "green"
                                                        ? "bg-green-800 text-black"
                                                        : t.color === "yellow"
                                                            ? "bg-yellow-800 text-black"
                                                            : t.color === "orange"
                                                                ? "bg-orange-800 text-black"
                                                                : t.color === "red"
                                                                    ? "bg-red-800 text-black"
                                                                    : t.color === "teal"
                                                                        ? "bg-teal-800 text-black"
                                                                        : t.color === "lime"
                                                                            ? "bg-lime-800 text-black"
                                                                            : t.color === "indigo"
                                                                                ? "bg-indigo-800 text-black"
                                                                                : "bg-gray-800 text-black"
                                            }`}
                                    >
                                        <div className="font-bold">{t.posterId?.username || "You"}</div>
                                        <div className="font-bold capitalize">Feeling {t.mood}</div>
                                    </div>

                                    {/* Content */}
                                    <div className="mt-6 md:mt-10 text-xs md:text-sm break-words whitespace-pre-wrap">
                                        {t.content}
                                    </div>

                                    {/* Date */}
                                    <div className="text-sm text-gray-700 mt-4 italic">{formatDate(t.createdAt)}</div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default BrowsePage;
