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
    const [selectedThought, setSelectedThought] = useState<Thought | null>(null);

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
        if (authUser && posts.length === 0) {
            getAllPost();
        }
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
        (post: Thought) => post.posterId?._id === authUser?._id
    );

    return (
        <div className="min-h-screen bg-[#FED6B4] flex flex-col items-center py-8 px-4">
            <h1 className="text-[64px] font-bold mb-6 text-black italianno-bold">
                Profile
            </h1>

            {/* Profile Header */}
            {authUser && (
                <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center space-y-4 w-md max-w-3xl">
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

            {/* User's Thoughts */}
            <div className="flex flex-col gap-8 w-full max-w-md mt-8">
                {userPosts.length === 0 ? (
                    <p className="text-gray-700 text-center">
                        No thoughts posted yet.
                    </p>
                ) : (
                    userPosts.map((thought) => (
                        <div
                            key={thought._id}
                            className="bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200 relative"
                            onClick={() => setSelectedThought(thought)}
                        >
                            {/* Top yellow header */}
                            <div className="bg-[#FFDA5C] h-8 w-full rounded-t-xl px-4 flex items-center relative">
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

                            {/* Thought preview */}
                            <div className="h-[200px] px-4 bg-[#FFF8ED] relative flex flex-col justify-center items-center rounded-b-xl">
                                <div className="text-[48px] mb-2">{thought.mood}</div>
                                <span className="text-[40px] text-gray-800 font-semibold italianno-bold">
                                    {authUser?.username}
                                </span>
                                <span className="text-[32px] text-gray-700 italianno-bold mt-2">
                                    {formatDate(thought.createdAt)}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            <input
                type="checkbox"
                id="note-modal"
                className="modal-toggle"
                checked={!!selectedThought}
                readOnly
            />
            <label htmlFor="note-modal" className="modal bg-black/50">
                <label className="modal-box relative cursor-auto max-w-md p-0 bg-transparent">
                    {selectedThought && (
                        <div className="bg-white rounded-xl shadow-lg w-full relative">
                            {/* Top yellow header */}
                            <div className="bg-[#FFDA5C] h-16 w-full rounded-t-xl px-4 flex items-center justify-end relative">
                                {/* Close button */}
                                <div className="self-end h-[100%] flex items-center justify-center">
                                    <button
                                        className="text-[#A77D18] cursor-pointer text-center h-full w-[100%]"
                                        onClick={() => setSelectedThought(null)}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="px-4 pb-6 bg-[#FFF8ED] rounded-b-xl flex flex-col items-center text-center">
                                {/* Mood emoji */}
                                <div className="text-[48px] mb-2">
                                    {selectedThought.mood}
                                </div>

                                {/* Dynamic emotion label */}
                                <div className="text-gray-500 mb-2">
                                    {(() => {
                                        switch (selectedThought.mood) {
                                            case "😊": return "is feeling Happy";
                                            case "😔": return "is feeling Sad";
                                            case "😡": return "is feeling Angry";
                                            case "😌": return "is feeling Relaxed";
                                            case "🤔": return "is feeling Thoughtful";
                                            case "😞": return "is feeling Disappointed";
                                            default: return "is feeling Neutral";
                                        }
                                    })()}
                                </div>

                                {/* Full thought content */}
                                <div className="text-gray-900 font-bold text-lg whitespace-pre-wrap break-words mb-4 w-[90%]">
                                    {selectedThought.content}
                                </div>

                                {/* Bottom info */}
                                <div className="flex justify-between w-[90%] text-gray-500 text-sm">
                                    <span>{authUser?.username}</span>
                                    <span>{formatDate(selectedThought.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </label>
            </label>
        </div>
    );
};

export default ProfilePage;
