import mongoose from "mongoose";

const StudentProfileSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  name: String,
  photo: String,
  branch: String,
  year: String,
  bio: String,
  skills: [String],
  linkedinUrl: String,
  githubUrl: String,
  resumeUrl: String
}, { timestamps: true });

export default mongoose.models.StudentProfile ||
mongoose.model("StudentProfile", StudentProfileSchema);
