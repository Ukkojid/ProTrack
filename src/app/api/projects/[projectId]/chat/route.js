import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import Message from "@/models/Message";
import { checkRole } from "@/lib/checkRole";
import cloudinary from "@/lib/cloudinary"; 

export async function GET(req, context) {
  await connectDB();

  const { error, decoded } = await checkRole(["student"]);
  if (error) return error;

  const userId = decoded.id;
  const { projectId } = await context.params;

  const project = await Project.findById(projectId);
  if (!project) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  const isMember = project.students.some(
    (id) => id.toString() === userId
  );
  if (!isMember) {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  const messages = await Message.find({ project: projectId })
    .populate("sender", "name")
    .sort({ createdAt: 1 });

  return NextResponse.json(messages);
}


export async function POST(req, context) {
  await connectDB();

  const { error, decoded } = await checkRole(["student"]);
  if (error) return error;

  const userId = decoded.id;
  const { projectId } = await context.params;

  const project = await Project.findById(projectId);
  if (!project) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  const isMember = project.students.some(
    (id) => id.toString() === userId
  );
  if (!isMember) {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  const formData = await req.formData();
  const text = formData.get("text");
  const file = formData.get("file");

  if (!text && !file) {
    return NextResponse.json(
      { message: "Message or file required" },
      { status: 400 }
    );
  }

  let fileUrl = null;
  let fileType = null;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: "protrack-chat" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(buffer);
    });

    fileUrl = uploadRes.secure_url;
    fileType = uploadRes.resource_type; // image / video / raw
  }

  const message = await Message.create({
    project: projectId,
    sender: userId,
    text,
    fileUrl,
    fileType,
  });

  const populated = await message.populate("sender", "name");
  return NextResponse.json(populated, { status: 201 });
}
