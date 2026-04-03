import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Submission from "@/models/Submission";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== "faculty") {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  const submissions = await Submission.find({
    projectId: params.projectId,
  }).populate("studentId", "name email");

  return NextResponse.json(submissions);
}
