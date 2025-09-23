'use client';

import Link from "next/link";

export default function Home() {
  // List of moods with fixed positions, rotations, and sizes
  const scatteredMoods = [
    { mood: "angry", img: "/assets/emotions/angry.png", top: "15%", left: "20%", size: 100, rotate: "-10deg" },
    { mood: "confused", img: "/assets/emotions/confused.png", top: "20%", left: "70%", size: 100, rotate: "15deg" },
    { mood: "excited", img: "/assets/emotions/excited.png", top: "50%", left: "15%", size: 100, rotate: "-5deg" },
    { mood: "happy", img: "/assets/emotions/happy.png", top: "60%", left: "65%", size: 100, rotate: "10deg" },
    { mood: "sad", img: "/assets/emotions/sad.png", top: "75%", left: "30%", size: 100, rotate: "-15deg" },
    { mood: "scared", img: "/assets/emotions/scared.png", top: "10%", left: "45%", size: 100, rotate: "5deg" },
  ];

  return (
    <div className="w-[100vw] h-[100vh] bg-[#E5E5E5] relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <img
        src="/assets/test/bg1.png"
        className="w-full h-full object-cover fixed top-0 left-0"
        alt="background"
      />

      {/* Static scattered emotions */}
      {scatteredMoods.map((m, idx) => (
        <img
          key={idx}
          src={m.img}
          alt={m.mood}
          style={{
            position: "absolute",
            top: m.top,
            left: m.left,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `rotate(${m.rotate})`,
            opacity: 0.3,
            scale: 10
          }}
        />
      ))}

      {/* Content */}
      <div className="flex flex-col items-center text-center space-y-6 px-4 relative z-10">
        <h1
          className="bungee-regular text-[64px] text-white"
          style={{
            textShadow: `
      -5px -5px 0 #000,
       5px -5px 0 #000,
      -5px  5px 0 #000,
       5px  5px 0 #000
    `,
          }}
        >
          MyTots
        </h1>

        <p
          className="bungee-regular max-w-xl text-white  text-sm md:text-[32px]"
          style={{
            textShadow: `
      -3px -3px 0 #000,
       3px -3px 0 #000,
      -3px  3px 0 #000,
       3px  3px 0 #000
    `,
          }}
        >
          A journaling network where you can share your thoughts,
          read others’ stories, and connect through shared experiences.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition bungee-regular cursor-pointer"
          >
            Login
          </Link>
          <Link
            href="/main/browse"
            className="px-6 py-3 bg-white text-black border border-black rounded-xl hover:bg-gray-100 transition bungee-regular cursor-pointer"
          >
            Start Viewing Other Thoughts
          </Link>
        </div>
      </div>
    </div>
  );
}
