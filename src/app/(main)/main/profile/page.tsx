'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/utils/zustand/useAuthUserStore";
import usePostStore from "@/utils/zustand/usePostStore";

type Thought = {
    _id: string;
    content: string;
    createdAt: string;
    mood: string;
    posterId: {
        _id: string;
        username: string;
    };
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).replace(",", "");
};

const ProfilePage = () => {
    const router = useRouter();
    const { authUser, getAuthUserFunction } = useAuthStore();
    const { posts, getAllPost } = usePostStore();

    const [icons, setIcons] = useState<Record<string, "pin" | "clip">>({});
    const [loading, setLoading] = useState<boolean>(true); // Local loading state for posts

    // Fetch auth user on mount
    useEffect(() => {
        getAuthUserFunction();
    }, []);

    // Redirect if not logged in
    useEffect(() => {
        if (!authUser) {
            router.push("/login");
        }
    }, [authUser]);

    // Fetch posts only if store has none
    useEffect(() => {
        const fetchPosts = async () => {
            if (authUser && posts.length === 0) {
                setLoading(true); // Set loading to true when fetching posts
                await getAllPost(); // Fetch posts asynchronously
                setLoading(false); // Set loading to false after fetching
            } else {
                setLoading(false); // If posts are already fetched, set loading to false
            }
        };
        fetchPosts();
    }, [authUser, posts.length, getAllPost]);

    // Assign random icons whenever posts change
    useEffect(() => {
        if (posts.length > 0) {
            const newIcons: Record<string, "pin" | "clip"> = {};
            posts.forEach((t) => {
                newIcons[t._id] = Math.random() < 0.5 ? "pin" : "clip";
            });
            setIcons(newIcons);
        }
    }, [posts]);

    // Filter only this user’s posts
    const userPosts = posts.filter(
        (post: Thought) => post?.posterId?._id === authUser?._id
    );

    return (
        <div className="min-h-screen bg-[#FED6B4] flex flex-col items-center py-8 px-4">

            {/* Designs */}
            <div className="fixed inset-0 z-0">
                <img src="/assets/landing/landing1.png" className="absolute right-0" />
                <img src="/assets/landing/landing2.png" className="absolute left-0" />
                <img src="/assets/landing/landing3.png" className="absolute left-0 bottom-0" />
                <img src="/assets/landing/landing4.png" className="absolute right-0 bottom-0" />
                <img src="/assets/landing/landing5.png" className="absolute left-0 bottom-0" />
                <img src="/assets/landing/landing6.png" className="absolute right-0 top-0" />
            </div>

            <h1 className="text-[64px] font-bold mb-8 text-black italianno-bold z-1">
                Profile
            </h1>

            {/* Profile Header */}
            {authUser && (
                <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center space-y-4 w-md max-w-3xl mb-10">
                    <h1 className="text-3xl text-black italianno-bold">
                        @{authUser.username}
                    </h1>
                    <p className="text-gray-600">{authUser.email}</p>
                    <p className="text-gray-500 text-sm">
                        Joined {new Date(authUser.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 max-w-md">
                        {authUser.bio || "No bio yet..."}
                    </p>
                </div>
            )}

            {/* Notes Column */}
            <div className="flex flex-col gap-8 w-full max-w-md mx-auto">
                {loading ? (
                    // Skeleton loading UI
                    Array.from({ length: 2 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-lg relative skeleton"
                        >
                            {/* Top header skeleton */}
                            <div className="bg-gray-200 h-8 w-full rounded-t-xl"></div>

                            {/* Whole body skeleton */}
                            <div className="h-[200px] bg-gray-100 rounded-b-xl"></div>
                        </div>
                    ))
                ) : userPosts.length === 0 ? (
                    // Message when there are no posts available
                    <div className="text-gray-500 text-lg text-center">
                        No posts available yet. Start creating!
                    </div>
                ) : (
                    // Render the user's posts when available
                    userPosts.map((thought: Thought) => (
                        <div
                            key={thought._id}
                            className="bg-white rounded-xl shadow-lg transition-shadow duration-200 relative"
                        >
                            {/* Top yellow header */}
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

                            {/* Content of the thought */}
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
                    ))
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
