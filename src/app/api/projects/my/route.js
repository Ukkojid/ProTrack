import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function GET(req) {
    await connectDB();

    const userId = req.headers.get("userid");

    const projects = await Project.find({ student: userId });

    return NextResponse.json(projects);
}