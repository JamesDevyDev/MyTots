'use client';
import { Heart, MessageCircle } from 'lucide-react';
import React, { useEffect, useState } from "react";
import usePostStore from "@/utils/zustand/usePostStore";
import CommentsModal from '@/components/CommentsModal';

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
    color: "blue" | "pink" | "purple" | "green" | "yellow" | "orange" | "red" | "teal" | "lime" | "indigo" | "gray";
    createdAt: string;
    updatedAt: string;
};

// Tailwind-safe color map
const colorMap: Record<string, { bg: string; header: string }> = {
    blue: { bg: "bg-blue-300 text-black", header: "bg-blue-800 text-black" },
    pink: { bg: "bg-pink-300 text-black", header: "bg-pink-800 text-black" },
    purple: { bg: "bg-purple-300 text-black", header: "bg-purple-800 text-black" },
    green: { bg: "bg-green-300 text-black", header: "bg-green-800 text-black" },
    yellow: { bg: "bg-yellow-300 text-black", header: "bg-yellow-800 text-black" },
    orange: { bg: "bg-orange-300 text-black", header: "bg-orange-800 text-black" },
    red: { bg: "bg-red-300 text-black", header: "bg-red-800 text-black" },
    teal: { bg: "bg-teal-300 text-black", header: "bg-teal-800 text-black" },
    lime: { bg: "bg-lime-300 text-black", header: "bg-lime-800 text-black" },
    indigo: { bg: "bg-indigo-300 text-black", header: "bg-indigo-800 text-black" },
    gray: { bg: "bg-gray-300 text-black", header: "bg-gray-800 text-black" },
};

const BrowsePage = () => {
    const { posts, getAllPost } = usePostStore();
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState<Thought | null>(null);

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
                    posts.map((t: Thought) => {
                        const colors = colorMap[t.color] || colorMap.gray;
                        return (
                            <div key={t._id} className="w-[300px] md:w-[400px] ">
                                {/* Main Card wrapper */}
                                <div className="relative w-full z-5">
                                    {/* Shadow Card */}
                                    <div className="absolute left-[-5%] top-[20px] w-full bg-black rounded-xl z-0 h-full"></div>

                                    {/* Emotion image */}
                                    <div className='w-[150px] h-[150px] absolute z-20 right-[-70px] md:right-[-80px] top-[-70px] overflow-hidden'>
                                        <img
                                            src={`/assets/emotions/${t.mood}.png`}
                                            className="scale-[4] md:scale-[5] top-[30%] relative"
                                            alt={t.mood}
                                        />
                                    </div>

                                    {/* Main Card */}
                                    <div className={`relative z-10 w-full rounded-xl p-5 flex flex-col bungee-regular ${colors.bg}`}>
                                        {/* Header */}
                                        <div className={`flex items-center justify-between px-[20px] rounded-xl text-sm md:text-lg ${colors.header}`}>
                                            <div className="font-bold">{t.posterId?.username || "You"}</div>
                                            <div className="font-bold capitalize">Feeling {t.mood}</div>
                                        </div>

                                        {/* Content */}
                                        <div className="mt-6 md:mt-10 text-xs md:text-sm break-words whitespace-pre-wrap">
                                            {t.content}
                                        </div>

                                        {/* Interactions */}
                                        <div className='w-full h-[50px] flex items-center justify-between'>
                                            <div className="text-sm text-gray-700 mt-4 italic">{formatDate(t.createdAt)}</div>
                                            <div className='h-full flex items-center justify-center'>
                                                {/* <div className='w-[50px] h-full flex items-center justify-center cursor-pointer'>
                                                    <Heart />
                                                </div> */}

                                                {/* Open modal + pass post */}
                                                <label
                                                    htmlFor="comments_modal"
                                                    className="w-[50px] h-full flex items-center justify-center cursor-pointer"
                                                    onClick={() => setSelectedPost(t)}
                                                >
                                                    <MessageCircle />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Modal */}
            <CommentsModal post={selectedPost} />
        </div>
    );
};

export default BrowsePage;
