import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { checkRole } from "@/lib/checkRole";

export async function GET(req) {
  await connectDB();
  const { error } = await checkRole(["admin"]);
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role");

  const query = {
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ]
  };

  if (role) query.role = role;

  const users = await User.find(query).select("-password");
  return NextResponse.json(users);
}
