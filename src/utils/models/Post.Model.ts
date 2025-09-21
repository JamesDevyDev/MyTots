import mongoose from "mongoose";

import User from "./User.Model";

const PostSchema = new mongoose.Schema({
    posterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        required: true
    }

}, { timestamps: true })


const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)

export default Post