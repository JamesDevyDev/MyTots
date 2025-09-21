import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

const User = mongoose.models.Users || mongoose.model('user', userSchema)
export default User;
