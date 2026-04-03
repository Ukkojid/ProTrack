import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { checkRole } from "@/lib/checkRole";

export async function GET(req, context) {
  await connectDB();

  const { error, decoded } = await checkRole(["student", "faculty"]);
  if (error) return error;

  const { projectId } = await context.params;

  const project = await Project.findById(projectId)
    .populate("students", "name email")
    .populate("faculty", "name email");



  if (!project) {
    return NextResponse.json(
      { message: "Project not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(project);
}
