import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,

    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    status: {
        type: String,
        default: "submitted"
    }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", projectSchema);