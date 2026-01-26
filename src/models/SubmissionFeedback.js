import mongoose from "mongoose";

const submissionFeedbackSchema = new mongoose.Schema(
  {
    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      required: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    score: {
      type: Number, // optional
    },
  },
  { timestamps: true }
);

export default mongoose.models.SubmissionFeedback ||
  mongoose.model("SubmissionFeedback", submissionFeedbackSchema);
