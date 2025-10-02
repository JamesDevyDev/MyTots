'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, MessageCircle } from "lucide-react";
import useAuthStore from "@/utils/zustand/useAuthUserStore";
import usePostStore from "@/utils/zustand/usePostStore";
import CommentsModal from "@/components/CommentsModal";

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
    mood:
    | "angry"
    | "confused"
    | "excited"
    | "happy"
    | "sad"
    | "scared";
    color:
    | "blue"
    | "pink"
    | "purple"
    | "green"
    | "yellow"
    | "orange"
    | "red"
    | "teal"
    | "lime"
    | "indigo"
    | "gray";
    createdAt: string;
};

const ProfilePage = () => {
    const router = useRouter();
    const { authUser, getAuthUserFunction } = useAuthStore();
    const { posts, getAllPost } = usePostStore();

    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState<Thought | null>(null);

    useEffect(() => {
        getAuthUserFunction();
    }, []);

    useEffect(() => {
        if (!authUser) router.push("/login");
    }, [authUser]);

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
                    <div className="w-[300px] md:w-[400px] bg-orange-300 rounded-xl relative z-4 p-6 text-black bungee-regular flex flex-col gap-3 items-center text-center">
                        <h2 className="text-2xl md:text-3xl">@{authUser.username}</h2>
                        <p className="text-gray-700 text-sm md:text-base">
                            {authUser.email}
                        </p>
                        <p className="text-gray-600 text-xs md:text-sm">
                            Joined {new Date(authUser.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-800 text-sm md:text-base">
                            {authUser.bio || "No bio yet..."}
                        </p>
                    </div>
                    <div className="absolute left-[-5%] top-[20px] w-[300px] md:w-[400px] bg-black rounded-xl z-0 h-full"></div>
                </div>
            )}

            {/* User Posts */}
            <div className="flex flex-col gap-10 max-w-md md:max-w-2xl z-4 pt-[50px]">
                {loading ? (
                    <p className="text-gray-700 bungee-regular">Loading posts...</p>
                ) : userPosts.length === 0 ? (
                    <p className="text-gray-700 bungee-regular text-center">
                        No posts yet. Start creating!
                    </p>
                ) : (
                    userPosts.map((t: Thought) => (
                        <div
                            key={t._id}
                            className="relative flex justify-center mb-10 w-[300px] md:w-[400px]"
                        >
                            <div className="relative w-full">
                                {/* Shadow card */}
                                <div className="absolute left-[-5%] top-[20px] w-full bg-black rounded-xl z-0 h-full"></div>

                                {/* Emotion image */}
                                <div className="w-[150px] h-[150px] absolute z-20 right-[-70px] md:right-[-80px] top-[-70px] overflow-hidden">
                                    <img
                                        src={`/assets/emotions/${t.mood}.png`}
                                        className="scale-[4] md:scale-[5] top-[30%] relative"
                                        alt={t.mood}
                                    />
                                </div>

                                {/* Post Card */}
                                <div
                                    className={`relative z-10 w-full rounded-xl p-5 flex flex-col bungee-regular
                  ${t.color === "blue"
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
                                        className={`flex items-center justify-between px-[20px] rounded-xl text-sm md:text-lg
                    ${t.color === "blue"
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
                                        <div className="font-bold">{authUser?.username || "You"}</div>
                                        <div className="font-bold capitalize">Feeling {t.mood}</div>
                                    </div>

                                    {/* Content */}
                                    <div className="mt-6 md:mt-10 text-xs md:text-sm break-words whitespace-pre-wrap">
                                        {t.content}
                                    </div>

                                    {/* Interactions */}
                                    <div className="w-full h-[50px] flex items-center justify-between mt-4">
                                        <div className="text-sm text-gray-700 italic">
                                            {formatDate(t.createdAt)}
                                        </div>
                                        <div className="h-full flex items-center justify-center">
                                            {/* <div className="w-[50px] h-full flex items-center justify-center cursor-pointer">
                                                <Heart />
                                            </div> */}
                                            {/* Open modal */}
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
                    ))
                )}
            </div>

            {/* Comment Modal */}
            <CommentsModal post={selectedPost} />
        </div>
    );
};

export default ProfilePage;
