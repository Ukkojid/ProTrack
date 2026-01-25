import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import Feedback from "@/models/Feedback";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req, { params }) {
  await connectDB();

  const { projectId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const project = await Project.findById(projectId)
    .populate("students", "name email")
    .populate("faculty", "name email");

  if (!project) return NextResponse.json({ message: "Project not found" }, { status: 404 });

  const allowed =
    project.students?.some((s) => s._id.toString() === decoded.id) ||
    project.faculty?._id.toString() === decoded.id;

  if (!allowed) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const feedback = await Feedback.findOne({ project: projectId })
    .populate("faculty", "name email");

  return NextResponse.json(feedback || {});
}


export async function POST(req, { params }) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { projectId } = params; // no await

  const project = await Project.findById(projectId);
  if (!project) return NextResponse.json({ message: "Project not found" }, { status: 404 });

  const allowed =
    project.students?.some((s) => s._id.toString() === decoded.id) ||
    project.faculty?.toString() === decoded.id;

  if (!allowed) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  if (project.faculty?.toString() !== decoded.id) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const feedback = await Feedback.findOneAndUpdate(
    { project: projectId },
    {
      project: projectId,
      faculty: decoded.id,
      message: body.message,
      status: body.status,
      marks: body.marks,
    },
    { upsert: true, new: true }
  );

  return NextResponse.json(feedback, { status: 201 });
}
