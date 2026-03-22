import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["document", "image", "video"],
    required: true,
  },
  fileName: String,
  url: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  content: String,

  files: {
    type: [fileSchema],
    default: [],
  },

}, { timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

// import mongoose from "mongoose";
// import mongoose from "mongoose";
// import mongoose from "mongoose";
// import mongoose from "mongoose";

// const CommentSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   text: String
// }, { timestamps: true });

// const PostSchema = new mongoose.Schema({

//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },

//   content: {
//     type: String,
//     trim: true
//   },

//   images: String,   // multiple images

//   video: String,      // video url

//   file: String,       // pdf / document

//   projectId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Project"
//   },



