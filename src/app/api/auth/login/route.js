import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {

    try {
        const { email, password } = await request.json();
        await connectDB();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json({
            id: user._id,
            name: user.name,
            role: user.role,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });


        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}