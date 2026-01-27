import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Submission from "@/models/Submission";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req, { params }) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== "student") {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  const formData = await req.formData();
  const files = formData.getAll("files");

  if (!files || files.length === 0) {
    return NextResponse.json({ message: "No files uploaded" }, { status: 400 });
  }

  const uploadedFiles = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "protrack/submissions",
        },
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      ).end(buffer);
    });

    uploadedFiles.push({
      type: result.resource_type === "video"
        ? "video"
        : result.resource_type === "image"
        ? "image"
        : "document",
      fileName: file.name,
      url: result.secure_url,
    });
  }

  const submission = await Submission.create({
    projectId: params.projectId,
    studentId: decoded.id,
    files: uploadedFiles,
  });

  return NextResponse.json({
    message: "Project submitted successfully",
    submission,
  });
}
