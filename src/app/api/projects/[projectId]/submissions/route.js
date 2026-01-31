import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Submission from "@/models/Submission"; // your submission model
import { checkRole } from "@/lib/checkRole";

export async function GET(req, context) {
  await connectDB();

  const { error } = await checkRole(["faculty", "student"]);
  if (error) return error;

  const { projectId } = await context.params;

  const submissions = await Submission.find({ project: projectId })
    .populate("student", "name email")
    .sort({ createdAt: -1 });

  return NextResponse.json(submissions);
}
