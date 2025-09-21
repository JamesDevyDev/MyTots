"use client";

import React, { useEffect, useState } from "react";
import usePostStore from "@/utils/zustand/usePostStore";

type Thought = {
    _id: string;
    posterId: {
        _id: string;
        username: string;
    };
    content: string;
    mood: string;
    createdAt: string;
    updatedAt: string;
};

const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
};

const BrowsePage = () => {
    const { getAllPost, posts } = usePostStore();
    const [loading, setLoading] = useState(true); // ✅ local loading
    const [icons, setIcons] = useState<Record<string, "pin" | "clip">>({});

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            await getAllPost();
            setLoading(false);
        };
        loadPosts();
    }, [getAllPost]);

    useEffect(() => {
        if (posts.length > 0) {
            const newIcons: Record<string, "pin" | "clip"> = {};
            posts.forEach((t: Thought) => {
                newIcons[t._id] = Math.random() < 0.5 ? "pin" : "clip";
            });
            setIcons(newIcons);
        }
    }, [posts]);

    return (
        <div className="min-h-screen bg-[#FED6B4] flex flex-col items-center py-8 px-4">
            {/* Designs */}
            <div className="fixed inset-0 z-0">
                <img src="/assets/landing/landing1.png" className="absolute right-0" />
                <img src="/assets/landing/landing2.png" className="absolute left-0" />
                <img src="/assets/landing/landing3.png" className="absolute left-[-5px] bottom-0" />
                <img src="/assets/landing/landing4.png" className="absolute right-0 bottom-0" />
                <img src="/assets/landing/landing5.png" className="absolute left-0 bottom-0" />
                <img src="/assets/landing/landing6.png" className="absolute right-0 top-0" />
            </div>

            <h1 className="text-[64px] font-bold mb-8 text-black italianno-bold z-1">
                Browse Thoughts
            </h1>

            {/* Notes column */}
            <div className="flex flex-col gap-8 w-full max-w-md mx-auto">
                {loading
                    ? Array.from({ length: 2 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-lg relative skeleton "
                        >
                            {/* Top header skeleton */}
                            <div className="bg-gray-200 h-8 w-full rounded-t-xl"></div>

                            {/* Whole body skeleton */}
                            <div className="h-[200px] bg-gray-100 rounded-b-xl"></div>
                        </div>
                    ))
                    : posts.map((thought: Thought) => (
                        <div
                            key={thought._id}
                            className="bg-white rounded-xl shadow-lg transition-shadow duration-200 relative"
                        >
                            <div className="bg-[#FFDA5C] h-8 w-full rounded-t-xl relative">
                                {icons[thought._id] === "pin" ? (
                                    <div className="w-[80px] h-[80px] absolute right-[0] top-[-150%]">
                                        <img src="/assets/browse/pin.webp" />
                                    </div>
                                ) : icons[thought._id] === "clip" ? (
                                    <div className="w-[150px] h-[150px] absolute right-[0%] top-[-85%]">
                                        <img src="/assets/browse/clip.png" />
                                    </div>
                                ) : null}
                            </div>

                            {/* Display the full content directly below each post */}
                            <div className="px-6 py-6 bg-[#FFF8ED] rounded-b-xl">
                                {/* Mood */}
                                <div className="text-[48px] mb-2 text-center">{thought.mood}</div>

                                {/* Mood Description */}
                                <div className="text-gray-500 mb-4 text-center">
                                    {(() => {
                                        switch (thought.mood) {
                                            case "😊":
                                                return "is feeling Happy";
                                            case "😔":
                                                return "is feeling Sad";
                                            case "😡":
                                                return "is feeling Angry";
                                            case "😌":
                                                return "is feeling Relaxed";
                                            case "🤔":
                                                return "is feeling Thoughtful";
                                            case "😞":
                                                return "is feeling Disappointed";
                                            default:
                                                return "is feeling Neutral";
                                        }
                                    })()}
                                </div>

                                {/* Content */}
                                <div className="text-gray-900 font-bold text-lg whitespace-pre-wrap break-words mb-4 w-full">
                                    {thought.content}
                                </div>

                                {/* User Info and Date */}
                                <div className="flex justify-between items-center text-gray-500 text-sm w-full">
                                    <span className="text-[40px] text-gray-800 font-semibold italianno-bold">
                                        {thought?.posterId?.username ?? "Anonymous"}
                                    </span>
                                    <span className="text-[32px] text-gray-700 italianno-bold mt-2">
                                        {formatDate(thought.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default BrowsePage;
