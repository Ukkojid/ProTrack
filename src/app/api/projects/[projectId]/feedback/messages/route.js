import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import Project from "@/models/Project";
import jwt, { decode } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { projectId } = await params;

  const project = await Project.findById(projectId);
  if (!project) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  const allowed =
    project.students.includes(decoded.id) ||
    project.faculty?.toString() === decoded.id;

  if (!allowed) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const messages = await Message.find({ project: projectId })
    .populate("sender", "name")
    .sort({ createdAt: 1 });

  return NextResponse.json(messages);
}

export async function POST(req, { params }) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { projectId } = await params;
  const { text } = await req.json();

  const project = await Project.findById(projectId);

  const allowed = 
  project.students.some((s) => s._id.toString() === decoded.id) || 
  project.faculty.toString() === decoded.id;

  if(!allowed) {
    return NextResponse.json({ message: "Forbidden" }, {status: 403 });
  }

  const message = await Message.create({
    project: projectId,
    sender: decoded.id,
    text,
  });

  return NextResponse.json(message, { status: 201 });
}
