import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { checkRole } from "@/lib/checkRole";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  await connectDB();

  const result = await checkRole(["student"]);
  if (result.error) return result.error;

  const { decoded } = result;

  const formData = await req.formData();

  const content = formData.get("content");
  const uploadedFiles = formData.getAll("files");

  console.log("FILES RECEIVED:", uploadedFiles.length);

  const filesData = [];

  for (const file of uploadedFiles) {

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          resource_type: "auto",
          folder: "protrack/posts" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    filesData.push({
      type: file.type.startsWith("image")
        ? "image"
        : file.type.startsWith("video")
          ? "video"
          : "document",

      fileName: file.name,
      url: uploadResult.secure_url
    });

  }

  console.log("FILES DATA:", filesData);

  const post = await Post.create({
    studentId: decoded.id,
    content,
    files: filesData
  });

  return NextResponse.json(post);
}


export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  let posts;

  if (studentId) {
    // profile page ke liye
    posts = await Post.find({ studentId })
      .sort({ createdAt: -1 })
      .populate("studentId", "name");

  } else {
    // feed page ke liye
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("studentId", "name");
  }

  return NextResponse.json(posts);
}