// import { NextResponse } from "next/server";

// export function checkRole(req, allowedRoles = []) {

//     const role = req.headers.get("role");

//     if(!role || !allowedRoles.includes(role)) {
//         return NextResponse.json(
//             { message: "Access Denied" },
//             { status: 403 }
//         );
//     }

//     return null;
// }

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function checkRole(allowedRoles = []) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return { error: NextResponse.json({ message: "Invalid token" }, { status: 401 }) };
  }

  if (!allowedRoles.includes(decoded.role)) {
    return { error: NextResponse.json({ message: "Access Denied" }, { status: 403 }) };
  }

  return { user: decoded };
}
