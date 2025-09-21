'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/utils/zustand/useAuthUserStore";
import usePostStore from "@/utils/zustand/usePostStore";

// Format date to "Sept 18, 2025 - 10:30 AM"
const formatDate = (date: Date) =>
    date
        .toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .replace(",", "");

// Mood → description map
const moodText: Record<string, string> = {
    "😊": "is feeling Happy",
    "😔": "is feeling Sad",
    "😡": "is feeling Angry",
    "😌": "is feeling Relaxed",
    "🤔": "is feeling Thoughtful",
    "😞": "is feeling Disappointed",
};

const CreatePage = () => {
    const { addNewPost } = usePostStore();
    const { authUser, getAuthUserFunction } = useAuthStore();
    const router = useRouter();

    const [thought, setThought] = useState("");
    const [mood, setMood] = useState("😊");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const currentDate = new Date();

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const data = await addNewPost({
            posterId: authUser?._id,
            content: thought,
            mood,
        });

        if (data?.error) {
            setError(data.error);
        } else {
            setThought("");
            setMood("😊");
        }

        setLoading(false);
    };

    return (
        <div className="w-full min-h-screen bg-[#FED6B4] flex flex-col items-center px-4 py-8">

            {/* Designs */}
            <div className="fixed inset-0 z-0">
                <img src="/assets/landing/landing1.png" className="absolute right-0" />
                <img src="/assets/landing/landing2.png" className="absolute left-0" />
                <img src="/assets/landing/landing3.png" className="absolute left-0 bottom-0" />
                <img src="/assets/landing/landing4.png" className="absolute right-0 bottom-0" />
                <img src="/assets/landing/landing5.png" className="absolute left-0 bottom-0" />
                <img src="/assets/landing/landing6.png" className="absolute right-0 top-0" />
            </div>

            <h1 className="text-[64px] font-bold mb-6 text-black italianno-bold z-1">
                Create a Thought
            </h1>

            <div className="w-full max-w-2xl space-y-6 z-1">
                {/* Live Preview */}
                <div className="bg-white rounded-xl shadow-lg">
                    <div className="bg-[#FFDA5C] h-8 w-full rounded-t-xl"></div>
                    <div className="px-4 py-6 bg-[#FFF8ED] rounded-b-xl flex flex-col items-center text-center">
                        <div className="text-[48px] mb-2">{mood}</div>
                        <div className="text-gray-500 mb-2">{moodText[mood]}</div>
                        <div className="text-gray-900 font-bold text-lg whitespace-pre-wrap break-words mb-2 w-[90%]">
                            {thought || "Your thought will appear here..."}
                        </div>
                        <span className="text-[32px] text-gray-700 italianno-bold mt-2">
                            {formatDate(currentDate)}
                        </span>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#FFF8ED] rounded-xl shadow-md p-6 space-y-6"
                >
                    <textarea
                        value={thought}
                        onChange={(e) => setThought(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-700 text-gray-900 placeholder-gray-500"
                    />

                    <div>
                        <label className="block text-gray-800 font-medium mb-2 italiana-bold">
                            Mood
                        </label>
                        <select
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-gray-900 italiana-bold"
                        >
                            {Object.keys(moodText).map((emoji) => (
                                <option key={emoji} value={emoji}>
                                    {emoji} {moodText[emoji].replace("is feeling ", "")}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 font-semibold rounded-lg transition flex justify-center items-center italiana-bold ${loading
                            ? "bg-gray-700 text-white cursor-not-allowed"
                            : "bg-gray-900 text-white hover:bg-gray-800"
                            }`}
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Post Thought"
                        )}
                    </button>

                    {error && (
                        <p className="text-red-600 text-center font-medium mt-2">{error}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreatePage;
