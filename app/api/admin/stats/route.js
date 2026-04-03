import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Project from "@/models/Project";
import Submission from "@/models/Submission";
import SubmissionFeedback from "@/models/SubmissionFeedback";
import { checkRole } from "@/lib/checkRole";

export async function GET() {
  await connectDB();

  const { error } = await checkRole(["admin"]);
  if (error) return error;

  const students = await User.countDocuments({ role: "student" });
  const faculty = await User.countDocuments({ role: "faculty" });
  const admins = await User.countDocuments({ role: "admin" });

  const ongoingProjects = await Project.countDocuments({ status: "ongoing" });
  const completedProjects = await Project.countDocuments({ status: "completed" });
  const pendingProjects = await Project.countDocuments({ status: "pending" });

  const submissions = await Submission.countDocuments();
  const feedbacks = await SubmissionFeedback.countDocuments();

  return NextResponse.json({
    students,
    faculty,
    admins,
    ongoingProjects,
    completedProjects,
    pendingProjects,
    submissions,
    feedbacks,
    activeToday: students + faculty
  });
}
