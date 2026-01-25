import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { checkRole } from "@/lib/checkRole";
import Submission from "@/models/Submission";
import Message from "@/models/Message";


export async function GET() {
    const roleError = checkRole(null, ["faculty"]);
    if(roleError) return roleError;

    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if(!token) {
        return NextResponse.json({ message: "Unauthorized"}, { status: 401});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const facultyId = decoded.id;

    const submission = await Submission.find()
    .populate("student", "name email")
    .populate("project", "title faculty");


    const filtered = submissions.filter(
        (s) => s.project.faculty.toString() === facultyId
    );

    return NextResponse.json(filtered);
}