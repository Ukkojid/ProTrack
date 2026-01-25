import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },

        week: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        githubLink: {
            type: String,
        },
        
        videoUrl: {
            type: String,
        },

        fileUrl: {
            type: String,
        },

        status: {
            type: String,
            enum: ["submitted", "reviewed"],
            default: "submitted",
        },
    }, 
    { timestamps: true }
);


export default mongoose.models.Submission || mongoose.model("Submission", submissionSchema);