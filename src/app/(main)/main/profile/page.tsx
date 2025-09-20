'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";

type Thought = {
    id: number;
    content: string;
    date: string;
    mood: string;
};

const ProfilePage = () => {
    const user = {
        username: "james_t",
        email: "james@example.com",
        joinDate: "Jan 2024",
        bio: "Loves journaling and building web apps 🚀",
    };

    const thoughts: Thought[] = [
        { id: 1, content: "Just finished my project, feeling productive!", date: "Sept 18, 2025 - 10:30 AM", mood: "😊" },
        { id: 2, content: "Today was tough, but I’m proud I got through it.", date: "Sept 17, 2025 - 8:15 PM", mood: "😔" },
    ];

    const [icons, setIcons] = useState<Record<number, 'pin' | 'clip'>>({});
    const [selectedThought, setSelectedThought] = useState<Thought | null>(null);

    useEffect(() => {
        const newIcons: Record<number, 'pin' | 'clip'> = {};
        thoughts.forEach(t => {
            newIcons[t.id] = Math.random() < 0.5 ? 'pin' : 'clip';
        });
        setIcons(newIcons);
    }, [thoughts]); // ✅ added dependency

    return (
        <div className="min-h-screen bg-[#FED6B4] flex flex-col items-center py-8 px-4">
            <h1 className="text-[64px] font-bold mb-6 text-black italianno-bold">Profile</h1>

            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center space-y-4 w-full max-w-3xl">
                <h1 className="text-3xl text-black italianno-bold">@{user.username}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-500 text-sm">Joined {user.joinDate}</p>
                <p className="text-gray-700 max-w-md">{user.bio}</p>
            </div>

            {/* User's Thoughts */}
            <div className="flex flex-col gap-8 w-full max-w-md mt-8">
                {thoughts.map(thought => (
                    <div
                        key={thought.id}
                        className="bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200 relative"
                        onClick={() => setSelectedThought(thought)}
                    >
                        {/* Top yellow header */}
                        <div className="bg-[#FFDA5C] h-8 w-full rounded-t-xl px-4 flex items-center relative">
                            {icons[thought.id] === 'pin' && (
                                <div className="w-[80px] h-[80px] absolute right-0 top-[-150%]">
                                    <Image
                                        src="/assets/browse/pin.webp"
                                        alt="Pin icon"
                                        width={80}
                                        height={80}
                                    />
                                </div>
                            )}
                            {icons[thought.id] === 'clip' && (
                                <div className="w-[150px] h-[150px] absolute right-0 top-[-85%]">
                                    <Image
                                        src="/assets/browse/clip.png"
                                        alt="Clip icon"
                                        width={150}
                                        height={150}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Thought preview */}
                        <div className="h-[200px] px-4 bg-[#FFF8ED] relative flex flex-col justify-center items-center rounded-b-xl">
                            <div className="text-[48px] mb-2">{thought.mood}</div>
                            <span className="text-[40px] text-gray-800 font-semibold italianno-bold">@{user.username}</span>
                            <span className="text-[32px] text-gray-700 italianno-bold mt-2">{thought.date}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <input type="checkbox" id="note-modal" className="modal-toggle" checked={!!selectedThought} readOnly />
            <label htmlFor="note-modal" className="modal bg-black/50">
                <label className="modal-box relative cursor-auto max-w-md p-0 bg-transparent">
                    {selectedThought && (
                        <div className="bg-white rounded-xl shadow-lg w-full relative">

                            {/* Top yellow header */}
                            <div className="bg-[#FFDA5C] h-16 w-full rounded-t-xl px-4 flex items-center justify-end relative">
                                <div className="self-end h-full flex items-center justify-center">
                                    <button
                                        className="text-[#A77D18] cursor-pointer text-center"
                                        onClick={() => setSelectedThought(null)}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="px-4 pb-6 bg-[#FFF8ED] rounded-b-xl flex flex-col items-center text-center">
                                <div className="text-[48px] mb-2">{selectedThought.mood}</div>

                                <div className="text-gray-500 mb-2">
                                    {(() => {
                                        switch (selectedThought.mood) {
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

                                <div className="text-gray-900 font-bold text-lg whitespace-pre-wrap break-words mb-4 w-[90%]">
                                    {selectedThought.content}
                                </div>

                                <div className="flex justify-between w-[90%] text-gray-500 text-sm">
                                    <span>@{user.username}</span>
                                    <span>{selectedThought.date}</span>
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
