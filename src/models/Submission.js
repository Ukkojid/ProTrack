import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["document", "image", "video"],
        required: true,
    },
    fileName: {
        type: String,
    },
    url: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

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

        // NEW: multiple files (pdf, image, video)
        files: {
            type: [fileSchema],
            default: [],
        },

        status: {
            type: String,
            enum: ["submitted", "reviewed"],
            default: "submitted",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Submission ||
    mongoose.model("Submission", submissionSchema);
