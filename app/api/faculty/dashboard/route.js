import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import SubmissionFeedback from "@/models/SubmissionFeedback";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const facultyId = decoded.id;

  // 🔹 Total projects under this faculty
  const projects = await Project.find({ faculty: facultyId });

  const totalProjects = projects.length;

  // 🔹 Unique students count
  const studentSet = new Set();
  projects.forEach((p) => {
    p.students.forEach((s) => studentSet.add(s.toString()));
  });

  const totalStudents = studentSet.size;

  // 🔹 Pending feedback count
  const pendingFeedback = await SubmissionFeedback.countDocuments({
    faculty: facultyId,
    status: "pending",
  });

  return NextResponse.json({
    totalStudents,
    totalProjects,
    pendingFeedback,
  });
}
