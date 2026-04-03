import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SubmissionFeedback from "@/models/SubmissionFeedback";
import { checkRole } from "@/lib/checkRole";
import Submission from "@/models/Submission";

export async function GET() {
  await connectDB();

  const { error, decoded } = await checkRole(["faculty"]);
  if (error) return error;

  const feedbacks = await SubmissionFeedback.find({ faculty: decoded.id })
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

export async function POST(req) {
  await connectDB();

  const { error, decoded } = await checkRole(["faculty"]);
  if (error) return error;

  const body = await req.json();
  const { submissionId, message, score } = body;

  if (!submissionId || !message) {
    return NextResponse.json(
      { message: "submissionId and message required" },
      { status: 400 }
    );
  }

  const feedback = await SubmissionFeedback.create({
    submission: submissionId,
    faculty: decoded.id,
    message,
    score,
  });

  return NextResponse.json(feedback, { status: 201 });
}
