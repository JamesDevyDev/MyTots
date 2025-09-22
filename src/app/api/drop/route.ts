import { connectDb } from "@/utils/utils/connectDb";
import Post from "@/utils/models/Post.Model";
import { NextResponse } from "next/server";

// DELETE /api/posts
export const GET = async () => {
    try {
        await connectDb();
        await Post.deleteMany({}); // ✅ delete all posts
        return NextResponse.json(
            { message: "All posts have been deleted successfully." },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: "Failed to delete posts", error: error.message },
            { status: 500 }
        );
    }
};
