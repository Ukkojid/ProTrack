import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Submission from "@/models/Submission";
import SubmissionFeedback from "@/models/SubmissionFeedback";
import { checkRole } from "@/lib/checkRole";

export async function GET() {
  const { error, decoded } = await checkRole(["student"]);
  if (error) return error;

  await connectDB();

  // 1️⃣ student ke saare submissions
  const submissions = await Submission.find({ student: decoded.id }).select("_id");

  const submissionIds = submissions.map((s) => s._id);

  // 2️⃣ un submissions ke feedbacks
  const feedbacks = await SubmissionFeedback.find({
    submission: { $in: submissionIds },
  })
    .populate({
      path: "submission",
      populate: {
        path: "project",
        select: "title",
      },
    })
    .populate("faculty", "name email")
    .sort({ createdAt: -1 });

  return NextResponse.json(feedbacks);
}
