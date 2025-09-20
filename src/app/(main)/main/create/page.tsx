'use client'

import React, { useState } from "react";

// Function to format date to "Sept 18, 2025 - 10:30 AM"
const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).replace(",", "") // optional, to remove extra comma
};

const CreatePage = () => {
    const [thought, setThought] = useState("");
    const [mood, setMood] = useState("😊");
    const currentDate = new Date();

    return (
        <div className="w-full min-h-screen bg-[#FED6B4] flex flex-col items-center px-4 py-8">
            {/* Page Title */}
            <h1 className="text-[64px] font-bold mb-6 text-black italianno-bold">Create a Thought</h1>

            {/* Thought Form with Live Preview Card */}
            <div className="w-full max-w-2xl space-y-6">

                {/* Live Preview Card */}
                <div className="bg-white rounded-xl shadow-lg w-full relative">
                    {/* Top yellow header */}
                    <div className="bg-[#FFDA5C] h-8 w-full rounded-t-xl px-4 flex items-center relative"></div>

                    {/* Card Body */}
                    <div className="px-4 py-6 bg-[#FFF8ED] rounded-b-xl flex flex-col items-center text-center">
                        {/* Mood emoji */}
                        <div className="text-[48px] mb-2">{mood}</div>

                        {/* Dynamic emotion label */}
                        <div className="text-gray-500 mb-2">
                            {(() => {
                                switch (mood) {
                                    case '😊': return 'is feeling Happy';
                                    case '😔': return 'is feeling Sad';
                                    case '😡': return 'is feeling Angry';
                                    case '😌': return 'is feeling Relaxed';
                                    case '🤔': return 'is feeling Thoughtful';
                                    case '😞': return 'is feeling Disappointed';
                                    default: return 'is feeling Neutral';
                                }
                            })()}
                        </div>

                        {/* Thought content */}
                        <div className="text-gray-900 font-bold text-lg whitespace-pre-wrap break-words mb-2 w-[90%]">
                            {thought || "Your thought will appear here..."}
                        </div>

                        {/* Formatted Current Date */}
                        <span className="text-[32px] text-gray-700 italianno-bold mt-2">
                            {formatDate(currentDate)}
                        </span>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-[#FFF8ED] rounded-xl shadow-md p-6 space-y-6">
                    <form className="space-y-4">
                        <textarea
                            value={thought}
                            onChange={(e) => setThought(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-700 text-gray-900 placeholder-gray-500 cursor-pointer"
                        />

                        {/* Mood selector */}
                        <div>
                            <label className="block text-gray-800 font-medium mb-2 italiana-bold">
                                Mood
                            </label>
                            <select
                                value={mood}
                                onChange={(e) => setMood(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-gray-900 cursor-pointer italiana-bold"
                            >
                                <option value="😊">😊 Happy</option>
                                <option value="😔">😔 Sad</option>
                                <option value="😡">😡 Angry</option>
                                <option value="😌">😌 Relaxed</option>
                                <option value="🤔">🤔 Thoughtful</option>
                                <option value="😞">😞 Disappointed</option>
                            </select>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition cursor-pointer italiana-bold"
                        >
                            Post Thought
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
