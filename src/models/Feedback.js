import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.models.feedback || mongoose.model("feedback", feedbackSchema);