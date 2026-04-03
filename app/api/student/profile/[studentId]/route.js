import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import StudentProfile from "@/models/StudentProfile";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { studentId } = await params;



    if (!studentId) {
      return NextResponse.json({ error: "Student ID missing" }, { status: 400 });
    }

    const profile = await StudentProfile.findOne({
      studentId: new mongoose.Types.ObjectId(studentId)
    });


    if (!profile) {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);

  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}