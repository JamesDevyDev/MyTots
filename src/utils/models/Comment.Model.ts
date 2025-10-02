import mongoose from "mongoose";
import "./User.Model";
import "./Post.Model";

const CommentSchema = new mongoose.Schema({
    // Kung sino yung mag cocomment
    CommenterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // ID nung mismong post
    PostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    // Comment na ilalagay  
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)

export default Comment