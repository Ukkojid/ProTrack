import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import StudentDashboardClient from "./StudentDashboard";
import {connectDB} from "@/lib/db";
import User from "@/models/User";

export default async function StudentDashboardPage() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let user;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "student") {
      redirect("/login");
    }

    user = await User.findById(decoded.id).select("-password");

    if (!user) {
      redirect("/login");
    }
  } catch {
    redirect("/login");
  }

  return <StudentDashboardClient name={user.name} />;
}
