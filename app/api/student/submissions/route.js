import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Submission from "@/models/Submission";
import cloudinary from "@/lib/cloudinary";
import { checkRole } from "@/lib/checkRole";

export async function POST(req) {
  const result = await checkRole(["student"]);
  if (result.error) return result.error;

  const { decoded } = result;

  await connectDB();

  const formData = await req.formData();

  const projectId = formData.get("projectId");
  const week = formData.get("week");
  const description = formData.get("description");
  const githubLink = formData.get("githubLink");
  const uploadedFiles = formData.getAll("files");

  if (!projectId || !week || !description) {
    return NextResponse.json(
      { message: "Required fields missing" },
      { status: 400 }
    );
  }

  const exists = await Submission.findOne({
    student: decoded.id,
    project: projectId,
    week,
  });

  if (exists) {
    return NextResponse.json(
      { message: "Already submitted for this week" },
      { status: 400 }
    );
  }

  const files = [];

  for (const file of uploadedFiles) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "protrack/submissions",
        },
        (error, res) => {
          if (error) reject(error);
          resolve(res);
        }
      ).end(buffer);
    });

    files.push({
      type:
        result.resource_type === "video"
          ? "video"
          : result.resource_type === "image"
          ? "image"
          : "document",
      fileName: file.name,
      url: result.secure_url,
    });
  }

  const submission = await Submission.create({
    student: decoded.id,
    project: projectId,
    week,
    description,
    githubLink,
    files,
  });

  return NextResponse.json(submission, { status: 201 });
}
