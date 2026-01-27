import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Submission from "@/models/Submission";
import Project from "@/models/Project";
import { checkRole } from "@/lib/checkRole";

export async function GET() {
  const result = await checkRole(["faculty"]); // ya faculty / admin
if (result.error) return result.error;

const { decoded } = result;

  await connectDB();

  const facultyId = decoded.id;

  /**
   * Step 1: faculty ke projects nikal ta he
   */
  const projects = await Project.find({ faculty: facultyId }).select("_id");
  const projectIds = projects.map((p) => p._id);

  /**
   * Step 2: un projects ke submissions nikalo
   */
  const submissions = await Submission.find({
    project: { $in: projectIds },
  })
    .populate("student", "name email")
    .populate("project", "title")
    .sort({ createdAt: -1 });

  return NextResponse.json(submissions);
}
