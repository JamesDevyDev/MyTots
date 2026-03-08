'use client';
import { MessageCircle } from 'lucide-react';
import React, { useEffect, useRef, useState, useCallback } from "react";
import CommentsModal from '@/components/CommentsModal';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
        .toLocaleString("en-US", {
            month: "short", day: "numeric", year: "numeric",
            hour: "numeric", minute: "2-digit", hour12: true,
        })
        .replace(",", "");
};

type Thought = {
    _id: string;
    posterId: { _id: string; username: string };
    content: string;
    mood: "angry" | "confused" | "excited" | "happy" | "sad" | "scared";
    color: "blue" | "pink" | "purple" | "green" | "yellow" | "orange" | "red" | "teal" | "lime" | "indigo" | "gray";
    createdAt: string;
    updatedAt: string;
};

const colorMap: Record<string, { bg: string; header: string }> = {
    blue: { bg: "bg-blue-300 text-black", header: "bg-blue-800 text-black" },
    pink: { bg: "bg-pink-300 text-black", header: "bg-pink-800 text-black" },
    purple: { bg: "bg-purple-300 text-black", header: "bg-purple-800 text-black" },
    green: { bg: "bg-green-300 text-black", header: "bg-green-800 text-black" },
    yellow: { bg: "bg-yellow-300 text-black", header: "bg-yellow-800 text-black" },
    orange: { bg: "bg-orange-300 text-black", header: "bg-orange-800 text-black" },
    red: { bg: "bg-red-300 text-black", header: "bg-red-800 text-black" },
    teal: { bg: "bg-teal-300 text-black", header: "bg-teal-800 text-black" },
    lime: { bg: "bg-lime-300 text-black", header: "bg-lime-800 text-black" },
    indigo: { bg: "bg-indigo-300 text-black", header: "bg-indigo-800 text-black" },
    gray: { bg: "bg-gray-300 text-black", header: "bg-gray-800 text-black" },
};

const LIMIT = 10;

const BrowsePage = () => {
    const [posts, setPosts] = useState<Thought[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Thought | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    // Prevents double-fetching the same page in strict mode / re-renders
    const isFetchingRef = useRef(false);

    const loadPosts = useCallback(async (pageToLoad: number) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;
        setLoading(true);

        try {
            const res = await fetch(`/api/post?page=${pageToLoad}&limit=${LIMIT}`);
            const data = await res.json();

            const newPosts: Thought[] = data?.posts ?? [];
            const more: boolean = data?.hasMore ?? false;

            setPosts(prev => pageToLoad === 1 ? newPosts : [...prev, ...newPosts]);
            setHasMore(more);
        } catch (err) {
            console.error("Failed to load posts:", err);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, []);

    // Initial load
    useEffect(() => {
        loadPosts(1);
    }, [loadPosts]);

    // Infinite scroll observer
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isFetchingRef.current) {
                    setPage(prev => {
                        const next = prev + 1;
                        loadPosts(next);
                        return next;
                    });
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore, loadPosts]);

    return (
        <div className="min-h-screen flex flex-col items-center py-8 px-4 pb-[100px] overflow-x-hidden">
            <img
                src="/assets/test/bg1.png"
                className="w-full h-full object-cover fixed top-0 left-0"
                alt="background"
            />

            <h1 className="text-[32px] font-bold mb-8 text-black bungee-regular z-4">
                Browse Thoughts
            </h1>

            <div className="flex flex-col gap-20 max-w-md md:max-w-2xl z-4">
                {posts.length === 0 && !loading && (
                    <p className="text-gray-700 bungee-regular">No thoughts yet.</p>
                )}

                {posts.map((t: Thought) => {
                    const colors = colorMap[t.color] || colorMap.gray;
                    return (
                        <div key={t._id} className="w-[300px] md:w-[400px]">
                            <div className="relative w-full z-5">
                                <div className="absolute left-[-5%] top-[20px] w-full bg-black rounded-xl z-0 h-full" />

                                <div className='w-[150px] h-[150px] absolute z-20 right-[-70px] md:right-[-80px] top-[-70px] overflow-hidden'>
                                    <img
                                        src={`/assets/emotions/${t.mood}.png`}
                                        className="scale-[4] md:scale-[5] top-[30%] relative"
                                        alt={t.mood}
                                    />
                                </div>

                                <div className={`relative z-10 w-full rounded-xl p-5 flex flex-col bungee-regular ${colors.bg}`}>
                                    <div className={`flex items-center justify-between px-[20px] rounded-xl text-sm md:text-lg ${colors.header}`}>
                                        <div className="font-bold">{t.posterId?.username || "You"}</div>
                                        <div className="font-bold capitalize">Feeling {t.mood}</div>
                                    </div>

                                    <div className="mt-6 md:mt-10 text-xs md:text-sm break-words whitespace-pre-wrap">
                                        {t.content}
                                    </div>

                                    <div className='w-full h-[50px] flex items-center justify-between'>
                                        <div className="text-sm text-gray-700 mt-4 italic">{formatDate(t.createdAt)}</div>
                                        <div className='h-full flex items-center justify-center'>
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
                    );
                })}

                {/* Sentinel */}
                <div ref={sentinelRef} className="w-full flex justify-center py-4">
                    {loading && <p className="text-gray-700 bungee-regular">Loading thoughts...</p>}
                    {!hasMore && posts.length > 0 && (
                        <p className="text-gray-500 bungee-regular text-sm">You've seen all thoughts ✨</p>
                    )}
                </div>
            </div>

            <CommentsModal post={selectedPost} />
        </div>
    );
};

export default BrowsePage;