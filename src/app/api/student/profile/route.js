import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { checkRole } from "@/lib/checkRole";
import StudentProfile from "@/models/StudentProfile";


export async function POST(req) {
    try {
        await connectDB();

        const result = await checkRole(["student"]);
        if (result.error) return result.error;

        const { decoded } = result;
        const studentId = decoded.id;

        const body = await req.json();

        const profile = await StudentProfile.findOneAndUpdate(
            { studentId },
            { ...body, studentId },
            { new: true, upsert: true }
        );

        return NextResponse.json({
            success: true,
            profile
        });
    } catch (error) {
        return NextResponse.json(
            { message: "server error", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();

        const result = await checkRole(["student"]);
        if (result.error) return result.error;

        const { decoded } = result;
        const studentId = decoded.id;

        const profile = await StudentProfile.findOne({ studentId });

        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}