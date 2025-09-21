import { connectDb } from "@/utils/utils/connectDb";
import { NextResponse } from "next/server";
import Post from "@/utils/models/Post.Model";
import User from "@/utils/models/User.Model";

//Get All post
export const GET = async () => {
    try {
        await connectDb();

        // Fetch all posts, populated with user info and sorted by createdAt in descending order
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
        const { posterId, content, mood } = body;

        // Find latest post by this user
        const latestPost = await Post.findOne({ posterId }).sort({ createdAt: -1 });

        if (latestPost) {
            const now = new Date();
            const diffInSeconds =
                (now.getTime() - new Date(latestPost.createdAt).getTime()) / 1000;

            if (diffInSeconds < 5) {
                return NextResponse.json(
                    {
                        error: `Please wait ${Math.ceil(
                            5 - diffInSeconds
                        )} more seconds before posting again.`,
                    },
                    { status: 429 } // Too Many Requests
                );
            }
        }

        // Create new post
        const newPost = new Post({
            posterId,
            content,
            mood,
        });

        await newPost.save();
        return NextResponse.json(newPost);
    } catch (error) {
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
};