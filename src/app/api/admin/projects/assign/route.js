import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { checkRole } from "@/lib/checkRole";

export async function PATCH(req) {
    const { error, decoded } = await checkRole(["faculty"]);
  if (error) return error;
    
    await connectDB();

    const body = await req.json();
    const { projectId, facultyId } = body;

    // Project find
    const project = await Project.findById(projectId);

    if(!project) {
        return NextResponse.json(
            { message: "Project not found"},
            { status: 404 }
        )
    }

    // Faculty assign
    project.faculty = facultyId;

    // Status update
    project.status = "assigned";

    await project.save();

    return NextResponse.json({
        message: "Faculty assigned to project",
        project
    });
}