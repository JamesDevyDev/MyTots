'use client'

import React, { useState } from "react";

const Page = () => {
    const [learnings, setLearnings] = useState("");
    const [mood, setMood] = useState("");
    const [tomorrow, setTomorrow] = useState("");

    return (
        <div className="w-[100vw] h-[100vh] bg-[#E5E5E5] flex flex-col items-center p-6 overflow-auto">
            {/* Learnings Section */}
            <h2 className="italic text-xl mb-2 self-start">Learnings from the day</h2>
            <textarea
                value={learnings}
                onChange={(e) => setLearnings(e.target.value)}
                placeholder="Type your learnings here..."
                className="w-full max-w-2xl h-32 p-3 rounded-xl shadow-md resize-none outline-none"
            />

            {/* Mood Section */}
            <h2 className="italic text-xl mt-6 mb-2 self-start">Your Mood Today</h2>
            <div className="flex gap-4">
                {["😊", "😐", "😔"].map((m, i) => (
                    <button
                        key={i}
                        onClick={() => setMood(m)}
                        className={`w-20 h-20 flex items-center justify-center rounded-xl shadow-md text-3xl ${mood === m ? "bg-blue-300" : "bg-gray-200"
                            }`}
                    >
                        {m}
                    </button>
                ))}
            </div>

            {/* Tomorrow Section */}
            <h2 className="italic text-xl mt-6 mb-2 self-start">Getting Ready for Tomorrow</h2>
            <textarea
                value={tomorrow}
                onChange={(e) => setTomorrow(e.target.value)}
                placeholder="Write down what you want to prepare for tomorrow..."
                className="w-full max-w-2xl h-28 p-3 rounded-xl shadow-md resize-none outline-none"
            />
        </div>
    );
};

export default Page;
