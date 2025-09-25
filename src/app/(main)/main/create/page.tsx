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
    angry: "is feeling Angry",
    confused: "is feeling Confused",
    excited: "is feeling Excited",
    happy: "is feeling Happy",
    sad: "is feeling Sad",
    scared: "is feeling Scared",
};

const CreatePage = () => {
    const { addNewPost } = usePostStore();
    const { authUser, getAuthUserFunction } = useAuthStore();
    const router = useRouter();

    const [thought, setThought] = useState("");
    const [mood, setMood] = useState<keyof typeof moodText>("happy"); // ✅ default happy
    const [color, setColor] = useState("blue");
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
            color,
        });

        if (data?.error) {
            setError(data.error);
        } else {
            setThought("");
            setMood("happy");
            setColor("blue");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-8 px-4 pb-[100px] overflow-x-hidden">
            {/* background */}
            <img
                src="/assets/test/bg2.png"
                className="w-full h-full object-cover fixed top-0 left-0"
                alt="background"
            />

            <h1 className="text-[32px] font-bold mb-8 text-black bungee-regular z-4">
                Create Thought
            </h1>

            <div className="z-1 relative flex flex-col gap-10 items-center">
                {/* Live Preview (dynamic height) */}
                <div className="relative flex justify-center">
                    {/* Emotion image */}
                    <div className='w-[150px] h-[150px] absolute z-20 right-[-70px] md:right-[-80px] top-[-70px] overflow-hidden'>

                        <img
                            src={`/assets/emotions/${mood}.png`}
                            className="scale-[4] md:scale-[5] top-[30%] relative"
                            alt={mood}
                        />
                    </div>


                    {/* Card */}
                    <div
                        className={`w-[300px] md:w-[400px] min-h-[400px] rounded-xl relative z-10 p-5 flex flex-col bungee-regular ${color === "blue"
                            ? "bg-blue-300 text-black"
                            : color === "pink"
                                ? "bg-pink-300 text-black"
                                : color === "purple"
                                    ? "bg-purple-300 text-black"
                                    : color === "green"
                                        ? "bg-green-300 text-black"
                                        : color === "yellow"
                                            ? "bg-yellow-300 text-black"
                                            : color === "orange"
                                                ? "bg-orange-300 text-black"
                                                : color === "red"
                                                    ? "bg-red-300 text-black"
                                                    : color === "teal"
                                                        ? "bg-teal-300 text-black"
                                                        : color === "lime"
                                                            ? "bg-lime-300 text-black"
                                                            : color === "indigo"
                                                                ? "bg-indigo-300 text-black"
                                                                : "bg-gray-300 text-black"
                            }`}
                    >
                        {/* Header */}
                        <div
                            className={`flex items-center justify-between px-[20px] rounded-xl text-sm md:text-lg ${color === "blue"
                                ? "bg-blue-800 text-black"
                                : color === "pink"
                                    ? "bg-pink-800 text-black"
                                    : color === "purple"
                                        ? "bg-purple-800 text-black"
                                        : color === "green"
                                            ? "bg-green-800 text-black"
                                            : color === "yellow"
                                                ? "bg-yellow-800 text-black"
                                                : color === "orange"
                                                    ? "bg-orange-800 text-black"
                                                    : color === "red"
                                                        ? "bg-red-800 text-black"
                                                        : color === "teal"
                                                            ? "bg-teal-800 text-black"
                                                            : color === "lime"
                                                                ? "bg-lime-800 text-black"
                                                                : color === "indigo"
                                                                    ? "bg-indigo-800 text-black"
                                                                    : "bg-gray-800 text-black"
                                }`}
                        >
                            <div className="font-bold">{authUser?.username || "You"}</div>
                            <div className="font-bold capitalize">Feeling {mood}</div>
                        </div>

                        {/* Content */}
                        <div className="mt-6 md:mt-10 text-xs md:text-sm break-words whitespace-pre-wrap flex-1 overflow-y-auto">
                            {thought || "Your thought will appear here..."}
                        </div>

                        {/* Date */}
                        <div className="text-sm text-gray-700 mt-4 italic">
                            {formatDate(currentDate)}
                        </div>
                    </div>


                    {/* Shadow card */}
                    <div className="absolute left-[-5%] top-[5%] w-[300px] md:w-[400px] bg-black rounded-xl z-[-1] top-0 h-full"></div>
                </div>



                {/* Form with shadow (responsive) */}
                <div className="relative flex justify-center w-full">
                    {/* Actual Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="w-[300px] md:w-[400px] bg-orange-300 rounded-xl relative z-10 p-4 sm:p-6 text-black bungee-regular flex flex-col gap-6"
                    >
                        {/* Thought input */}
                        <textarea
                            value={thought}
                            maxLength={600}
                            onChange={(e) => setThought(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full min-h-[100px] md:min-h-[120px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-700 text-gray-900 placeholder-gray-500 text-base md:text-base"
                        />

                        {/* Mood select */}
                        <div>
                            <label className="block text-gray-800 font-medium mb-4 bungee-regular">
                                Mood
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {[
                                    { mood: "angry", img: "/assets/emotions/angry.png" },
                                    { mood: "confused", img: "/assets/emotions/confused.png" },
                                    { mood: "excited", img: "/assets/emotions/excited.png" },
                                    { mood: "happy", img: "/assets/emotions/happy.png" },
                                    { mood: "sad", img: "/assets/emotions/sad.png" },
                                    { mood: "scared", img: "/assets/emotions/scared.png" },
                                ].map(({ mood: moodOption, img }) => (
                                    <button
                                        type="button"
                                        key={moodOption}
                                        onClick={() => setMood(moodOption)}
                                        className={`flex flex-col items-center p-3 rounded-xl border overflow-hidden transition ${mood === moodOption
                                            ? "border-gray-900 bg-gray-100"
                                            : "border-gray-300"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={moodOption}
                                            className="h-10  object-contain scale-[4.7]"
                                        />
                                        <span className="mt-2 capitalize text-gray-800 text-xs sm:text-sm">
                                            {moodOption}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color select */}
                        <div>
                            <label className="block text-gray-800 font-medium mb-4 bungee-regular">
                                Card Color
                            </label>
                            <div className="flex gap-3 sm:gap-4 flex-wrap">
                                {[
                                    { key: "blue", class: "bg-blue-300" },
                                    { key: "pink", class: "bg-pink-300" },
                                    { key: "purple", class: "bg-purple-300" },
                                    { key: "green", class: "bg-green-300" },
                                    { key: "yellow", class: "bg-yellow-300" },
                                    { key: "orange", class: "bg-orange-300" },
                                    { key: "red", class: "bg-red-300" },
                                    { key: "teal", class: "bg-teal-300" },
                                    { key: "lime", class: "bg-lime-300" },
                                    { key: "indigo", class: "bg-indigo-300" },
                                ].map(({ key, class: bgClass }) => (
                                    <button
                                        type="button"
                                        key={key}
                                        onClick={() => setColor(key)}
                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border-4 transition ${bgClass} ${color === key ? "border-gray-900 scale-105" : "border-transparent"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>


                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 sm:py-3 font-semibold rounded-lg transition flex justify-center items-center bungee-regular ${loading
                                ? "bg-gray-700 text-white cursor-not-allowed"
                                : "bg-gray-900 text-white hover:bg-gray-800"
                                }`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 sm:w-6 sm:h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Post Thought"
                            )}
                        </button>

                        {error && (
                            <p className="text-red-600 text-center font-medium mt-2">{error}</p>
                        )}
                    </form>

                    {/* Shadow card */}
                    <div className="w-[300px] md:w-[400px] bg-black rounded-xl absolute left-[-5%] bottom-[-4%] z-0 h-full"></div>
                </div>




            </div>
        </div>
    );

};

export default CreatePage;
