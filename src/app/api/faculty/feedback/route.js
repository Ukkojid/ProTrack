import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Feedback from "@/models/Feedback";

export async function POST(req) {
    await connectDB();

    const body = await req.json();
    const facultyId = req.headers.get("userid");

    const feedback = await Feedback.create({
        project: body.projectId,
        faculty: facultyId,
        message: body.message
    });

    return NextResponse.json(feedback, { status: 201 });
}