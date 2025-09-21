import Link from "next/link";

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#E5E5E5] relative overflow-hidden flex items-center justify-center">
      {/* Design background */}
      <div className="fixed inset-0 z-0">
        <img src="/assets/landing/landing1.png" className="absolute right-0" />
        <img src="/assets/landing/landing2.png" className="absolute left-0" />
        <img src="/assets/landing/landing3.png" className="absolute left-[-5px] bottom-0" />
        <img src="/assets/landing/landing4.png" className="absolute right-0 bottom-0" />
        <img src="/assets/landing/landing5.png" className="absolute left-0 bottom-0" />
        <img src="/assets/landing/landing6.png" className="absolute right-0 top-0" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center space-y-6 px-4 relative z-10">
        {/* Title */}
        <h1 className="italiana-bold text-[64px] text-black">MyTots</h1>

        {/* Description */}
        <p className="italiana-bold max-w-xl text-black text-[32px]">
          A journaling network where you can share your thoughts,
          read others’ stories, and connect through shared experiences.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition italiana-bold cursor-pointer"
          >
            Login
          </Link>
          <Link
            href="/main/browse"
            className="px-6 py-3 bg-white text-black border border-black rounded-xl hover:bg-gray-100 transition italiana-bold cursor-pointer"
          >
            Start Viewing Other Thoughts
          </Link>
        </div>
      </div>
    </div>
  );
}
