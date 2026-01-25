import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentStudentId = decoded.id;

  const body = await req.json();
  const { title, students, faculty } = body;

  if (!students || students.length !== 2) {
    return NextResponse.json(
      { message: "Select exactly 2 group members" },
      { status: 400 }
    );
  }

  // 🔒 IMPORTANT RULE
  // if (!students.includes(currentStudentId)) {
  //   return NextResponse.json(
  //     { message: "You must be part of your own project group" },
  //     { status: 403 }
  //   );
  // }

  const finalStudents = [
    ...new Set([currentStudentId, ...students]),
  ];


  const project = await Project.create({
    title,
    students: finalStudents,
    faculty,
    status: "pending",
  });

  return NextResponse.json(project, { status: 201 });
}


// export async function POST(req) {
//   await connectDB();

//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch {
//     return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//   }

//   const { title, description, students } = await req.json();

//   if (!title || !description) {
//     return NextResponse.json(
//       { message: "All fields are required" },
//       { status: 400 }
//     );
//   }

//   // frontend se sirf 2 students aayenge
//   if (!students || students.length !== 2) {
//     return NextResponse.json(
//       { message: "Select exactly 2 team members" },
//       { status: 400 }
//     );
//   }

//   // 🔥 creator auto add
//   const allStudents = [...students, decoded.id];

//   const project = await Project.create({
//     title,
//     description,
//     students: allStudents,
//     createdBy: decoded.id,
//   });

//   return NextResponse.json(project, { status: 201 });
// }


// export async function POST(req) {
//   await connectDB();

//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   const currentStudentId = decoded.id;

  

//   const body = await req.json();
//   const { title, students, faculty} = body;

//   if (!title || !faculty || !students || students.length === 0) {
//     return NextResponse.json(
//       { message: "Missing fields" },
//       { status: 400 }
//     );
//   }

  

//   const project = await Project.create({
//     title,
//     students,
//     faculty,
//     createdBy: decoded.id,
//   });

//   return NextResponse.json(project, { status: 201 });
// }
