import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Submission from "@/models/Submission";
import { checkRole } from "@/lib/checkRole";

export async function POST(req) {
  const result = await checkRole(["student"]); // ya faculty / admin
if (result.error) return result.error;

const { decoded } = result;



  await connectDB();

  const body = await req.json();
  const { projectId, week, description, githubLink, videoUrl } = body;

  const exists = await Submission.findOne({
    student: decoded.id,
    project: projectId,
    week,
  });

  if (exists) {
    return NextResponse.json(
      { message: "Already submitted for this week" },
      { status: 400 }
    );
  }

  const submission = await Submission.create({
    student: decoded.id,
    project: projectId,
    week,
    description,
    githubLink,
    videoUrl,
  });

  return NextResponse.json(submission, { status: 201 });
}
