import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { checkRole } from "@/lib/checkRole";
import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";

export async function POST(req) {
  await connectDB();

  const result = await checkRole(["student"]);
  if (result.error) return result.error;

  const { decoded } = result;

  const formData = await req.formData();
  const content = formData.get("content");
  const uploadedFiles = formData.getAll("files");

  const filesData = [];

  for (const file of uploadedFiles) {
    if (!file || file.size === 0) continue;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isPDF = file.type === "application/pdf";

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: isPDF ? "raw" : "auto", // ✅ PDF fix
          folder: "protrack/posts",
          format: isPDF ? "pdf" : undefined,     // ✅ ensure correct format
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      // ✅ prevent file corruption
      streamifier.createReadStream(buffer).pipe(stream);
    });

    filesData.push({
      type: file.type.startsWith("image")
        ? "image"
        : file.type.startsWith("video")
        ? "video"
        : "document",
      fileName: file.name,
      url: uploadResult.secure_url,
    });
  }

  const post = await Post.create({
    studentId: decoded.id,
    content,
    files: filesData,
  });

  return NextResponse.json(post);
}

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  let posts;

  if (studentId) {
    posts = await Post.find({ studentId })
      .sort({ createdAt: -1 })
      .populate("studentId", "name");
  } else {
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("studentId", "name");
  }

  return NextResponse.json(posts);
}