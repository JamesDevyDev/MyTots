import mongoose from "mongoose";
import User from "./User.Model";

const PostSchema = new mongoose.Schema({
    posterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    content: {
        type: "string",
        required: true
    },
    mood: {
        type: "string",
        required: true
    }

}, { timestamps: true })


const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)

export default Post