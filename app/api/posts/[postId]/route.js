import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { postId } = await params;

    await Post.findByIdAndDelete(postId);

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}