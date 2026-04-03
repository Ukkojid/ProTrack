import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { checkRole } from "@/lib/checkRole";

export async function DELETE(req, context) {
  await connectDB();

  // sirf admin ko allow
  const { error } = await checkRole(["admin"]);
  if (error) return error;

  // params ko await kar ke access karo
  const { id } = await context.params;

  // mongodb me user delete
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
