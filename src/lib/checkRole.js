import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function checkRole(allowedRoles = []) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        error: NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        ),
      };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      Array.isArray(allowedRoles) &&
      allowedRoles.length > 0 &&
      !allowedRoles.includes(decoded.role)
    ) {
      return {
        error: NextResponse.json(
          { message: "Access Denied" },
          { status: 403 }
        ),
      };
    }

    return { decoded };
  } catch (err) {
    return {
      error: NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      ),
    };
  }
}
