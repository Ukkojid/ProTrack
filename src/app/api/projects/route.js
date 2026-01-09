import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function POST(req) {
    await connectDB();

    const body = await req.json();
    const userId = req.headers.get("userid");

    const project = await Project.create({
        title: body.title,
        description: body.description,
        student: userId
    });

    return NextResponse.json(project, { status: 201 });
}

