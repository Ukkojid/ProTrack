import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Feedback from "@/models/Feedback";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const feedbacks = await Feedback.find({
    students: decoded.id,
  }).populate("faculty", "name email");

  return NextResponse.json(feedbacks);
}

