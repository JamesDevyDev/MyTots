'use client'

import React, { useEffect, useState } from "react";

type Thought = {
    id: number;
    username: string;
    date: string;
    learning: string;
    mood: string;
};

const BrowsePage = () => {
    const thoughts: Thought[] = [
        {
            id: 1,
            username: "JohnDoe",
            date: "Sept 18, 2025 - 10:30 AM",
            learning: "Today I realized consistency is more important than motivation. ",
            mood: "😊",
        },
        {
            id: 2,
            username: "JaneSmith",
            date: "Sept 18, 2025 - 8:45 PM",
            learning: "Patience pays off in the long run.",
            mood: "😌",
        },
    ];

    const [selectedNote, setSelectedNote] = useState<Thought | null>(null);

    // State to store the randomized icons after mount
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
            <h1 className="text-[64px] font-bold mb-6 text-black italianno-bold">Browse Thoughts</h1>

            {/* Notes column */}
            <div className="flex flex-col gap-12 w-full max-w-md mx-auto">
                {thoughts.map((thought) => (
                    <div
                        key={thought.id}
                        className="bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-lg transition-shadow duration-200  relative"
                        onClick={() => setSelectedNote(thought)}
                    >
                        {/* Top yellow header */}
                        <div className="bg-[#FFDA5C] h-8 w-full rounded-t-xl px-4 flex items-center relative">
                            {icons[thought.id] === 'pin' ? (
                                <div className=' w-[80px] h-[80px] absolute right-[0] top-[-150%]'>
                                    <img src='/assets/browse/pin.webp' />
                                </div>
                            ) : icons[thought.id] === 'clip' ? (
                                <div className=' w-[150px] h-[150px] absolute right-[0%] top-[-85%]'>
                                    <img src='/assets/browse/clip.png' />
                                </div>
                            ) : null}
                        </div>

                        {/* Empty preview body */}
                        <div className="h-[200px] px-4 bg-[#FFF8ED] relative flex flex-col justify-center items-center rounded-b-xl">
                            {/* Mood emoji */}
                            <div className="text-[48px] mb-2">{thought.mood}</div>

                            <span className="text-[40px] text-gray-800 font-semibold italianno-bold">
                                {thought.username}
                            </span>
                            <span className="text-[32px] text-gray-700 italianno-bold mt-2">
                                {thought.date}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* DaisyUI Modal */}
            <input
                type="checkbox"
                id="note-modal"
                className="modal-toggle"
                checked={!!selectedNote}
                readOnly
            />
            <label htmlFor="note-modal" className="modal bg-black/50">
                <label
                    className="modal-box relative cursor-auto max-w-md p-0 bg-transparent"
                    htmlFor=""
                >
                    {selectedNote && (
                        <div className="bg-white rounded-xl shadow-lg w-full relative">

                            {/* Top yellow header */}
                            <div className="bg-[#FFDA5C] h-16 w-full rounded-t-xl px-4 flex items-center justify-end relative">
                                {/* Close button */}
                                <div className="self-end h-[100%] flex items-center justify-center">
                                    <button
                                        className="text-[#A77D18] cursor-pointer text-center"
                                        onClick={() => setSelectedNote(null)}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="px-4 pb-6 bg-[#FFF8ED] rounded-b-xl flex flex-col items-center text-center">

                                {/* Mood emoji */}
                                <div className="text-[48px] mb-2">{selectedNote.mood}</div>

                                {/* Dynamic emotion label */}
                                <div className="text-gray-500 mb-2">
                                    {(() => {
                                        switch (selectedNote.mood) {
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

                                {/* Note content */}
                                <div className="text-gray-900 font-bold text-lg whitespace-pre-wrap break-words mb-4 w-[90%]">
                                    {selectedNote.learning}
                                </div>

                                {/* Bottom info */}
                                <div className="flex justify-between w-[90%] text-gray-500 text-sm">
                                    <span>{selectedNote.username}</span>
                                    <span>{selectedNote.date}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </label>
            </label>


        </div>
    );
};

export default BrowsePage;
