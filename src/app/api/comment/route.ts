import { NextResponse } from "next/server";
import Comment from "@/utils/models/Comment.Model";
import Post from "@/utils/models/Post.Model";
import { connectDb } from "@/utils/utils/connectDb";

// ✅ GET request example
export const PATCH = async (req: Request) => {
    try {
        await connectDb();

        const { PostId } = await req.json();

        const comments = await Comment.find({ PostId })
            .populate("CommenterId", "username") 
            .sort({ createdAt: -1 }); 

        return NextResponse.json(comments);

    } catch (error) {
        console.error("PATCH error:", error);
        return NextResponse.json(
            { success: false, error: "Invalid request" },
            { status: 400 }
        );
    }
};


// Add Comment to a post.
export const POST = async (req: Request) => {
    try {
        await connectDb();
        const body = await req.json();
        const { CommenterId, PostId, comment } = body;

        if (typeof comment !== "string" || comment.length > 500) {
            return NextResponse.json(
                { error: "Comment must be 500 characters or less." },
                { status: 400 }
            );
        }

        const newComment = new Comment({ CommenterId, PostId, comment });
        await newComment.save();
        return NextResponse.json(newComment);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
    }
};