import { connectDb } from "@/utils/utils/connectDb";
import { NextResponse } from "next/server";
import Post from "@/utils/models/Post.Model";
import "@/utils/models/User.Model";

//Get All post
export const GET = async () => {
    try {
        await connectDb();

        const allPosts = await Post.find()
            .populate("posterId", "username")
            .sort({ createdAt: -1 });  // Sort by createdAt in descending order

        return NextResponse.json(allPosts);
    } catch (error) {
        console.error(error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
};


//Post a Thought
export const POST = async (req: Request) => {
    try {
        await connectDb();
        const body = await req.json();
        const { posterId, content, mood, color } = body;

        // Rate limit: 5 seconds between posts
        const latestPost = await Post.findOne({ posterId }).sort({ createdAt: -1 });
        if (latestPost) {
            const diffInSeconds = (new Date().getTime() - new Date(latestPost.createdAt).getTime()) / 1000;
            if (diffInSeconds < 5) {
                return NextResponse.json(
                    { error: `Please wait ${Math.ceil(5 - diffInSeconds)} more seconds before posting again.` },
                    { status: 429 }
                );
            }
        }
      
        const newPost = new Post({ posterId, content, mood, color });
        await newPost.save();

        // Populate posterId for frontend
        await newPost.populate("posterId", "username");

        return NextResponse.json(newPost);
    } catch (error) {
        console.error(error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
};