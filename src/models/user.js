import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true
    }
})


export const User = mongoose.models.User || mongoose.model("User", userSchema); 