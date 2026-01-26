import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { checkRole } from "@/lib/checkRole";
import SubmissionFeedback from "@/models/SubmissionFeedback";

export async function POST(req) {
  const result = await checkRole(["faculty"]);
if (result.error) return result.error;

const { decoded } = result;


  await connectDB();

  const { submissionId, message, score } = await req.json();

  if (!submissionId || !message) {
    return NextResponse.json(
      { message: "Submission and message required" },
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
