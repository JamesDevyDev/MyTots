'use client'

import React, { useEffect, useState } from "react";

type Thought = {
    id: number;
    content: string;
    date: string;
    mood: string;
};

const ProfilePage = () => {
    // Example user data
    const user = {
        username: "james_t",
        email: "james@example.com",
        joinDate: "Jan 2024",
        bio: "Loves journaling and building web apps 🚀",
    };

    // Example thoughts posted by the user
    const thoughts: Thought[] = [
        {
            id: 1,
            content: "Just finished my project, feeling productive!",
            date: "Sept 18, 2025 - 10:30 AM",
            mood: "😊",
        },
        {
            id: 2,
            content: "Today was tough, but I’m proud I got through it.",
            date: "Sept 17, 2025 - 8:15 PM",
            mood: "😔",
        },
    ];

    // Randomized icons for each thought (clip/pin style)
    const [icons, setIcons] = useState<Record<number, 'pin' | 'clip'>>({});

    useEffect(() => {
        const newIcons: Record<number, 'pin' | 'clip'> = {};
        thoughts.forEach((t) => {
            newIcons[t.id] = Math.random() < 0.5 ? 'pin' : 'clip';
        });
        setIcons(newIcons);
    }, []);

    return (
        <div className="min-h-screen bg-[#FED6B4] flex flex-col items-center py-8 px-4">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center space-y-4 w-md max-w-3xl">
                <h1 className="text-3xl text-black italianno-bold">@{user.username}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-500 text-sm">Joined {user.joinDate}</p>
                <p className="text-gray-700 max-w-md">{user.bio}</p>
            </div>

            {/* User's Thoughts */}
            <div className="flex flex-col gap-8 w-full max-w-md mt-8">
                {thoughts.length > 0 ? (
                    thoughts.map((thought) => (
                        <div
                            key={thought.id}
                            className="bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200 relative"
                        >
                            {/* Top yellow header */}
                            <div className="bg-[#FFDA5C] h-8 w-full rounded-t-xl px-4 flex items-center relative">
                                {icons[thought.id] === 'pin' ? (
                                    <div className=' w-[80px] h-[80px] absolute right-[0] top-[-150%] z-[20]'>
                                        <img src='/assets/browse/pin.webp' />
                                    </div>
                                ) : icons[thought.id] === 'clip' ? (
                                    <div className=' w-[150px] h-[150px] absolute right-[0%] top-[-85%] z-[20]'>
                                        <img src='/assets/browse/clip.png' />
                                    </div>
                                ) : null}
                            </div>

                            {/* Thought content */}
                            <div className="h-[160px] px-4 bg-[#FFF8ED] relative flex flex-col justify-center items-center rounded-b-xl">
                                {/* Mood emoji centered */}
                                <div className="text-[48px] mb-4">{thought.mood}</div>

                                {/* Date at the bottom */}
                                <span className="text-[32px] text-gray-700 italianno-bold ">
                                    {thought.date}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No thoughts posted yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
