// app/404.tsx  (if using App Router)
// or pages/404.tsx (if using Pages Router)

'use client';

import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#FED6B4] px-4">
            <h1 className="text-[20vw] font-bold text-black italianno-bold">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
            <p className="text-gray-700 mb-6 text-center">
                The page you are looking for might have been removed or does not exist.
            </p>
            <Link href="/" className="px-6 py-3 bg-[#FFDA5C] text-black font-bold rounded-xl hover:bg-yellow-400 transition">
                Go Back Home
            </Link>
        </div>
    );
};

export default Custom404;
