import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function GET(req) {
    await connectDB();

    const facultyId = req.headers.get("userid");

    const projects = await Project.find({ faculty: facultyId })
        .populate("student", "name email");

    return NextResponse.json(projects);
}