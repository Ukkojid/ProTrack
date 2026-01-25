import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Feedback from "@/models/Feedback";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { checkRole } from "@/lib/checkRole";

export async function POST(req) {
    const roleError = checkRole(req, ["faculty"]);
    if (roleError) return roleError;
    

    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const facultyId = decoded.id;

    const body = await req.json();

    const feedback = await Feedback.create({
        project: body.projectId,
        faculty: facultyId,
        message: body.message
    });

    return NextResponse.json(feedback, { status: 201 });
}
