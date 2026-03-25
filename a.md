import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["student", "faculty", "admin"],
        default: "student"
    }
})


export default mongoose.models.User || mongoose.model("User", userSchema); 