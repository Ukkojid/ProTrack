import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: String,

    fileUrl: String,
    fileType: String, // image, pdf, video
  },
  { timestamps: true }
);


export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
